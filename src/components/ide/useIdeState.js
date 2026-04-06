import { useState, useCallback } from 'react';

const INITIAL_FILES = {
  '.env': { type: 'file', content: 'DATABASE_URL=postgres://user:pass@db:5432/app\nSECRET_KEY=supersecret' },
  'Dockerfile': { type: 'file', content: 'FROM python:3.10-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nCMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]' },
  'requirements.txt': { type: 'file', content: 'fastapi==0.100.0\nuvicorn==0.22.0\nsqlalchemy==2.0.18\npsycopg2-binary==2.9.6' },
  'app/database.py': { type: 'file', content: 'from sqlalchemy import create_engine\nfrom sqlalchemy.orm import sessionmaker\n# ...' },
  'app/main.py': { type: 'file', content: 'from fastapi import FastAPI\nfrom app.routers import products\n\napp = FastAPI()\napp.include_router(products.router)\n' },
  'app/models.py': { type: 'file', content: 'from sqlalchemy import Column, Integer, String\n# ...' },
  'app/schemas.py': { type: 'file', content: 'from pydantic import BaseModel\n\nclass ProductBase(BaseModel):\n    name: str\n    price: float\n' },
  'app/routers/products.py': { type: 'file', content: 'from fastapi import APIRouter, Depends, HTTPException\nfrom sqlalchemy.orm import Session\nfrom app import models, schemas, database\n\nrouter = APIRouter(prefix="/products", tags=["products"])\n\ndef get_db():\n    db = database.SessionLocal()\n    try:\n        yield db\n    finally:\n        db.close()\n\n@router.get("/{id}")\ndef get_product(id: int, db: Session = Depends(get_db)):\n    product = db.query(models.Product).filter(models.Product.id == id).first()\n    if not product:\n        raise HTTPException(status_code=404, detail="Product not found")\n    return product\n\n@router.post("/", response_model=schemas.ProductResponse)\ndef create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):\n    db_product = models.Product(**product.dict())\n    db.add(db_product)\n    db.commit()\n    db.refresh(db_product)\n    return db_product\n\n@router.put("/{id}", response_model=schemas.ProductResponse)\ndef update_product(id: int, product: schemas.ProductUpdate, db: Session = Depends(get_db)):\n    db_product = db.query(models.Product).filter(models.Product.id == id).first()\n    if not db_product:\n        raise HTTPException(status_code=404, detail="Product not found")\n    # ... update fields\n    return db_product\n' },
  'app/seeder.py': { type: 'file', content: '# Seed initial data into the database\n' }
};

const INITIAL_CHAT = [
  { id: 1, role: 'ai', text: 'Hello! How can I assist you today with backend development topics?' },
  { id: 2, role: 'user', text: 'create one todo list using flask api simply' },
  { id: 3, role: 'ai', text: '🚀 Got it! Building:\nCreate a todo list using Flask API\n\nHanding off to the Artificer agent now...' },
  { id: 4, role: 'artificer', steps: [
    { label: 'Writing app/main.py...', status: 'success' },
    { label: 'Writing app/database.py...', status: 'success' },
    { label: 'Writing app/models.py...', status: 'success' },
    { label: 'Writing app/schemas.py...', status: 'success' },
    { label: 'Writing app/routers/products.py...', status: 'success' },
    { label: 'Running: pip install -r requirements.txt', status: 'loading' }
  ]},
  { id: 5, role: 'ai', text: 'The Flask Todo List API has been successfully set up. The application is ready to run with the provided configuration. Let me know if you need further assistance! 🔨 ARTIFICER STAGE COMPLETE - Workflow ended for debugging.' }
];

const INITIAL_LOGS = [
  { id: 1, type: 'info', prefix: '[SSE]', meta: 'use-workflow.ts:172', message: 'event: text_chunk' },
  { id: 2, type: 'raw', message: '{type: "text_chunk", chunk: " 🔨 ARTIFICER STAGE COMPLETE...", role: "artificer"}' },
  { id: 3, type: 'error', prefix: '[SSE]', meta: 'use-workflow.ts:172', message: 'event: build_failed' },
  { id: 4, type: 'raw-error', message: '{type: "build_failed", reason: "(psycopg2.errors.UndefinedColumn) column builds.ro... on this error at: https://sqlalche.me/e/20/f405"}' },
];

export function useIdeState() {
  const [files, setFiles] = useState(INITIAL_FILES);
  const [openTabs, setOpenTabs] = useState(['app/routers/products.py', 'requirements.txt']);
  const [activeFile, setActiveFile] = useState('app/routers/products.py');
  
  const [chatHistory, setChatHistory] = useState(INITIAL_CHAT);
  const [consoleLogs, setConsoleLogs] = useState(INITIAL_LOGS);
  
  const [isSimulating, setIsSimulating] = useState(false);

  // File Handlers
  const handleSelectFile = useCallback((path) => {
    if (!openTabs.includes(path)) {
      setOpenTabs(prev => [...prev, path]);
    }
    setActiveFile(path);
  }, [openTabs]);

  const handleCloseTab = useCallback((path, e) => {
    e.stopPropagation();
    setOpenTabs(prev => {
      const next = prev.filter(p => p !== path);
      if (activeFile === path) {
        setActiveFile(next.length > 0 ? next[next.length - 1] : null);
      }
      return next;
    });
  }, [activeFile]);

  const handleCodeChange = useCallback((path, newContent) => {
    setFiles(prev => ({
      ...prev,
      [path]: { ...prev[path], content: newContent }
    }));
  }, []);

  // Chat/Simulate Handler
  const handleSendMessage = useCallback((text) => {
    if (!text.trim() || isSimulating) return;

    const newMsg = { id: Date.now(), role: 'user', text };
    setChatHistory(prev => [...prev, newMsg]);
    setIsSimulating(true);

    // Mock AI response sequence
    setTimeout(() => {
      const aiAck = { id: Date.now() + 1, role: 'ai', text: 'Analyzing your request...\nDeploying AI agents to fulfill it.' };
      setChatHistory(prev => [...prev, aiAck]);
      
      const logInfo = { id: Date.now() + 2, type: 'info', prefix: '[System]', message: 'Initializing build process for new changes...' };
      setConsoleLogs(prev => [...prev, logInfo]);
      
      setTimeout(() => {
        const artificer = { 
          id: Date.now() + 3, 
          role: 'artificer', 
          steps: [
            { label: `Parsing intent: ${text}`, status: 'success' },
            { label: `Updating required files...`, status: 'success' },
            { label: `Validating dependencies...`, status: 'loading' }
          ]
        };
        setChatHistory(prev => [...prev, artificer]);
        
        const logRaw = { id: Date.now() + 4, type: 'raw', message: `> Generating patch for user prompt "${text.substring(0, 20)}..."` };
        setConsoleLogs(prev => [...prev, logRaw]);

        setTimeout(() => {
          setChatHistory(prev => {
            const next = [...prev];
            const artStep = next[next.length - 1];
            if (artStep.role === 'artificer') {
              artStep.steps[2].status = 'success';
            }
            return next;
          });
          
          const finalAi = { id: Date.now() + 5, role: 'ai', text: 'The changes have been applied successfully and the preview has been refreshed.' };
          setChatHistory(prev => [...prev, finalAi]);
          setIsSimulating(false);
        }, 1500);
      }, 1000);
    }, 500);
  }, [isSimulating]);

  return {
    files,
    openTabs,
    activeFile,
    chatHistory,
    consoleLogs,
    isSimulating,
    handleSelectFile,
    handleCloseTab,
    handleCodeChange,
    handleSendMessage
  };
}
