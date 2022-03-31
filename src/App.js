import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ToolbarComp from "./components/toolbarComp/ToolbarComp";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <div className="App">
          <BrowserRouter>
              <ToolbarComp/>
              <Routes>
                  <Route path="/login" element={<LoginPage/>}/>
                  <Route path="/register" element={<RegisterPage/>}/>
                  <Route path="/profile" element={<ProfilePage/>}/>
              </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
