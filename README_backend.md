# KMRL Document Management Backend Demo

## Setup

1. Install dependencies:
   pip install -r requirements.txt

2. Set up environment variables in .env file:
   - GEMINI_API_KEY: Your Google Gemini API key
   - SMTP_USER: Your email (e.g., gmail)
   - SMTP_PASS: Your email app password

3. Run the backend:
   python main.py

   It will start on http://localhost:8000

## Frontend Integration

- The React app in src/ has been updated to call the backend APIs.
- Upload calls POST /upload to get summary via Gemini.
- Send Email calls POST /send-email to send document with summary.

## Demo Features

- Upload documents (PDF, TXT, etc.)
- Automatic summarization using Gemini AI
- Send email to departments with document attached and summary in body
- Basic SQLite database for storage

## Deployment

- For production, deploy to Railway/Render/Heroku
- Update CORS origins in main.py to your Vercel URL