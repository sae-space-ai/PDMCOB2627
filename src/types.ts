export interface HoldItem {
  id: string;
  bloque: string;
  elemento: string;
  motivo: string;
  fuenteNecesaria: string;
  responsable: string;
  estado: 'abierto' | 'cerrado' | 'en-verificacion';
}

export interface AuditCheck {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: 'normativa' | 'estructural' | 'contenido' | 'despliegue';
  estado: 'pendiente' | 'superado' | 'fallo' | 'hold';
  notas: string;
}

export interface DocumentBlock {
  numero: string;
  titulo: string;
  contenido: string;
  clasificacion: 'NORMA VIGENTE' | 'TEXTO OFICIAL' | 'DOCUMENTO INSTITUCIONAL' | 'DESARROLLO PROPIO' | 'EVIDENCIA' | 'HOLD';
  tieneHold: boolean;
}

export interface Artifact {
  nombre: string;
  ruta: string;
  descripcion: string;
  contenido: string;
  lenguaje: string;
  icono: string;
  generado: boolean;
}

export interface DeployPhase {
  numero: number;
  nombre: string;
  descripcion: string;
  comandos: { etiqueta: string; codigo: string; nota?: string }[];
  completado: boolean;
}

export type TabId = 'documento' | 'bloques' | 'hold' | 'auditoria' | 'artefactos' | 'despliegue' | 'resumen';
