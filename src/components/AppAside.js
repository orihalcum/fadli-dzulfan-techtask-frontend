import React from 'react';
import { GithubOutlined, ArrowLeftOutlined, LinkedinOutlined, GlobalOutlined } from '@ant-design/icons'

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

export default AppAside;