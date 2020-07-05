import React, { useState, useEffect } from 'react';
import { AlignLeftOutlined, CalendarOutlined, LineOutlined, UpOutlined, DownOutlined, GithubOutlined, ArrowLeftOutlined, LinkedinOutlined, GlobalOutlined } from '@ant-design/icons'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Lunch.scss'
import moment from 'moment'
import { AppApi } from './api';
// import { AppToastMessage } from './components/app-toast-message'

import { AppRecipe } from './components/AppRecipe';

const _recipes = [ "https://www.pumpkinnspice.com/wp-content/uploads/2016/08/grilled-ham-cheese-sandwich-26-1024x683.jpg", "https://www.onceuponachef.com/images/2019/07/Big-Italian-Salad-1200x1553.jpg", "https://assets-a1.kompasiana.com/items/album/2017/07/11/hotdogg-5964764d83c1e62953732352.jpg" ]

// 
// Main ------------------------------------------------------------------------------------------------------------------------------------------------------------
//

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
    <div className="App">
      <AppAside { ...appAsideProps } />
      <div data-testid="App-container" className="App-container">
        <div data-testid="App-header" className="App-header">
          <div data-testid="App-menu" className="App-menu">
            <AlignLeftOutlined data-testid="App-menu-toggle-aside" onClick={ () => setShowAside(!showAside) } />
            <div data-testid="App-menu-date" className="App-menu-date">{ moment(pickDate).format('dddd, LL') }</div>
            <CalendarOutlined data-testid="App-menu-calendar" onClick={ () => setShowModalDatePicker(true) } />
          </div>
          <h1 data-testid="App-header-greetings" onClick={ () => setShowAside(false) }>Hello, what would you like to eat today?</h1>
        </div>
        <div data-testid="App-content" className="App-content" onClick={ () => setShowAside(false) } style={{ paddingBottom: showModalRecomendationRecipe ? 110 : 30 }}>
          <AppRecipe { ...appRecipeProps } />          
          <AppIngredients { ...appIngredientsProps } />
        </div>
        <AppModalDetailRecipe { ...modalDetailRecipeProps } />
        <AppModalRecomendationRecipe { ...modalRecomentaionProps } />
        <AppModalDatePicker { ...modalDatePick } />
        <AppToastMessage message={ toastMessage } />
      </div>
    </div>
  );
};

export default Lunch;

// 
// End of Main ------------------------------------------------------------------------------------------------------------------------------------------------------------
//


// 
// Components ------------------------------------------------------------------------------------------------------------------------------------------------------------
//


// Aside

const AppAside = ({ showAside, setShowAside }) => (
  <div className={`App-aside ${ showAside ? 'show' : '' }`}>
    <div className="App-aside-title">
      <ArrowLeftOutlined onClick={ () => setShowAside(false) } />
    </div>
    <div className="App-aside-body">
      <div>
        <h3>Dzulfan Fadli</h3>
      </div>
      <a href="https://github.com/orihalcum/fadli-dzulfan-techtask-frontend" rel="noopener noreferrer" target="_blank" aria-label="github"><GithubOutlined /></a>
      <a href="https://www.linkedin.com/in/dzulfan-fadli/" rel="noopener noreferrer" target="_blank" aria-label="linkedin"><LinkedinOutlined /></a>
      <a href="https://dzulfanfadli.com/" rel="noopener noreferrer" target="_blank" aria-label="linkedin"><GlobalOutlined /></a>
    </div>
  </div>
)

// End of Aside


// Recipe

  // const RecipeList = ({ title, image, ingredients, viewDetailRecipe }) => {
  //   return <div className="App-recipe" style={{ backgroundImage: `url(${image})` }} onClick={ () => viewDetailRecipe({ title, image, ingredients }) } />
  // }

  // const AppRecipe = ({ recipes, viewDetailRecipe }) => {
  //   return (
  //     <div data-testid="App-content-recipes" className="App-content-recipes">
  //       <h3 className="App-content-recipes-title">Recomended Recipes</h3>
  //       <div className="App-content-recipes-list">
  //         { recipes.map((item, key) => <RecipeList { ...item } key={ key } viewDetailRecipe={ viewDetailRecipe } />) }
  //       </div>
  //     </div>
  //   )
  // }

// End of Recipe 


