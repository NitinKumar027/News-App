import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const pageSize = 8;
  const api1 = process.env.REACT_APP_API1
  const api2 = process.env.REACT_APP_API2
  const api3 = process.env.REACT_APP_API3
  const api4 = process.env.REACT_APP_API4
  const ApiArray = [api1, api2, api3, api4];
  const api = ApiArray[Math.floor(Math.random() * (ApiArray.length - 1))]

  const [progress, setProgress] = useState(0);

  const [mode, setMode] = useState('white');
  const changeMode = () => {
    if (mode === 'white') {
      setMode('black');
      document.body.style.backgroundColor = 'black';
    }
    else {
      setMode('white');
      document.body.style.backgroundColor = 'white';
    }
  }

  return (
    <div>
      <Router>
        <Navbar mode={mode} changeMode={changeMode} />
        <LoadingBar height={3} color='#f11946' progress={progress} />
        <Routes>
          <Route exact path="/" element={< News setprog={setProgress} key="general" pgsize={pageSize} country="in" category='general' api={api} mode={mode} changeMode={changeMode} />} />
          <Route exact path="/business" element={< News setprog={setProgress} key="business" pgsize={pageSize} country="in" category='business' api={api} mode={mode} changeMode={changeMode} />} />
          <Route exact path="/entertainment" element={< News setprog={setProgress} key="entertainment" pgsize={pageSize} country="in" category='entertainment' api={api} mode={mode} changeMode={changeMode} />} />
          <Route exact path="/health" element={< News setprog={setProgress} key="health" pgsize={pageSize} country="in" category='health' api={api} mode={mode} changeMode={changeMode} />} />
          <Route exact path="/science" element={< News setprog={setProgress} key="science" pgsize={pageSize} country="in" category='science' api={api} mode={mode} changeMode={changeMode} />} />
          <Route exact path="/sports" element={< News setprog={setProgress} key="sports" pgsize={pageSize} country="in" category='sports' api={api} mode={mode} changeMode={changeMode} />} />
          <Route exact path="/technology" element={< News setprog={setProgress} key="technology" pgsize={pageSize} country="in" category='technology' api={api} mode={mode} changeMode={changeMode} />} />
        </Routes>
      </Router>
    </div>
  )
}
export default App
