import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from './LogIn';
import { createContext, useState } from 'react';
import MainPage from './MainPage';
import ControllerBoard from './ControllerBoard';


export const ActionContext = createContext();

function App() {
  const [action,setAction] = useState('push it');
  return (
    <ActionContext.Provider value={[action,setAction]}>
      <Router>
        <Routes>
          <Route exact path="/" element={<LogIn/>} />
          <Route exact path="/home/:id" element={<MainPage/>} />
          <Route exact path="/controller/:id/:title" element={<ControllerBoard/>} />
        </Routes>
      </Router>
    </ActionContext.Provider>
  );
}

export default App;
