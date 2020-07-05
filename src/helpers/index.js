export const destructIngredients = ingredients => ingredients.toString().split(',').join(', ')

export const isBeforeDate = (dateA, dateB) => dateA <= dateB;

export const filterIngredients = (data, pickDate) => data.filter(item => isBeforeDate(new Date(pickDate), new Date(item['use-by'])) === true)
