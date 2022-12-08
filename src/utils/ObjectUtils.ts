export const getExactObjectType = (object: Object) => {
  return Object.prototype.toString.call(object).split(' ')[1].slice(0, -1)
}
