export type Tipos = "HD" | "SSD" | "PLACA MÃE" | "PROCESSADOR" | "PLACA GRÁFICA" | "MEMÓRIA RAM" ;

export type Parts = {
  tipo: Tipos,
  nome: string
  pontos: number
  }