import { BrowserRouter } from 'react-router-dom';
import './styles/App.css';
import { Navbar } from './components/UI/Navbar/Navbar';
import { AppRouter } from './components/AppRouter';
import { AuthContext } from './context';
import { useState, useEffect } from 'react';
export const App = () => {

  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
    };
    setIsLoading(false);
  }, [])

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, isLoading }}>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
};


