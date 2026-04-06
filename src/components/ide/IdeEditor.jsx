import React, { useState, useRef, useEffect } from 'react';

const buildTree = (paths) => {
  const root = { name: 'root', type: 'folder', children: {}, path: '' };
  paths.forEach(path => {
    const parts = path.split('/');
    let current = root;
    parts.forEach((part, i) => {
      if (i === parts.length - 1) {
        current.children[part] = { name: part, type: 'file', path };
      } else {
        if (!current.children[part]) {
          current.children[part] = { name: part, type: 'folder', children: {}, path: parts.slice(0, i + 1).join('/') };
        }
        current = current.children[part];
      }
    });
  });
  return root;
};

const FileTreeNode = ({ node, activeFile, onSelectFile }) => {
  if (node.type === 'file') {
    return (
      <li className={`tree-item ${activeFile === node.path ? 'active' : ''}`} onClick={() => onSelectFile(node.path)}>
        <span className="icon">📄</span> {node.name}
      </li>
    );
  }
  return (
    <li className="tree-item folder open">
      <span className="icon">📂</span> {node.name}
      <ul className="tree-sub">
        {Object.values(node.children).map(child => (
          <FileTreeNode key={child.name} node={child} activeFile={activeFile} onSelectFile={onSelectFile} />
        ))}
      </ul>
    </li>
  );
};

const IdeEditor = ({ files, openTabs, activeFile, onSelectFile, onCloseTab, onCodeChange }) => {
  const [isExplorerOpen, setIsExplorerOpen] = useState(true);
  const [explorerWidth, setExplorerWidth] = useState(250);
  const isDragging = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      setExplorerWidth(prev => Math.max(150, Math.min(500, prev + e.movementX)));
    };

    const handleMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
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

  const startDrag = () => {
    isDragging.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const tree = buildTree(Object.keys(files || {}));
  const activeContent = files?.[activeFile]?.content || '';
  const codeLines = Math.max(20, activeContent.split('\n').length);

  return (
    <div className="ide-editor panel">
      <header className="panel-header justify-between">
        <div className="flex-center gap-4 text-sm text-subtle">
           <span>▦ Overview</span>
           <span className="text-white font-medium">{'</>'} Code</span>
           <span>⚙ Settings</span>
        </div>
        <div className="flex-center gap-3">
          <span className="pipeline-badge"><span className="dot pulse"></span> Pipeline Active</span>
          <button className="share-btn">🔗 Share</button>
        </div>
      </header>

      <div className="editor-main">
        {/* Left Explorer Pane */}
        {isExplorerOpen ? (
          <>
            <div className="explorer-pane" style={{ width: explorerWidth, flexShrink: 0 }}>
              <div className="explorer-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>EXPLORER</span>
                <button 
                  className="icon-btn" 
                  onClick={() => setIsExplorerOpen(false)}
                  aria-label="Close Explorer"
                  style={{ width: '20px', height: '20px', fontSize: '12px', margin: '-4px -4px -4px 0' }}
                >
                  ✕
                </button>
              </div>
              <div className="search-box">
                 <span className="search-icon">🔍</span>
                 <input type="text" placeholder="Search files" className="explorer-search" disabled />
              </div>
              
              <ul className="file-tree" style={{ overflowY: 'auto', flex: 1 }}>
                {Object.values(tree.children).map(child => (
                  <FileTreeNode key={child.name} node={child} activeFile={activeFile} onSelectFile={onSelectFile} />
                ))}
              </ul>
            </div>
            <div className="resizer" onMouseDown={startDrag} style={{ backgroundColor: '#1a1523', zIndex: 10 }} />
          </>
        ) : (
          <div className="collapsed-bar" onClick={() => setIsExplorerOpen(true)} title="Open Explorer" style={{ backgroundColor: '#0f0c13', borderRight: '1px solid #1f1b29' }}>
             <span className="toggle-icon" style={{ transform: 'rotate(180deg)' }}>📂 Explorer</span>
          </div>
        )}

        {/* Right Code View Pane */}
        <div className="code-pane">
           {/* Tabs */}
           <div className="code-tabs">
             <div style={{ display: 'flex', overflowX: 'auto', flex: 1 }}>
               {openTabs.map(tab => (
                 <div key={tab} className={`tab ${activeFile === tab ? 'active' : ''}`} onClick={() => onSelectFile(tab)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                   {tab.split('/').pop()}
                   <button onClick={(e) => onCloseTab(tab, e)} className="tab-close" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: '0 4px', fontSize: '14px' }}>×</button>
                 </div>
               ))}
             </div>
             <div className="tab-actions">
               <button className="icon-btn">💾</button>
               <button className="icon-btn">▶</button>
             </div>
           </div>
           
           {/* Code Body */}
           <div className="code-body" style={{ position: 'relative', overflow: 'hidden' }}>
             <div className="line-numbers" style={{ overflowY: 'hidden', paddingBottom: '32px' }}>
                {[...Array(codeLines)].map((_, i) => <div key={i}>{i + 1}</div>)}
             </div>
             <textarea 
               className="code-content python-syntax"
               style={{ 
                 width: '100%', 
                 height: '100%', 
                 background: 'transparent', 
                 color: 'inherit', 
                 border: 'none', 
                 outline: 'none', 
                 resize: 'none', 
                 padding: '16px 16px 32px 16px', 
                 fontFamily: 'monospace',
                 fontSize: '13px',
                 lineHeight: '1.5',
                 whiteSpace: 'pre',
                 overflow: 'auto'
               }}
               value={activeContent}
               onChange={(e) => onCodeChange(activeFile, e.target.value)}
               spellCheck="false"
               wrap="off"
             />
           </div>
           <div className="code-footer">
             {activeFile ? `${activeFile.split('.').pop().toUpperCase()} · UTF-8` : 'Waiting for file'}
             <div className="issue-badge"><span className="dot bg-green"></span> 0 Issues ✨</div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default IdeEditor;
