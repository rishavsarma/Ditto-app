export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n)

export function computeSavings(amount: number, percent: number) {
  const saving = Math.max(0, Math.round((amount * percent) / 100))
  const payable = Math.max(0, amount - saving)
  return { saving, payable }
}
