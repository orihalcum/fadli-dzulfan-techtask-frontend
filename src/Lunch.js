import React, { useState, useEffect } from 'react';
import './Lunch.scss'
import { AppApi } from './api';
import AppContainer from './components/AppContainer';
import AppHeader from './components/AppHeader';
import AppContent from './components/AppContent'
import AppAside from './components/AppAside';
import { AppRecipe } from './components/AppRecipe';
import { AppIngredients } from './components/AppIngredients';
import { AppModalRecomendationRecipe, AppModalDetailRecipe, AppModalDatePicker } from './components/AppModal'
import AppToastMessage from './components/AppToastMessage'

import { filterIngredients } from './helpers'

const _recipes = [ 
  "https://www.pumpkinnspice.com/wp-content/uploads/2016/08/grilled-ham-cheese-sandwich-26-1024x683.jpg", 
  "https://www.onceuponachef.com/images/2019/07/Big-Italian-Salad-1200x1553.jpg", 
  "https://assets-a1.kompasiana.com/items/album/2017/07/11/hotdogg-5964764d83c1e62953732352.jpg"
]

const Lunch = () => {
  
  // Define Vars

    const [pickDate, setPickDate] = useState(new Date())
    const [recipes, setRecipes] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [recomendation, setRecomendation] = useState([])
    const [modalData, setModalData] = useState('')
    const [showModalDetailRecipe, setShowModalDetailRecipe] = useState(false)
    const [showModalRecomendationRecipe, setShowModalRecomendationRecipe] = useState(false)
    const [showDetailRecomendationRecipe, setShowDetailRecomendationRecipe] = useState(false)
    const [showModalDatePicker, setShowModalDatePicker] = useState(false)
    const [showAside, setShowAside] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    
  // End of Define Vars


  // Getter 

    const getRecipes = (qs = '') => {
      let queryString = {
        ingredients: qs
      }
      AppApi.getRecipes(queryString)
        .then(({ status, data }) => {
          if(status === 200) {
            if(qs === '')
              setRecipes(data.map((item, index) => { item.image = _recipes[index]; return item }))
            else
              setRecomendation(data.map((item, index) => { item.image = _recipes[index]; return item }))
          }
        }).catch(err => {
          console.log(err)
          showErrorMessage('Something went wrong while get recipes!', 5)
        })
    }

    const getIngredients = () => {
      AppApi.getIngredients()
        .then(({ status, data }) => {
          if(status === 200)
            data = filterIngredients(data, pickDate)
            setIngredients(data.map(item => { item.checked = false; return item }))
        }).catch(err => {
          console.log(err)
          showErrorMessage('Something went wrong while get ingredients!', 5)
        })
    }
  
  // End of Getter


  // Handler
    
    const handleClickRecipe = ({...recipe}) => {
      setModalData(recipe)
      setShowModalDetailRecipe(true)
    }

    const handlePickIngredient = (value, index) => {
      let data = ingredients
      data[index]['checked'] = value
      setIngredients(data)
      
      let picked = ingredients.filter(item => item.checked).map(item => item.title)
      if(picked.length > 0) getRecipes(picked.toString())
      setShowModalRecomendationRecipe(ingredients.filter(item => item.checked).length > 0)
    }

    const handleChangeDate = (e) => {
      setPickDate(e)
      setShowModalDatePicker(false)
      if(filterIngredients(ingredients, e).length === 0) clearPick()
    }

    const closeModal = () => {
      setModalData('')
      setShowModalDetailRecipe(false)
    }
    
    const clearPick = () => {
      setIngredients(ingredients.map(item => { item.checked = false; return item }))
      setShowModalRecomendationRecipe('')
      setShowDetailRecomendationRecipe(false)
    }

    const showErrorMessage = (message, duration) => {
      setToastMessage(message)
      setTimeout(() => {
        setToastMessage('')
      }, duration * 1000)
    }

  // End of Handler


  // Props

    const appAsideProps = {
      setShowAside,
      showAside
    }

    const appHeaderProps = {
      showAside,
      setShowAside,
      setShowModalDatePicker,
      pickDate
    }

    const appContentProps = {
      setShowAside,
      showModalRecomendationRecipe
    }

    const appRecipeProps = {
      recipes, 
      viewDetailRecipe: handleClickRecipe
    }
  
    const appIngredientsProps = {
      ingredients, 
      handlePickIngredient,
      showModalRecomendationRecipe,
      clearPick,
      pickDate
    }

    const modalDetailRecipeProps = {
      modalData,
      showModalDetailRecipe,
      closeModal
    }

    const modalRecomentaionProps = {
      recomendation,
      showModalRecomendationRecipe,
      viewDetailRecipe: handleClickRecipe,
      showDetailRecomendationRecipe, 
      setShowDetailRecomendationRecipe
    }

    const modalDatePick = {
      showModalDatePicker, 
      setShowModalDatePicker,
      pickDate,
      handleChangeDate
    } 

  // End of Props


  useEffect(() => {
    if(recipes.length === 0) getRecipes()
    if(ingredients.length === 0) getIngredients()
  })

  return (
    <div data-testid="App" className="App">
      <AppAside { ...appAsideProps } />
      <AppContainer>
        <AppHeader { ...appHeaderProps } />
        <AppContent { ...appContentProps }>
          <AppRecipe { ...appRecipeProps } />          
          <AppIngredients { ...appIngredientsProps } />
        </AppContent>
        <AppModalDetailRecipe { ...modalDetailRecipeProps } />
        <AppModalRecomendationRecipe { ...modalRecomentaionProps } />
        <AppModalDatePicker { ...modalDatePick } />
        <AppToastMessage message={ toastMessage } />
      </AppContainer>
    </div>
  );
};

export default Lunch;