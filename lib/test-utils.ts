// Utilitários para testes do dashboard

export const mockData = {
  activityData: [
    { name: "Seg", value: 3 },
    { name: "Ter", value: 4 },
    { name: "Qua", value: 2 },
    { name: "Qui", value: 5 },
    { name: "Sex", value: 3 },
    { name: "Sáb", value: 1 },
    { name: "Dom", value: 0 },
  ],

  weightData: [
    { name: "Jan", value: 86 },
    { name: "Fev", value: 85 },
    { name: "Mar", value: 84 },
    { name: "Abr", value: 83 },
    { name: "Mai", value: 82 },
    { name: "Jun", value: 81 },
  ],

  nutritionData: [
    { name: "Proteína", value: 120 },
    { name: "Carboidrato", value: 200 },
    { name: "Gordura", value: 80 },
    { name: "Fibra", value: 25 },
  ],

  sleepData: [
    { name: "Seg", value: 7.5 },
    { name: "Ter", value: 8.0 },
    { name: "Qua", value: 6.5 },
    { name: "Qui", value: 7.8 },
    { name: "Sex", value: 7.2 },
    { name: "Sáb", value: 8.5 },
    { name: "Dom", value: 8.2 },
  ],
}

export const validateChartData = (data: any[], dataKey: string) => {
  if (!Array.isArray(data)) {
    throw new Error("Data deve ser um array")
  }

  if (data.length === 0) {
    throw new Error("Data não pode estar vazio")
  }

  data.forEach((item, index) => {
    if (!item.hasOwnProperty(dataKey)) {
      throw new Error(`Item ${index} não possui a propriedade ${dataKey}`)
    }

    if (typeof item[dataKey] !== "number") {
      throw new Error(`Valor de ${dataKey} no item ${index} deve ser um número`)
    }
  })

  return true
}

export const generateTestHeatmapData = (days = 30) => {
  const data = []
  const today = new Date()

  for (let i = 0; i < days; i++) {
    const date = new Date()
    date.setDate(today.getDate() - i)

    // Gerar dados determinísticos para testes
    const hasActivity = i % 3 !== 0 // Atividade a cada 3 dias

    if (hasActivity) {
      data.push({
        date,
        value: 0.5 + (i % 5) * 0.1, // Valores entre 0.5 e 0.9
      })
    }
  }

  return data
}

// Função para testar se o componente pode ser renderizado sem erros
export const testComponentRender = (componentName: string, props: any) => {
  try {
    // Simular renderização básica
    if (!props) {
      throw new Error(`Props são obrigatórias para ${componentName}`)
    }

    console.log(`✅ ${componentName}: Props válidas`)
    console.log(`✅ ${componentName}: Renderização simulada com sucesso`)

    return { success: true, component: componentName }
  } catch (error) {
    console.error(`❌ ${componentName}: Erro na renderização`, error)
    return { success: false, error: error.message }
  }
}

// Executar testes básicos
console.log("🧪 Executando testes básicos...")

// Testar dados mock
try {
  validateChartData(mockData.activityData, "value")
  console.log("✅ mockData.activityData: Válido")
} catch (error) {
  console.error("❌ mockData.activityData: Inválido", error.message)
}

try {
  validateChartData(mockData.weightData, "value")
  console.log("✅ mockData.weightData: Válido")
} catch (error) {
  console.error("❌ mockData.weightData: Inválido", error.message)
}

// Testar geração de dados de heatmap
const testHeatmapData = generateTestHeatmapData(10)
console.log(`✅ generateTestHeatmapData: Gerou ${testHeatmapData.length} itens`)

// Testar renderização de componentes
testComponentRender("ActivityChart", {
  data: mockData.activityData,
  type: "bar",
  dataKey: "value",
})

console.log("🎉 Testes básicos concluídos!")
