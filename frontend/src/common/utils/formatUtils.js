const formatNumber = (number) => {
/*   number = parseFloat(number).toFixed(5) */
  number = new Intl.NumberFormat('es-IN', { maximumSignificantDigits: 5 }).format(number)
  return number;
}

const formatDate = (date) => {
  const dateOptions = {year: '2-digit', month: '2-digit', day: '2-digit'}
  const timeOptions = {hour: '2-digit', minute: '2-digit'}
  return new Date(date).toLocaleDateString('en-gb', dateOptions) + ' ' + new Date(date).toLocaleTimeString('en-gb', timeOptions)
}

export { formatNumber, formatDate };