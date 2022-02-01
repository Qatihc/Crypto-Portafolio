const formatNumber = (number) => {
/*   number = parseFloat(number).toFixed(5) */
  number = new Intl.NumberFormat('es-IN', { maximumSignificantDigits: 5 }).format(number)
  return number;
}

export default formatNumber;