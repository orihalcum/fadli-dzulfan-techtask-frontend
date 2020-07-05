import React from 'react';
import moment from 'moment'
import { AlignLeftOutlined, CalendarOutlined } from '@ant-design/icons'

const AppHeader = ({ showAside, setShowAside, setShowModalDatePicker, pickDate }) => {
  return (
    <div data-testid="App-header" className="App-header">
      <div data-testid="App-menu" className="App-menu">
        <AlignLeftOutlined data-testid="App-menu-toggle-aside" onClick={ () => setShowAside(!showAside) } />
        <div data-testid="App-menu-date" className="App-menu-date">{ moment(pickDate).format('dddd, LL') }</div>
        <CalendarOutlined data-testid="App-menu-calendar" onClick={ () => setShowModalDatePicker(true) } />
      </div>
      <h1 data-testid="App-header-greetings" onClick={ () => setShowAside(false) }>Hello, what would you like to eat today?</h1>
    </div>
  );
};

export default AppHeader;