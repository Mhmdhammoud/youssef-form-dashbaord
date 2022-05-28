String.prototype.toUpperFirst = function () {
  return this.toLowerCase()
    .split(' ')
    .map((val) => val.charAt(0).toUpperCase() + val.slice(1))
    .join(' ')
    .split('_')
    .join(' ')
}
