from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import random
import time
from typing import Optional, List

app = FastAPI(title='Legal AI Backend', version='1.0.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173', 'http://127.0.0.1:5173'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

class ChatRequest(BaseModel):
    message: str
    context: Optional[str] = None

class TextRequest(BaseModel):
    text: str

class BatchRequest(BaseModel):
    items: List[str]

LEGAL_RESPONSES = [
    'Based on my analysis of legal precedents, this matter appears to fall under established contract law principles.',
    'The relevant statutes suggest a clear framework for addressing this issue under current regulations.',
    'This case involves complex jurisdictional considerations that require careful examination of applicable law.',
    'The legal framework indicates several potential approaches to resolving this matter effectively.',
    'Current case law provides substantial guidance for navigating this particular legal situation.'
]

LEGAL_SUMMARIES = [
    'This document outlines the fundamental terms and conditions governing the contractual relationship between parties.',
    'The agreement establishes clear obligations and responsibilities for all involved parties.',
    'Key provisions include payment terms, delivery schedules, and dispute resolution mechanisms.',
    'The document incorporates standard legal protections and compliance requirements.',
    'Important clauses address liability limitations and indemnification provisions.'
]

LEGAL_CITATIONS = [
    'Smith v. Jones, 123 F.3d 456 (2d Cir. 2020)',
    'Legal Corp. v. Business Inc., 456 U.S. 789 (2019)',
    'Contract Law Review, 78 Harv. L. Rev. 234 (2021)',
    'Commercial Litigation Standards, 45 Yale L.J. 567 (2020)',
    'Federal Regulation Guidelines, 12 C.F.R. § 123.45'
]

@app.get('/')
async def root():
    return {'message': 'Legal AI Backend is running!', 'status': 'success'}

@app.get('/api/v1/health')
async def health():
    return {'status': 'healthy', 'backend': 'operational'}

@app.post('/api/v1/chat/')
@app.post('/chat/')
async def chat(request: ChatRequest):
    time.sleep(1)
    response_text = random.choice(LEGAL_RESPONSES)
    confidence = round(random.uniform(0.85, 0.98), 2)
    return {
        'response': response_text,
        'confidence': confidence,
        'sources': [
            {'title': 'Legal Database Entry', 'relevance': 0.92},
            {'title': 'Case Law Reference', 'relevance': 0.88}
        ]
    }

@app.post('/api/v1/summarize/')
@app.post('/summarize/')
async def summarize_file(file: UploadFile = File(...)):
    time.sleep(2)
    summary = random.choice(LEGAL_SUMMARIES)
    key_points = [
        'Primary contractual obligations and responsibilities',
        'Payment terms and delivery schedules',
        'Legal compliance and regulatory requirements',
        'Dispute resolution and termination procedures'
    ]
    return {
        'summary': summary,
        'key_points': key_points,
        'confidence': round(random.uniform(0.85, 0.95), 2),
        'filename': file.filename,
        'processed_pages': random.randint(1, 25)
    }

@app.post('/api/v1/summarize')
@app.post('/summarize')
async def summarize_text(request: TextRequest):
    time.sleep(1.5)
    summary = random.choice(LEGAL_SUMMARIES)
    return {
        'summary': summary,
        'confidence': round(random.uniform(0.85, 0.95), 2),
        'word_count_original': len(request.text.split()),
        'word_count_summary': len(summary.split())
    }

@app.post('/api/v1/analyze/')
@app.post('/analyze/')
async def analyze_file(file: UploadFile = File(...)):
    time.sleep(2)
    return {
        'analysis': 'This document demonstrates standard commercial terms with appropriate legal protections and comprehensive risk management provisions.',
        'risk_level': random.choice(['Low', 'Medium', 'High']),
        'key_issues': [
            'Standard liability clauses present and well-structured',
            'Clear payment terms and delivery schedules defined',
            'Appropriate termination and dispute resolution provisions'
        ],
        'recommendations': [
            'Consider additional indemnification language for enhanced protection',
            'Review force majeure provisions for current circumstances',
            'Clarify intellectual property rights and ownership terms'
        ],
        'confidence': round(random.uniform(0.80, 0.95), 2),
        'filename': file.filename
    }

@app.post('/api/v1/clause_detection')
@app.post('/clause_detection')
async def detect_clauses(request: TextRequest):
    detected_clauses = random.sample(['Force Majeure', 'Limitation of Liability', 'Indemnification', 'IP Rights', 'Termination'], 3)
    return {
        'clauses': [
            {'clause': c, 'confidence': round(random.uniform(0.75, 0.95), 2)} for c in detected_clauses
        ],
        'total_detected': 3
    }

@app.post('/api/v1/courtlistener/lookup')
@app.post('/courtlistener/lookup')
async def citation_lookup(request: TextRequest):
    citations = random.sample(LEGAL_CITATIONS, 2)
    return {
        'citations': [
            {'citation': c, 'relevance': round(random.uniform(0.75, 0.95), 2)} for c in citations
        ],
        'query': request.text
    }

@app.post('/api/v1/courtlistener/lookup_batch')
@app.post('/courtlistener/lookup_batch')
async def citation_lookup_batch(request: BatchRequest):
    all_citations = []
    for item in request.items:
        citation = random.choice(LEGAL_CITATIONS)
        all_citations.append({'citation': citation, 'query': item, 'relevance': round(random.uniform(0.75, 0.95), 2)})
    return {'citations': all_citations, 'total_processed': len(request.items)}

@app.post('/api/v1/auth/register')
async def register():
    return {'message': 'Registration successful', 'user_id': 123}

@app.post('/api/v1/auth/login')
async def login():
    return {'access_token': 'mock_token_12345', 'token_type': 'bearer', 'user': {'id': 1, 'full_name': 'Legal Professional', 'email': 'user@example.com'}}

@app.get('/api/v1/auth/me')
async def get_user():
    return {'id': 1, 'full_name': 'Legal Professional', 'email': 'user@example.com', 'firm_name': 'Sample Law Firm'}

if __name__ == '__main__':
    print('Starting Legal AI Backend (usfirm_server.py)')
    uvicorn.run(app, host='0.0.0.0', port=8000)
