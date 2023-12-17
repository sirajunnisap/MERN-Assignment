import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, RoutesProps } from "react-router-dom";
import UserRoute from './Routes/user';
import Modal from 'react-modal';

const App:React.FC<RoutesProps> = ()=> {
  return (
    <Router>
      <Routes>
        <Route path='/*' element={<UserRoute/>}/>
      </Routes>
    </Router>
  );
}

export default App;
