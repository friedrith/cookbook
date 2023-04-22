import { writeFile } from 'node:fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const localesDirname = join(__dirname, '../../public/locales/')

const read = async stream => {
  const chunks = []
  for await (const chunk of stream) chunks.push(chunk)
  return Buffer.concat(chunks).toString('utf8')
}

const addPath = (obj, path, value) => {
  const properties = path.split('/')

  let tmpObj = obj
  let lastProperty = null
  let lastTmpObj = obj

  properties.forEach(p => {
    if (!tmpObj[p]) {
      tmpObj[p] = {}
    }
    lastTmpObj = tmpObj
    lastProperty = p
    tmpObj = tmpObj[p]
  })

  lastTmpObj[lastProperty] = value ?? 'TODO'
}

const convertToLocales = async () => {
  const csv = await read(process.stdin)

  const worksheet = csv
    .split('\n')
    .map(l => l.split('",').map(c => c.replace(/^"/, '').replace(/"$/, '')))

  const [headers, ...lines] = worksheet

  const localeCodes = headers.slice(2)

  let locales = {}

  for (let line of lines) {
    const [namespace, path, ...localesValues] = line

    for (let index in localeCodes) {
      const localeCode = localeCodes[index]
      locales[localeCode] = {
        ...locales[localeCode],
        [namespace]: {
          ...locales?.[localeCode]?.[namespace],
        },
      }

      addPath(locales[localeCode][namespace], path, localesValues[index])
    }
  }

  for (let localCode of localeCodes) {
    for (let namespace of Object.keys(locales[localCode])) {
      const filename = join(localesDirname, localCode, `${namespace}.json`)

      const content = `${JSON.stringify(
        locales[localCode][namespace],
        null,
        2,
      )}\n`

      await writeFile(filename, content, { encoding: 'utf-8' })
    }
  }
}

convertToLocales()
  .then(() => {})
  .catch(console.error)
