export function formatCurrency(
  amount: number,
  options?: Intl.NumberFormatOptions
) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
    ...options,
  }).format(amount)
}
