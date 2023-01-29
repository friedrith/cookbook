import Category from '../Category'

const shouldShowCategories = (categories: Category[]) => categories.length >= 1

export default shouldShowCategories
