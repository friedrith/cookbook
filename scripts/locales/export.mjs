import { readdir, readFile } from 'node:fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const localesDirname = join(__dirname, '../../public/locales/')

const addTranslation = (namespace, translationsById, locale, path, value) => {
  if (typeof value === 'string') {
    translationsById[`${namespace}${path}`] = {
      namespace: namespace,
      path,
      ...translationsById[`${namespace}${path}`],
      locales: {
        ...translationsById[`${namespace}${path}`]?.locales,
        [locale]: value ?? '[TODO]',
      },
    }
  } else if (typeof value === 'object') {
    Object.entries(value).forEach(([key, v]) => {
      addTranslation(namespace, translationsById, locale, `${path}/${key}`, v)
    })
  }
}

const convertToCSV = async () => {
  const allLocales = await readdir(localesDirname)

  const translationsById = {}

  for (let locale of allLocales) {
    const namespaces = await readdir(join(localesDirname, locale))

    for (let namespace of namespaces) {
      const content = JSON.parse(
        await readFile(join(localesDirname, locale, namespace)),
      )

      for (let path of Object.keys(content)) {
        const value = content[path]

        addTranslation(
          namespace.replace(/\.json/, ''),
          translationsById,
          locale,
          path,
          value,
        )
      }
    }
  }

  const worksheet = [['namespace', 'path', ...allLocales]]

  for (let row of Object.values(translationsById)) {
    const { namespace, path, locales } = row

    const line = [
      namespace,
      path,
      ...allLocales.map(l => locales[l] ?? '[TODO] undefined'),
    ]

    worksheet.push(line)
  }

  const csv = worksheet
    .map(r => r.map(l => `"${l.replace(/"/g, '\\"')}"`).join(','))
    .join('\n')

  process.stdout.write(csv)
}

convertToCSV()
  .then(() => {})
  .catch(console.error)
