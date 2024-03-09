// Main Types
export type Parts = {
  tipo: "HD" | "SSD" | "PLACA MÃE" | "PROCESSADOR" | "PLACA GRÁFICA" | "MEMÓRIA RAM",
  nome: string
  pontos: number
  }

// Components Types
 export type SelectOption = {
    value: string,
    label: string
  }