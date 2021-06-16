import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login'
import {useSelector} from 'react-redux'
import { Tstore } from './Store';


function App() {

  const {isUUIDAuthenticated} = useSelector((state:Tstore)=> state.Auth)

  if(!isUUIDAuthenticated){
    return <Login />
  }else
  return (
    <div>
       <Home />
    </div>
  );
}

export default App;
