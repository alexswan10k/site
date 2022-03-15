import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router';
import { JsonComp } from './Json';
import { BrowserRouter } from 'react-router-dom';

const Home = () => <div>
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>
    <p>
      Home
    </p>
  </div>
function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="json/:payload" element={<JsonComp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
