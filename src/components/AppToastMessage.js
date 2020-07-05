import React from 'react';

const AppToastMessage = ({ message }) => {
  return <div className={ `App-toast ${ message !== '' ? 'show' : '' }` }> { message } </div>
}

export default AppToastMessage;