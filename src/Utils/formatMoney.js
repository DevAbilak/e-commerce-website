export function formatMoney(priceCents) {
  return priceCents >= 0 ?`$${(priceCents / 100).toFixed(2)}` : `-$${((priceCents * -1) / 100).toFixed(2)}`
}