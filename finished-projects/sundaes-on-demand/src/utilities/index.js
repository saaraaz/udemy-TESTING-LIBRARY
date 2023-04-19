// since we don't have typescript here, we use a 'JSDoc' comment

/**
 * @function formatCurrency
 * formats number as currency (US Dollars)
 *
 * @param {number} currency
 * @returns {string} number formatted as currency
 *
 * @example
 * formatCurrency(0)
 * // => $0.00
 */

export function formatCurrency(currency) {
  // there's an 'International' obj that comes w/ JS:
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(currency);
}
