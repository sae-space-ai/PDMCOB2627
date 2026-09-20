import { useState } from 'react';
import type { DocumentBlock } from '../types';

interface Props {
  documentContent: string;
  documentLoaded: boolean;
}

// Parse headings from markdown content
function parseBlocks(content: string): DocumentBlock[] {
  if (!content) return [];
  
  const lines = content.split('\n');
  const blocks: DocumentBlock[] = [];
  let currentBlock: DocumentBlock | null = null;
  let currentContent: string[] = [];

  const classifyBlock = (title: string, text: string): DocumentBlock['clasificacion'] => {
    const upper = (title + ' ' + text).toUpperCase();
    if (upper.includes('HOLD') || upper.includes('PENDIENTE DE VERIFICACIÓN')) return 'HOLD';
    if (upper.includes('REAL DECRETO') || upper.includes('DECRETO') || upper.includes('ORDEN') || upper.includes('LEY')) return 'NORMA VIGENTE';
    if (upper.includes('BOE') || upper.includes('BOE-A') || upper.includes('DOE')) return 'TEXTO OFICIAL';
    if (upper.includes('PROYECTO EDUCATIVO') || upper.includes('PGA') || upper.includes('REGlamento')) return 'DOCUMENTO INSTITUCIONAL';
    if (upper.includes('EVIDENCIA') || upper.includes('REGISTRO')) return 'EVIDENCIA';
    return 'DESARROLLO PROPIO';
  };

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,3})\s+(.+)/);
    if (headingMatch) {
      if (currentBlock) {
        currentBlock.contenido = currentContent.join('\n').trim();
        blocks.push(currentBlock);
      }
      currentContent = [];
      currentBlock = {
        numero: `B${blocks.length + 1}`,
        titulo: headingMatch[2],
        contenido: '',
        clasificacion: 'DESARROLLO PROPIO',
        tieneHold: false,
      };
    } else if (currentBlock) {
      currentContent.push(line);
      if (line.toUpperCase().includes('HOLD')) {
        currentBlock.tieneHold = true;
      }
    }
  }

  if (currentBlock) {
    currentBlock.contenido = currentContent.join('\n').trim();
    blocks.push(currentBlock);
  }

  // Classify each block
  return blocks.map(block => ({
    ...block,
    clasificacion: classifyBlock(block.titulo, block.contenido),
  }));
}

const classColors: Record<string, { bg: string; text: string; border: string }> = {
  'NORMA VIGENTE': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  'TEXTO OFICIAL': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  'DOCUMENTO INSTITUCIONAL': { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/30' },
  'DESARROLLO PROPIO': { bg: 'bg-teal-500/10', text: 'text-teal-400', border: 'border-teal-500/30' },
  'EVIDENCIA': { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  'HOLD': { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
};

export default function BlockViewer({ documentContent, documentLoaded }: Props) {
  const [expandedBlock, setExpandedBlock] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('todos');

  const blocks = parseBlocks(documentContent);
  const filteredBlocks = filter === 'todos' ? blocks : blocks.filter(b => b.clasificacion === filter);

  if (!documentLoaded) {
    return (
      <div className="text-center py-20">
        <i className="fas fa-layer-group text-6xl text-slate-600 mb-4"></i>
        <h3 className="text-xl text-slate-400 mb-2">Documento no cargado</h3>
        <p className="text-slate-500 text-sm">Carga el documento fuente en la pestaña "Documento" para ver los bloques.</p>
      </div>
    );
  }

  if (blocks.length === 0) {
    return (
      <div className="text-center py-20">
        <i className="fas fa-exclamation-triangle text-6xl text-amber-500 mb-4"></i>
        <h3 className="text-xl text-slate-400 mb-2">No se detectaron bloques</h3>
        <p className="text-slate-500 text-sm">El documento no contiene encabezados Markdown reconocibles.</p>
      </div>
    );
  }

  const holdCount = blocks.filter(b => b.tieneHold).length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-white">{blocks.length}</div>
          <div className="text-xs text-slate-400 mt-1">Bloques totales</div>
        </div>
        <div className="bg-slate-800/60 border border-amber-500/30 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-amber-400">{holdCount}</div>
          <div className="text-xs text-slate-400 mt-1">Con HOLD</div>
        </div>
        <div className="bg-slate-800/60 border border-emerald-500/30 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-emerald-400">{blocks.filter(b => b.clasificacion === 'NORMA VIGENTE').length}</div>
          <div className="text-xs text-slate-400 mt-1">Norma vigente</div>
        </div>
        <div className="bg-slate-800/60 border border-teal-500/30 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-teal-400">{blocks.filter(b => b.clasificacion === 'DESARROLLO PROPIO').length}</div>
          <div className="text-xs text-slate-400 mt-1">Desarrollo propio</div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {['todos', 'NORMA VIGENTE', 'TEXTO OFICIAL', 'DOCUMENTO INSTITUCIONAL', 'DESARROLLO PROPIO', 'EVIDENCIA', 'HOLD'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === f
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-600/50'
            }`}
          >
            {f === 'todos' ? 'Todos' : f}
          </button>
        ))}
      </div>

      {/* Blocks */}
      <div className="space-y-2">
        {filteredBlocks.map((block, index) => {
          const colors = classColors[block.clasificacion] || classColors['DESARROLLO PROPIO'];
          return (
            <div key={index} className={`border rounded-xl overflow-hidden ${colors.border} bg-slate-800/40`}>
              <button
                onClick={() => setExpandedBlock(expandedBlock === index ? null : index)}
                className="w-full px-5 py-3 flex items-center gap-3 text-left hover:bg-slate-700/20 transition-colors"
              >
                <span className={`px-2 py-0.5 ${colors.bg} ${colors.text} rounded text-xs font-mono font-bold`}>
                  {block.numero}
                </span>
                <span className="flex-1 text-sm font-medium text-white truncate">{block.titulo}</span>
                <span className={`px-2 py-0.5 ${colors.bg} ${colors.text} rounded-full text-[10px] font-medium`}>
                  {block.clasificacion}
                </span>
                {block.tieneHold && (
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full text-[10px] font-bold">
                    HOLD
                  </span>
                )}
                <i className={`fas fa-chevron-down text-slate-500 text-xs transition-transform ${expandedBlock === index ? 'rotate-180' : ''}`}></i>
              </button>
              {expandedBlock === index && (
                <div className="px-5 pb-4 border-t border-slate-700/30 pt-3">
                  <pre className="text-xs text-slate-400 font-mono whitespace-pre-wrap max-h-96 overflow-y-auto bg-slate-900/50 rounded-lg p-4">
                    {block.contenido || '(Sin contenido)'}
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
