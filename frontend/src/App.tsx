import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter, } from 'react-router-dom'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper } from '@mui/material';

import './styles/style.scss'
import NavBar from './components/NavBar';
import Home from './pages/home';
import ProductInfo from './pages/ProductInfo';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import NewProduct from './pages/NewProduct';
import UpdateProduct from './pages/UpdateProduct';
import CartPage from './pages/CartPage';
import Footer from './components/Footer';
import ConfirmPage from './pages/ConfirmPage';
import Protector from './components/Protector';
import RequestPage from './pages/RequestPage';

function App() {
  const [isDark, setIsDark] = useState(false)

  const darkTheme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: "#311b92",
        contrastText: "#b71c1c"
      },
      secondary: {
        main: "#424242",
      },
      success:{
        main: "#5c6bc0",
        contrastText: '#311b92',
      },
    }
  })
  const lightTheme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: "#311b92",
        contrastText: "#d32f2f"
      },
      secondary: {
        main: "#eceff1",
      },
      success:{
        main: "#bbdefb",
        contrastText: '#3f51b5',
      },

    }
  })

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Paper sx={{ maxHeight: "100%", minHeight: 900, backgroundColor: "secondary.main" }}>
        <BrowserRouter>
          <NavBar check={isDark} change={() => setIsDark(!isDark)}/>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/info/:id' element={<ProductInfo />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/profile' element={<Protector><Profile/></Protector>}/>
            <Route path='/newprdc' element={<Protector><NewProduct/></Protector>}/>
            <Route path='/updatep/:id' element={<Protector><UpdateProduct/></Protector>}/>
            <Route path='/cart' element={<CartPage />}/>
            <Route path='/success' element={<ConfirmPage/>}/>
            <Route path='/request' element={<RequestPage/>}/>
          </Routes>
        </BrowserRouter>
        
      </Paper>
      <Footer/>
    </ThemeProvider>

  );
}

export default App;
