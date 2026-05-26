export interface VisionDigital {
  dondeTeVes: string;
  cuantoQuieresGanar: string;
  suenos: string[];
  nivelCompromiso: number;
  propositoDeVida: string;
}

export interface Competidor {
  nombre: string;
  instagram: string;
  nicho: string;
  producto: string;
  observacion: string;
}

export interface Mercado {
  mercado: string;
  nicho: string;
  micronicho: string;
  competidores: Competidor[];
}

export interface Avatar {
  rangoEdad: string;
  sexo: string;
  rangoIngresos: string;
  paises: string;
  ocupacion: string;
  dolores: string[];
  suenos: string[];
  metas: string[];
  erroresComunes: string[];
}

export interface ProductoEscalera {
  nombre: string;
  precio: string;
  duracion: string;
  modulos: string[];
  bonuses: string[];
}

export interface Oferta {
  productoGratuito: string;
  productoLowTicket: ProductoEscalera;
  productoHighTicket: string;
}

export interface Transformacion {
  granProblema: string;
  transformacionFinal: string;
  vehiculoUnico: string;
  promesa: string;
}

export interface LiderCarismatico {
  arquetipos: string[];
  palabrasQueDefinen: string[];
  colores: string[];
  imagen: string[];
  simbolos: string[];
  historia: string;
  obstaculos: string[];
  personajes: string[];
  logros: string[];
}

export interface Movimiento {
  causaPropósito: string;
  creencias: string[];
  enemigosEnComun: string[];
  rituales: string[];
  slogan: string;
  frasesYMantras: string[];
}

export interface Contenido {
  tematica: string;
  frecuencia: string;
  proporcionGeneral: number;
  proporcionNichado: number;
  pilares: string[];
  subtemasDesarrolloPersonal: string[];
  subtemasMarketing: string[];
  tiposContenido: {
    valor: number;
    viral: number;
    venta: number;
    vidaPropia: number;
  };
  formatosReels: string[];
  formatosPost: string[];
  formatosCarrusel: string[];
  formatosHistorias: string[];
}

export interface Idea {
  id: string;
  link: string;
  contenido: string;
  cuentas: string;
  historias: string;
}

export interface RoadmapData {
  visionDigital: VisionDigital;
  mercado: Mercado;
  avatar: Avatar;
  oferta: Oferta;
  transformacion: Transformacion;
  liderCarismatico: LiderCarismatico;
  movimiento: Movimiento;
  contenido: Contenido;
  ideas: Idea[];
}

export type ModuleId =
  | 'vision'
  | 'mercado'
  | 'avatar'
  | 'oferta'
  | 'transformacion'
  | 'lider'
  | 'movimiento'
  | 'contenido'
  | 'ideas'
  | 'dashboard';
