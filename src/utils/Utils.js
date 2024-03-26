import resolveConfig from "tailwindcss/resolveConfig"

export const tailwindConfig = () => {
  // Tailwind config
  return resolveConfig("./src/css/tailwind.config.js")
}

export const hexToRGB = (h) => {
  let r = 0
  let g = 0
  let b = 0
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`
    g = `0x${h[2]}${h[2]}`
    b = `0x${h[3]}${h[3]}`
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`
    g = `0x${h[3]}${h[4]}`
    b = `0x${h[5]}${h[6]}`
  }
  return `${+r},${+g},${+b}`
}

export const formatValue = (value) =>
  Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 3,
    notation: "compact"
  }).format(value)

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }
  return date.toLocaleString("es-ES", options)
}

export const formatCurrencyPesos = (amount) => {
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP"
  })
  return formatter.format(amount)
}

export const formatCurrencyUSD = (amount) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  })
  return formatter.format(amount)
}
