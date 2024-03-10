import { useToast } from "@/components/ui/use-toast"
import { usePartStore } from "../storage"


export const getParts = async () => {
    const { setDataTable } = usePartStore.getState().dispatch;

const payload = {
  dados : [{
        tipo: "MEMÓRIA RAM",
        nome: "RXT CORSAIR",
        pontos: 200
      },
      {
        tipo: "PROCESSADOR",
        nome: "I5-10400F",
        pontos: 1000
      },
      {
        tipo: "PLACA GRÁFICA",
        nome: "RX 7600 AMD",
        pontos: 2400
      },
      {
        tipo: "MEMÓRIA RAM",
        nome: "RXT CORSAIR",
        pontos: 200
      },
      {
        tipo: "PROCESSADOR",
        nome: "I5-10400F",
        pontos: 1000
      },
      {
        tipo: "PLACA GRÁFICA",
        nome: "RX 7600 AMD",
        pontos: 2400
      },
      {
        tipo: "MEMÓRIA RAM",
        nome: "RXT CORSAIR",
        pontos: 200
      },
      {
        tipo: "PROCESSADOR",
        nome: "I5-10400F",
        pontos: 1000
      },
      {
        tipo: "PLACA GRÁFICA",
        nome: "RX 7600 AMD",
        pontos: 2400
      },
      {
        tipo: "MEMÓRIA RAM",
        nome: "RXT CORSAIR",
        pontos: 200
      },
      {
        tipo: "PROCESSADOR",
        nome: "I5-10400F",
        pontos: 1000
      },
      {
        tipo: "PLACA GRÁFICA",
        nome: "RX 7600 AMD",
        pontos: 2400
      }
    ]
}

// Call para o back será aqui

await setDataTable(payload.dados)
}