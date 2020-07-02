// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import './Lunch.scss'
import { AlignLeftOutlined, CalendarOutlined, LineOutlined, UpOutlined, DownOutlined } from '@ant-design/icons'
import moment from 'moment'
import { AppApi } from './api';

const _recipes = [ "https://www.pumpkinnspice.com/wp-content/uploads/2016/08/grilled-ham-cheese-sandwich-26-1024x683.jpg", "https://www.onceuponachef.com/images/2019/07/Big-Italian-Salad-1200x1553.jpg", "https://assets-a1.kompasiana.com/items/album/2017/07/11/hotdogg-5964764d83c1e62953732352.jpg" ]

// 
// Main ------------------------------------------------------------------------------------------------------------------------------------------------------------
//

const Lunch = () => {
  
  // Define Vars

    const [recipes, setRecipes] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [recomendation, setRecomendation] = useState([])
    const [modalData, setModalData] = useState('')
    const [showModalDetailRecipe, setShowModalDetailRecipe] = useState(false)
    const [showModalRecomendationRecipe, setShowModalRecomendationRecipe] = useState(false)

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
        })
    }

    const getIngredients = () => {
      AppApi.getIngredients()
        .then(({ status, data }) => {
          if(status === 200)
            setIngredients(data.map(item => { item.checked = false; return item }))
        }).catch(err => {
          console.log(err)
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

    const closeModal = () => {
      setModalData('')
      setShowModalDetailRecipe(false)
    }
    
    const clearPick = () => {
      setIngredients(ingredients.map(item => { item.checked = false; return item }))
      setShowModalRecomendationRecipe('')
    }
  // End of Handler


  // Props

    const modalProps = {
      modalData,
      showModalDetailRecipe,
      closeModal
    }

  // End of Props


  useEffect(() => {
    if(recipes.length === 0) getRecipes()
    if(ingredients.length === 0) getIngredients()
  })

  return (
    <div className="App">
      <div className="App-container">
        <div className="App-header">
          <div className="App-menu">
            <AlignLeftOutlined />
            <div className="App-menu-date">{ moment().format('dddd, LL') }</div>
            <CalendarOutlined />
          </div>
          <h1>Hello, what would you like to eat today?</h1>
        </div>
        <div className="App-content" style={{ paddingBottom: showModalRecomendationRecipe ? 110 : 30 }}>
          <AppRecipe recipes={ recipes } viewDetailRecipe={ handleClickRecipe } />          
          <AppIngredients ingredients={ ingredients } handlePickIngredient={ handlePickIngredient } showModalRecomendationRecipe={ showModalRecomendationRecipe } clearPick={ clearPick } />
        </div>
        <AppModalDetailRecipe { ...modalProps } />
        <AppModalRecomendationRecipe recomendation={ recomendation } showModalRecomendationRecipe={ showModalRecomendationRecipe } viewDetailRecipe={ handleClickRecipe } />
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

// Recipe

  const RecipeList = ({ title, image, ingredients, viewDetailRecipe }) => {
    return <div className="App-recipe" style={{ backgroundImage: `url(${image})` }} onClick={ () => viewDetailRecipe({ title, image, ingredients }) } />
  }

  const AppRecipe = ({ recipes, viewDetailRecipe }) => {
    return (
      <div className="App-content-recipes">
        <h3 className="App-content-recipes-title">Recomended Recipes</h3>
        <div className="App-content-recipes-list">
          { recipes.map((item, key) => <RecipeList { ...item } key={ key } viewDetailRecipe={ viewDetailRecipe } />) }
        </div>
      </div>
    )
  }

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
    let { ingredients, showModalRecomendationRecipe, clearPick } = props
    return (
      <div className="App-content-ingredients mt-30">
        <h3 className="App-content-ingredients-title">Available Ingredients { showModalRecomendationRecipe && <small onClick={ clearPick }>Clear</small> }</h3>
        <div className="App-content-ingredients-list">
          { ingredients.map((item, key) => <IngredientList { ...item } { ...props } key={ key } index={ key } />) }
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

  const AppModalRecomendationRecipe = ({ recomendation, showModalRecomendationRecipe, viewDetailRecipe }) => {

    const [showDetail, setShowDetail] = useState(false)

    return (
      <AppModal showModal={ showModalRecomendationRecipe }>
        <div className="recomendation-recipe">
          <div className="recomendation-recipe-title" onClick={ e => setShowDetail(!showDetail) }>
            Recomendation Recipes ({ recomendation.length }) <span>{ showDetail ? <UpOutlined /> : <DownOutlined /> }</span>
          </div>
          {
            showDetail &&
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

// End of Modals

// Helpers

const destructIngredients = ingredients => ingredients.toString().split(',').join(', ')

// End of Helpers