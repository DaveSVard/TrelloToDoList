import React from 'react';
import "./input.scss"
import "./output.scss"
import "./styles/base.scss"
import { BrowserRouter } from 'react-router-dom';
import { MyRouter } from './MyRouter/myRouter';


function App() {;
  
  return (
    <BrowserRouter>
      <MyRouter/>
    </BrowserRouter>
  );
}

export default App;
