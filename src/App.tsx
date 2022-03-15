import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router';
import { JsonComp } from './Json';
import { BrowserRouter, HashRouter, Link } from 'react-router-dom';

const Home = () => <div>
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>
    <p>
      Home
    </p>
  </div>

const Nav = () => <div>
  <ul>
    <li><Link to="./json">Json</Link></li>
  </ul>
</div>
function App() {
  return (
    <div className="App">

      <HashRouter>
        <Nav />
        <Routes>
          <Route index element={<Home />} />
          <Route path="json" element={<JsonComp />} />
          <Route path="json/:payload" element={<JsonComp />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
