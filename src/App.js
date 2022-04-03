import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ToolbarComp from "./components/toolbarComp/ToolbarComp";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import CreateTopicPage from './pages/CreateTopicPage';
import AllTopicsPage from './pages/AllTopicsPage';
import OneTopicPage from './pages/OneTopicPage';
import FavoritesPage from './pages/FavoritesPage';
import { MyContext } from './contexts/MyContext';
import { useEffect, useState } from 'react';

function App() {

  const [loggedInPerson, setLoggedInPerson] = useState(null);
  const [favoriteCounter, setFavoriteCounter] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem("favoriteTopics")) localStorage.setItem("favoriteTopics", JSON.stringify([]));
    setFavoriteCounter(JSON.parse(localStorage.favoriteTopics).length)
  })

  return (
    <div className="App">
          <BrowserRouter>

          <MyContext.Provider value={{loggedInPerson, setLoggedInPerson, setFavoriteCounter, favoriteCounter, notificationCount, setNotificationCount}}>
                <ToolbarComp/>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/profile/:id/:name" element={<ProfilePage/>}/>
                    <Route path='/create-topic' element={<CreateTopicPage/>}/>
                    <Route path='/' element={<AllTopicsPage/>}/>
                    <Route path='/topic/:id/:topic' element={<OneTopicPage/>}/>
                    <Route path='/favorites' element={<FavoritesPage/>}/>

                </Routes>
          </MyContext.Provider>
              
          </BrowserRouter>
    </div>
  );
}

export default App;
