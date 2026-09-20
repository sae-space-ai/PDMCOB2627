import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = 'bash' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative group">
      <div className="bg-slate-900/80 border border-slate-700/50 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 bg-slate-800/50 border-b border-slate-700/50">
          <span className="text-xs font-mono text-slate-500">{language}</span>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-all ${
              copied
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-600/50'
            }`}
          >
            {copied ? (
              <>
                <i className="fas fa-check text-[10px]"></i>
                <span>Copiado</span>
              </>
            ) : (
              <>
                <i className="fas fa-copy text-[10px]"></i>
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>
        <pre className="p-4 overflow-x-auto text-sm">
          <code className="text-emerald-300 font-mono whitespace-pre">{code}</code>
        </pre>
      </div>
    </div>
  );
}
