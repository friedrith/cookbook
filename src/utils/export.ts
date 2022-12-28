import JSZip from 'jszip'
import FileSaver from 'file-saver'
import Recipe from 'models/Recipe'

import renderRecipe from './render/renderRecipe'

const zip = new JSZip()

const downloadAllRecipes = (recipes: Recipe[], t: (v: string) => string) => {
  return new Promise<void>(async (resolve, reject) => {
    const recipesText = await Promise.all(recipes.map(r => renderRecipe(r, t)))

    recipes.forEach((recipe: Recipe, index: number) => {
      zip.file(`${recipe.name}.txt`, recipesText[index])
    })

    zip.generateAsync({ type: 'blob' }).then(content => {
      const date = new Date().toJSON().replace(/T.*/, '')

      FileSaver.saveAs(content, `CookBook-${date}.zip`)
      resolve()
    })
  })
}

export default downloadAllRecipes
