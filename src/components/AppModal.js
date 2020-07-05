import React from 'react';
import { LineOutlined, UpOutlined, DownOutlined } from '@ant-design/icons'
import { destructIngredients } from '../helpers';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const AppModal = ({ showModal = false, overlay = false, children }) => (
  <div className={ `App-modal ${ overlay ? 'App-modal-overlay' : 'App-modal-floating' } ${ showModal ? 'show' : '' }` }>
    <div className="App-modal-content">
      { children }
    </div>
  </div>
)

export const AppModalRecomendationRecipe = ({ recomendation, showDetailRecomendationRecipe, setShowDetailRecomendationRecipe, showModalRecomendationRecipe, viewDetailRecipe }) => {
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

export const AppModalDetailRecipe = ({ showModalDetailRecipe, closeModal, modalData }) => {
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

export const AppModalDatePicker = ({ showModalDatePicker, setShowModalDatePicker, pickDate, handleChangeDate }) => {
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