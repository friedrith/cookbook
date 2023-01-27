const bananaBreadRecipe = {
  name: 'Banana Bread',
  keywords: ['banana', 'desert', 'breakfast'],
  imageUrl: 'https://images.unsplash.com/photo-1596241913027-34358037e159',
  stats: {
    durations: { value: 30, unit: 'min' },
    servings: { value: 4, unit: 'servings' },
  },
  ingredients: [
    { name: 'eggs', measure: { value: 2, unit: 'count' } },
    { name: 'bananas', measure: { value: 3, unit: 'count' } },
    { name: 'milk', measure: { value: 1.5, unit: 'cup' } },
    { name: 'flour', measure: { value: 3 / 4, unit: 'cup' } },
    { name: 'salt', measure: { value: 1, unit: 'pinch' } },
    { name: 'vanilla extract', measure: { value: 1, unit: 'tsp' } },
    { name: 'baking soda', measure: { value: 1 / 2, unit: 'tsp' } },
    { name: 'butter', measure: { value: 0.5, unit: 'cup' } },
  ],
  steps: [
    {
      description:
        'Preheat the oven to 350°F (175°C), and butter an 8 x 4-inch loaf pan.',
    },
    {
      description:
        'In a mixing bowl, mash the ripe bananas with a fork until completely smooth. Stir the melted butter into the mashed bananas.',
    },
    {
      description: 'Mix in the baking soda and salt.',
    },
    {
      description: 'Stir in the sugar, beaten egg, and vanilla extract.',
    },
    {
      description: 'Mix in the flour.',
    },
    {
      description: 'Pour the batter into your prepared loaf pan.',
    },
    {
      description:
        'Bake for 55 to 65 minutes at 350°F (175°C), or until a toothpick or wooden skewer inserted into the center comes out clean. A few dry crumbs are okay; streaks of wet batter are not. If the outside of the loaf is browned but the center is still wet, loosely tent the loaf with foil and continue baking until the loaf is fully baked.',
    },
    {
      description:
        'Remove from oven and let cool in the pan for a few minutes. Then remove the banana bread from the pan and let cool completely before serving. Slice and serve. ',
    },
  ],
}

const waffleRecipe = {
  name: 'Waffle',
  keywords: ['waffle', 'desert', 'breakfast'],
  imageUrl: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d',
  stats: {
    duration: { value: 17, unit: 'min' },
    servings: { value: 15, unit: 'servings' },
  },
  ingredients: [
    { name: 'eggs', measure: { value: 3, unit: 'count' } },
    { name: 'flour', measure: { value: 200, unit: 'g' } },
    { name: 'sugar', measure: { value: 30, unit: 'g' } },
    { name: 'butter', measure: { value: 20, unit: 'g' } },
    { name: 'milk', measure: { value: 25, unit: 'cl' } },
    { name: 'salt', measure: { value: 1, unit: 'pinch' } },
    { name: 'coffee', measure: { value: 10, unit: 'some' } },
  ],
  steps: [
    {
      description:
        "Mettre la farine dans un saladier, y ajouter le sucre, les jaunes d'œufs et le beurre ramolli.",
    },
    {
      description:
        "Délayer peu à peu le tout en y ajoutant le lait pour qu'il n'y ait pas de grumeaux.",
    },
    {
      description:
        'Battre les blancs en neige avec une pincée de sel et les ajouter au restant en remuant délicatement.',
    },
    {
      description: 'Cuire le tout dans un gaufrier légèrement beurré.',
    },
    {
      description: 'Bon appétit !!',
    },
  ],
}

let i = 0

export const recipes = () =>
  [bananaBreadRecipe, waffleRecipe]
    .map(recipe => ({ ...recipe, id: i++ }))
    .reduce(
      (acc, recipe) => ({
        ...acc,
        [recipe.id]: recipe,
      }),
      {},
    )
