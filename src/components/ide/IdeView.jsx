import React, { useState, useRef, useEffect } from 'react';
import IdeChat from './IdeChat';
import IdeEditor from './IdeEditor';
import IdeConsole from './IdeConsole';
import { useIdeState } from './useIdeState';
import './Ide.css';

const IdeView = () => {
  const ideState = useIdeState();
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [leftWidth, setLeftWidth] = useState(380);
  const [rightWidth, setRightWidth] = useState(400);

  const containerRef = useRef(null);
  const isDraggingLeft = useRef(false);
  const isDraggingRight = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDraggingLeft.current && !isDraggingRight.current) return;
      if (!containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      
      if (isDraggingLeft.current) {
         let newWidth = e.clientX - containerRect.left;
         if (newWidth < 200) newWidth = 200;
         if (newWidth > 600) newWidth = 600;
         setLeftWidth(newWidth);
      } else if (isDraggingRight.current) {
         let newWidth = containerRect.right - e.clientX;
         if (newWidth < 200) newWidth = 200;
         if (newWidth > 800) newWidth = 800;
         setRightWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      if (isDraggingLeft.current || isDraggingRight.current) {
        isDraggingLeft.current = false;
        isDraggingRight.current = false;
        document.body.style.cursor = 'default';
        document.body.style.userSelect = 'auto';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const startDragLeft = (e) => {
    isDraggingLeft.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const startDragRight = (e) => {
    isDraggingRight.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  return (
    <div className="ide-layout-flex" ref={containerRef}>
      {/* Left Panel */}
      <div className={`ide-sidebar ${!leftOpen ? 'collapsed' : ''}`} style={{ width: leftOpen ? leftWidth : 48 }}>
        {leftOpen ? (
          <IdeChat 
            history={ideState.chatHistory} 
            onSendMessage={ideState.handleSendMessage} 
            isSimulating={ideState.isSimulating}
            onClose={() => setLeftOpen(false)}
          />
        ) : (
          <div className="collapsed-bar" onClick={() => setLeftOpen(true)} title="Open ECHub">
             <span className="toggle-icon" style={{ transform: 'rotate(180deg)' }}>💬 ECHub</span>
          </div>
        )}
      </div>

      {leftOpen && <div className="resizer" onMouseDown={startDragLeft} />}

      {/* Editor Panel */}
      <div className="ide-main">
        <IdeEditor 
          files={ideState.files} 
          openTabs={ideState.openTabs} 
          activeFile={ideState.activeFile}
          onSelectFile={ideState.handleSelectFile}
          onCloseTab={ideState.handleCloseTab}
          onCodeChange={ideState.handleCodeChange}
        />
      </div>

      {rightOpen && <div className="resizer" onMouseDown={startDragRight} />}

      {/* Right Panel */}
      <div className={`ide-sidebar ${!rightOpen ? 'collapsed' : ''}`} style={{ width: rightOpen ? rightWidth : 48 }}>
        {rightOpen ? (
          <IdeConsole 
            logs={ideState.consoleLogs} 
            onClose={() => setRightOpen(false)}
          />
        ) : (
          <div className="collapsed-bar" onClick={() => setRightOpen(true)} title="Open Console">
             <span className="toggle-icon" style={{ transform: 'rotate(180deg)' }}>▶_ Console</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default IdeView;
