import { promises as fs } from 'fs'
import * as path from 'path'

import examplesUrls from '../examplesUrls'
import * as parser from '../index'

const fixturesfolder = path.join(__dirname)

const generateFixture = async (url: string) => {
  const { hostname } = new URL(url)

  const basename = hostname.replace(/\./g, '_')

  const htmlFixtureFilename = path.join(fixturesfolder, `${basename}.html`)

  let dom = ''

  try {
    dom = await fs.readFile(htmlFixtureFilename, { encoding: 'utf8' })
  } catch {
    dom = await (await fetch(url.toString())).text()

    await fs.writeFile(htmlFixtureFilename, dom)
  }

  try {
    const recipe = await parser.parseRecipe(url, dom)

    const recipeFixtureFilename = path.join(fixturesfolder, `${basename}.json`)

    await fs.writeFile(recipeFixtureFilename, JSON.stringify(recipe, null, 4))

    console.log(`${hostname} done`)
  } catch (error) {
    throw new Error(`error while parsing ${hostname} ${error}`)
  }
}

;(async () => {
  const results = await Promise.allSettled(examplesUrls.map(generateFixture))

  console.log(
    'results',
    results
      .filter(r => r.status !== 'fulfilled')
      .map(r => ('reason' in r ? r.reason : ''))
  )
})()
