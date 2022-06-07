import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import Create from './components/Create'
import CardDetail from './components/CardDetail'

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
        <Route exact path = '/' element = {<LandingPage/>}/>
        <Route path = '/home' element = {<Home/>}/>
        <Route path = '/home/:id' element = {<CardDetail/>}/>
        <Route path = '/create' element = {<Create/>}/>
      </Routes>
      </div>
    </Router>
  );
}

export default App;
