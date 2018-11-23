// @flow

export const isEmptyObject = (obj: Object) => (
  Object.keys(obj).length === 0 && obj.constructor === Object
)

export const removeUrlPrefix = (url: string) => {
  const removeProtocol = url.replace(/(^\w+:|^)\/\//, '')
  const removeSubdomain = removeProtocol.replace(/www./, '')
  return removeSubdomain
}
