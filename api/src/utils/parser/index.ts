import exampleUrls from './examplesUrls'
export * from './parser'

export const officialDomains = exampleUrls.map((url: string) => {
  const { hostname } = new URL(url)

  return hostname
})
