import React, { useState, useRef, useEffect } from 'react';

const IdeChat = ({ history, onSendMessage, isSimulating, onClose }) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div className="ide-chat panel">
      <header className="panel-header" style={{ display: 'flex', justifyContent: 'space-between', paddingRight: '12px' }}>
        <div className="flex-center gap-2">
          <span className="logo-icon">❖</span>
          <span className="font-bold text-sm">ECHub</span>
        </div>
        <div className="flex-center gap-2">
          <div className="project-selector">Hello Initiative ∨</div>
          <button className="icon-btn" onClick={onClose} aria-label="Close Chat">✕</button>
        </div>
      </header>
      
      <div className="chat-history">
        {history.map((msg, index) => {
           if (msg.role === 'artificer') {
             return (
               <div key={msg.id || index} className="artificer-steps">
                 <div className="artificer-header">
                   <span className="logo-icon-small text-blue">⚓</span>
                   <span>Artificer</span>
                 </div>
                 <div className="steps-container">
                   <div className="step-label">ARTIFICER — STEPS</div>
                   <ul className="step-list">
                     {msg.steps.map((step, idx) => (
                       <li key={idx} className={`step-item ${step.status}`}>
                         <span className={`icon ${step.status === 'loading' ? 'spinner' : ''}`}>
                           {step.status === 'success' ? '✔' : '↻'}
                         </span> 
                         {step.label}
                       </li>
                     ))}
                   </ul>
                 </div>
               </div>
             );
           }

           const isUser = msg.role === 'user';
           return (
             <div key={msg.id || index} className={`chat-bubble ${isUser ? 'user-bubble' : 'ai-bubble'}`}>
               <div className={`bubble-header ${isUser ? 'right' : ''}`}>
                 {!isUser && (
                   <>
                     <span className="logo-icon-small text-accent">❖</span>
                     <span>ECHub</span>
                   </>
                 )}
                 {isUser && (
                   <>
                     <span>You</span>
                     <span className="avatar">👤</span>
                   </>
                 )}
               </div>
               {!isUser ? (
                 <p style={{ whiteSpace: 'pre-line' }}>{msg.text}</p>
               ) : (
                 <div className="user-text">{msg.text}</div>
               )}
             </div>
           );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <form className="chat-input-wrapper" onSubmit={handleSubmit}>
          <button type="button" className="icon-btn">+</button>
          <input 
            type="text" 
            placeholder="Ask ECHub to build, modify, or explain..." 
            className="chat-input" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isSimulating}
          />
          <div className="input-actions">
            <button type="button" className="icon-btn">🎤</button>
            <button type="submit" className="icon-btn submit-btn" disabled={isSimulating || !inputText.trim()}>↑</button>
          </div>
        </form>
        {isSimulating && <div className="loading-status">Build in progress — please wait...</div>}
      </div>
    </div>
  );
};

export default IdeChat;

