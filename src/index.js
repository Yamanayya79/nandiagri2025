import React from 'react'
import Reactdom from 'react-dom/client'
import App from './App'
import { UserProvider } from './Context/AuthContext'
import { AdminProvider } from './Admin/Context/AdminAuthContext'
import {ThemeProvider} from './components/ThemeContext'
import './i18n' // Importing i18n configuration for internationalization

const continer = document.getElementById('root')
const root = Reactdom.createRoot(continer)
root.render(
    
    <UserProvider>
        <AdminProvider>
            <ThemeProvider>
            <App />
              </ThemeProvider>
        </AdminProvider>
    </UserProvider>
  
);