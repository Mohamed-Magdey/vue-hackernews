import { host, timeAgo } from '../filters'

describe('host', () => {
  test('returns empty string if url is undefined', () => {
    expect(host(undefined)).toBe('')
  })

  test('returns the host from a URL beginning with http://', () => {
    const url = 'http://google.com'
    expect(host(url)).toBe('google.com')
  })

  test('returns the host from a URL beginning with https://', () => {
    const url = 'https://google.com'
    expect(host(url)).toBe('google.com')
  })

  test('removes path from URL', () => {
    const url = 'google.com/long/path/ '
    expect(host(url)).toBe('google.com')
  })

  test('removes www from URL', () => {
    const url = 'www.blogs.google.com/'
    expect(host(url)).toBe('blogs.google.com')
  })

  test('keeps the subdomain', () => {
    const url = 'https://blogs.google.com/long/path/ '
    expect(host(url)).toBe('blogs.google.com')
  })

  test('returns one subdomain and removes others', () => {
    const url = 'personal.blogs.google.com/long/path/ '
    expect(host(url)).toBe('blogs.google.com')
  })
})