// Ingredients

  const IngredientList = (props) => {

    let { title, index, checked, handlePickIngredient } = props

    return (
      <div className="App-ingredient">
        <span className={ checked ? 'color-primary' : '' }>{ title }</span>
        <small>{ props['use-by'] }</small>
        <input type="checkbox" onChange={ e => handlePickIngredient(e.target.checked, index) } checked={ checked } value={ checked } />
      </div>
    )
  }

  const AppIngredients = (props) => {
    let { ingredients, showModalRecomendationRecipe, clearPick, pickDate } = props
    let data = filterIngredients(ingredients, pickDate)
    return (
      <div data-testid="App-content-ingredients" className="App-content-ingredients mt-30">
        <h3 className="App-content-ingredients-title">Available Ingredients { showModalRecomendationRecipe && <small onClick={ clearPick }>Clear</small> }</h3>
        <div className="App-content-ingredients-list">
          { 
            data.length > 0
            ? data.map((item, key) => <IngredientList { ...item } { ...props } key={ key } index={ key } />)
            : <small className="color-light-grey">No available ingredients</small>
          }
        </div>
      </div>
    )
  }

// End of Ingredients


// Modals

  const AppModal = ({ showModal = false, overlay = false, children }) => (
    <div className={ `App-modal ${ overlay ? 'App-modal-overlay' : 'App-modal-floating' } ${ showModal ? 'show' : '' }` }>
      <div className="App-modal-content">
        { children }
      </div>
    </div>
  )

  const AppModalDetailRecipe = ({ showModalDetailRecipe, closeModal, modalData }) => {
    return (
      <AppModal showModal={ showModalDetailRecipe } overlay="true">
        <div className="overlay" />
        <div className="App-modal-close" onClick={ closeModal }><LineOutlined /></div>
        <div className="App-modal-body">
          {
            modalData !== '' && (
              <div className="recipe">
                <div className="recipe-image" style={{ backgroundImage: `url(${ modalData.image })` }} />
                <div className="recipe-name">
                  <h3>
                    { modalData.title }
                  </h3>
                </div>
                <div className="recipe-ingredients">
                  Ingredients: { destructIngredients(modalData.ingredients) }
                </div>
              </div>
            )
          }
        </div>
      </AppModal>
    )
  }

  const AppModalRecomendationRecipe = ({ recomendation, showDetailRecomendationRecipe, setShowDetailRecomendationRecipe, showModalRecomendationRecipe, viewDetailRecipe }) => {
    return (
      <AppModal showModal={ showModalRecomendationRecipe }>
        <div className="recomendation-recipe">
          <div className="recomendation-recipe-title" onClick={ e => setShowDetailRecomendationRecipe(!showDetailRecomendationRecipe) }>
            Recomendation Recipes ({ recomendation.length }) <span>{ showDetailRecomendationRecipe ? <UpOutlined /> : <DownOutlined /> }</span>
          </div>
          {
            showDetailRecomendationRecipe &&
            <div className="recomendation-recipe-list">
              {
                recomendation.map((item, key) => (
                  <div className="recomendation-recipe-item" key={ key} onClick={ () => viewDetailRecipe({ ...item }) }>
                    <div className="recomendation-recipe-item-image" style={{ backgroundImage: `url(${ item.image })` }} />
                    <div className="recomendation-recipe-item-info">
                      <h4 className="recomendation-recipe-item-name">{ item.title }</h4>
                      <p className="recomendation-recipe-item-ingredients">Ingredients : { destructIngredients(item.ingredients) }</p>
                    </div>
                  </div>
                ))
              }
            </div>
          }
        </div>
      </AppModal>
    )
  }

  const AppModalDatePicker = ({ showModalDatePicker, setShowModalDatePicker, pickDate, handleChangeDate }) => {
    return (
      <div className={ `App-modal-datepicker ${ showModalDatePicker ? 'show' : ''}` }>
        <div className="App-modal-datepicker-content">
          <DatePicker
            className="datepicker"
            selected={ pickDate }
            onChange={ handleChangeDate }
            inline
          />
          <div className="App-modal-datepicker-content-buttons">
            <a href="/" onClick={ e => { e.preventDefault(); handleChangeDate(new Date()) } }>Today</a>
            <a href="/" onClick={ e => { e.preventDefault(); setShowModalDatePicker(false) } }>Cancel</a>
          </div>
        </div>
      </div>
    )
  }

  const AppToastMessage = ({ message }) => {
    return <div className={ `App-toast ${ message !== '' ? 'show' : '' }` }> { message } </div>
  }
  
// End of Modals

// Helpers

  const destructIngredients = ingredients => ingredients.toString().split(',').join(', ')

  const isBeforeDate = (dateA, dateB) => dateA <= dateB;

  const filterIngredients = (data, pickDate) => data.filter(item => isBeforeDate(new Date(pickDate), new Date(item['use-by'])) === true)

// End of Helpers