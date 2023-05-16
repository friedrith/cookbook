import Recipe from '~/src/types/Recipe'
import Category from '../Category'

const shouldHelpUserAboutCategories = (
  recipes: Recipe[],
  categories: Category[],
) =>
  recipes.length > 5 &&
  categories.length < 4 &&
  recipes.length > 10 * categories.length

export default shouldHelpUserAboutCategories
