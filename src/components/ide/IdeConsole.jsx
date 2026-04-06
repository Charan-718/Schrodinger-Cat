import React, { useRef, useEffect } from 'react';

const IdeConsole = ({ logs, onClose }) => {
  const consoleEndRef = useRef(null);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="ide-console panel">
      <header className="console-header justify-between" style={{ paddingRight: '12px' }}>
         <div className="flex-center gap-2 font-mono text-sm text-accent">
           <span>▶_</span> Console {'>>'}
         </div>
         <div className="flex-center gap-3 text-xs text-subtle">
           <span className="text-red">⚠ 9</span>
           <span className="text-orange">ℹ 3</span>
           <span>⚙</span>
           <button className="icon-btn" onClick={onClose} aria-label="Close Console">✕</button>
         </div>
      </header>
      
      <div className="console-toolbar">
         <div className="toolbar-item">Default levels ▾</div>
         <div className="toolbar-item">3 issues: 3 | 7 hidden</div>
         <div className="toolbar-item filter-box">🔍 Filter</div>
      </div>

      <div className="console-logs font-mono text-xs" style={{ overflowY: 'auto', flex: 1 }}>
        {logs.map((log, i) => {
          if (log.type === 'raw' || log.type === 'raw-error') {
            return (
              <div key={log.id || i} className={`log-row dim ${log.type === 'raw-error' ? 'text-red' : ''}`}>
                ▶ {log.message}
              </div>
            );
          }
          
          let colorClass = 'text-teal';
          if (log.type === 'error') colorClass = 'text-red';
          else if (log.prefix === '[System]') colorClass = 'text-purple';

          return (
            <div key={log.id || i} className="log-row mt-2" style={{ display: 'flex', gap: '8px' }}>
              <span className={`log-prefix ${colorClass}`}>{log.prefix}</span>
              <span>
                {log.message} {log.meta && <span className="log-meta">{log.meta}</span>}
              </span>
            </div>
          );
        })}
        <div ref={consoleEndRef} />
      </div>

      <div className="console-footer">
        <div className="footer-hint">
          {'>'} <span className="highlight">ctrl i</span> to turn on code suggestions. Don't show again.
        </div>
        <div className="flex-center justify-between w-full mt-2 text-subtle text-xs">
           <span>⁝ Console</span>
           <span>AI assistance</span>
           <span>◫</span>
        </div>
      </div>
    </div>
  );
};

export default IdeConsole;
