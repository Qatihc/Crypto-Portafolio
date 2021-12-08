import React from 'react';
import ReactDom from 'react-dom';

import {App} from './components/App';
import {MainContextProvider} from './context/MainContext';

ReactDom.render(
  <MainContextProvider>
    <App />
  </MainContextProvider>,
  document.getElementById('root')
);

if(module.hot){
  module.hot.accept();
}