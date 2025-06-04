import { describe, it, expect } from "@jest/globals"

// Mock do componente HealthStatCard
const mockHealthStatCard = {
  render: (props: {
    title: string
    value: number | string
    unit?: string
    trend?: number
    icon?: string
  }) => {
    if (!props.title) {
      return { error: "Título é obrigatório" }
    }

    if (props.value === undefined || props.value === null) {
      return { error: "Valor é obrigatório" }
    }

    return {
      success: true,
      rendered: {
        title: props.title,
        value: props.value,
        unit: props.unit,
        trend: props.trend,
        icon: props.icon
      }
    }
  }
}

describe("HealthStatCard Component", () => {
  it("deve renderizar com dados válidos", () => {
    const result = mockHealthStatCard.render({
      title: "Peso",
      value: 75.5,
      unit: "kg",
      trend: 0.5,
      icon: "scale"
    })

    expect(result.success).toBe(true)
    expect(result.rendered).toMatchObject({
      title: "Peso",
      value: 75.5,
      unit: "kg",
      trend: 0.5,
      icon: "scale"
    })
  })

  it("deve retornar erro quando não há título", () => {
    const result = mockHealthStatCard.render({
      title: "",
      value: 75.5
    })

    expect(result.error).toBe("Título é obrigatório")
  })

  it("deve retornar erro quando não há valor", () => {
    const result = mockHealthStatCard.render({
      title: "Peso",
      value: undefined as any
    })

    expect(result.error).toBe("Valor é obrigatório")
  })

  it("deve renderizar sem unidade opcional", () => {
    const result = mockHealthStatCard.render({
      title: "Score",
      value: 85
    })

    expect(result.success).toBe(true)
    expect(result.rendered.unit).toBeUndefined()
  })
})
