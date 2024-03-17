// Main Types
export type Parts = {
  partType: "HD" | "SSD" | "PLACA MÃE" | "PROCESSADOR" | "PLACA GRÁFICA" | "MEMÓRIA RAM",
  name: string
  point: number
  }

// Components Types
 export type SelectOption = {
    value: string,
    label: string
  }