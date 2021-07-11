export function currency(currencyFormat = 'EUR') {
  return new Intl.NumberFormat('de-AT', {
    style: 'currency',
    currency: currencyFormat,
  });
}
