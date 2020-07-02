import axios from 'axios'

const API_URL = 'https://lb7u7svcm5.execute-api.ap-southeast-1.amazonaws.com/dev/'

const params = { url: API_URL }

const app = ({ url }) => {
  return {
    getIngredients: () => axios.get(`${url}ingredients`),
    getRecipes: qs => axios.get(`${url}recipes`, { params: { ...qs } }),
  }
}

export const AppApi = app(params)

