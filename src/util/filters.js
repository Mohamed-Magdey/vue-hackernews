export function host(url) {
  if (!url) {
    return ''
  }
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www') {
    parts.shift()
  }
  return parts.join('.')
}