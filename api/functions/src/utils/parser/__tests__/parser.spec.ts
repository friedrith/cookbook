import { promises as fs } from 'fs'
import * as path from 'path'

import { parseRecipe } from '../parser'
import examplesUrls from '../examplesUrls'

const getFixture = (filename: string): Promise<string> => {
  const pathname = path.join(__dirname, `../__fixtures__/${filename}`)

  return fs.readFile(pathname, 'utf8')
}

describe('parserRecipe', () => {
  examplesUrls.forEach(url => {
    const { hostname } = new URL(url)

    const basename = hostname.replace(/\./g, '_')

    it(`should return a recipe for ${hostname}`, async () => {
      const dom = await getFixture(`${basename}.html`)
      const expectedRecipe = JSON.parse(await getFixture(`${basename}.json`))

      expect(await parseRecipe(url, dom)).toEqual(expectedRecipe)
    })
  })
})
