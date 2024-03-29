// https://stackoverflow.com/questions/70142391/importing-node-fetch-in-node-project-with-typescript
// eslint-disable-next-line no-new-func
const importDynamic = new Function('modulePath', 'return import(modulePath)')

const nodeFetch = async (...args: any[]) => {
  const module = await importDynamic('node-fetch')
  return module.default(...args)
}

const headers = {
  authority: 'scrapeme.live',
  dnt: '1',
  'upgrade-insecure-requests': '1',
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36',
  accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'sec-fetch-site': 'none',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-user': '?1',
  'sec-fetch-dest': 'document',
  'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
}

const customFetch = async (url: string) => {
  return await (await nodeFetch(url.toString(), { headers })).text()
}

export default customFetch
