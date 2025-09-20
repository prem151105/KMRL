from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import sqlite3
from datetime import datetime
import google.generativeai as genai
from pydantic import BaseModel
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-vercel-frontend.vercel.app"],  # Replace with your Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Environment variables (set in .env)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASS = os.getenv("SMTP_PASS")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-pro')

# Database setup
conn = sqlite3.connect("kmrl_docs.db", check_same_thread=False)
cursor = conn.cursor()
cursor.execute('''CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT,
    upload_date TEXT,
    summary TEXT
)''')
cursor.execute('''CREATE TABLE IF NOT EXISTS email_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    document_id INTEGER,
    recipient TEXT,
    sent_date TEXT,
    status TEXT
)''')
conn.commit()

class EmailRequest(BaseModel):
    document_id: int
    recipient: str
    message: str

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    if file.size > 10 * 1024 * 1024:  # 10MB limit
        raise HTTPException(status_code=413, detail="File too large")

    # Save file
    os.makedirs("uploads", exist_ok=True)
    file_path = f"uploads/{file.filename}"
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)

    # Extract text (simple for demo)
    text = content.decode('utf-8', errors='ignore')[:1000]  # First 1000 chars

    # Generate summary with Gemini
    try:
        response = model.generate_content(f"Summarize this document in 200 words: {text}")
        summary = response.text
    except:
        summary = "Summary generation failed"

    # Save to DB
    cursor.execute("INSERT INTO documents (filename, upload_date, summary) VALUES (?, ?, ?)",
                   (file.filename, datetime.now().isoformat(), summary))
    doc_id = cursor.lastrowid
    conn.commit()

    return {"id": doc_id, "summary": summary}

@app.get("/documents")
def get_documents():
    cursor.execute("SELECT id, filename, upload_date, summary FROM documents")
    docs = cursor.fetchall()
    return [{"id": d[0], "filename": d[1], "upload_date": d[2], "summary": d[3]} for d in docs]

@app.get("/documents/{doc_id}")
def get_document(doc_id: int):
    cursor.execute("SELECT * FROM documents WHERE id = ?", (doc_id,))
    doc = cursor.fetchone()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return {"id": doc[0], "filename": doc[1], "upload_date": doc[2], "summary": doc[3]}

@app.post("/send-email")
def send_email(request: EmailRequest):
    cursor.execute("SELECT filename, summary FROM documents WHERE id = ?", (request.document_id,))
    doc = cursor.fetchone()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")

    filename, summary = doc
    file_path = f"uploads/{filename}"

    # Send email
    try:
        msg = MIMEMultipart()
        msg['From'] = SMTP_USER
        msg['To'] = request.recipient
        msg['Subject'] = f"Document: {filename}"
        msg.attach(MIMEText(f"{request.message}\n\nSummary:\n{summary}", 'plain'))

        # Attach file
        with open(file_path, "rb") as f:
            part = MIMEBase('application', 'octet-stream')
            part.set_payload(f.read())
            encoders.encode_base64(part)
            part.add_header('Content-Disposition', f'attachment; filename={filename}')
            msg.attach(part)

        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USER, SMTP_PASS)
        server.sendmail(SMTP_USER, request.recipient, msg.as_string())
        server.quit()

        status = "sent"
    except Exception as e:
        status = f"failed: {str(e)}"

    # Log history
    cursor.execute("INSERT INTO email_history (document_id, recipient, sent_date, status) VALUES (?, ?, ?, ?)",
                   (request.document_id, request.recipient, datetime.now().isoformat(), status))
    conn.commit()

    return {"status": status}

@app.get("/email-history")
def get_email_history():
    cursor.execute("SELECT * FROM email_history")
    history = cursor.fetchall()
    return [{"id": h[0], "document_id": h[1], "recipient": h[2], "sent_date": h[3], "status": h[4]} for h in history]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)