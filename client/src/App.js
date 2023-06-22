import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { Provider } from "react-redux";


function App() {
  return (
    <div className="app">
      <Provider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <LoginPage /> } />
            <Route path="/home" element={ <HomePage /> } />
            <Route path="/profile/:userId" element={ <ProfilePage /> } />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
