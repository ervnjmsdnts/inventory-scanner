import React from 'react'
import ReactDOM from 'react-dom/client'
import { Apps as Apps } from './App'
import AuthProvider from './contexts/AuthContext'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { SWRConfig } from 'swr'
import swrConfig from './lib/swrConfig'
import { Toaster } from 'react-hot-toast'
import { theme } from './theme'
import OrderProvider from './contexts/OrderContext'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <SWRConfig value={swrConfig}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <OrderProvider>
            <CssBaseline />
            <Toaster />
            <Apps />
          </OrderProvider>
        </AuthProvider>
      </ThemeProvider>
    </SWRConfig>
  </React.StrictMode>
)
