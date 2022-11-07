import JSZip from 'jszip'
import FileSaver from 'file-saver'
import Recipe from 'models/Recipe'

import renderRecipe from './render/renderRecipe'

const zip = new JSZip()

const downloadAllRecipes = (recipes: Recipe[]) => {
  return new Promise<void>((resolve, reject) => {
    recipes.forEach((recipe: Recipe) => {
      zip.file(`${recipe.name}.txt`, renderRecipe(recipe))
    })

    zip.generateAsync({ type: 'blob' }).then(content => {
      const date = new Date().toJSON().replace(/T.*/, '')

      FileSaver.saveAs(content, `CookBook-${date}.zip`)
      resolve()
    })
  })
}

export default downloadAllRecipes
