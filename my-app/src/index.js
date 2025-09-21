// React core
import React from 'react'
import ReactDOM from 'react-dom/client'


// Routing + Data fetching providers
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


// Root app + global styles
import App from './App.js'
import './index.css'


// Create a React Query client instance (manages cache/config)
const queryClient = new QueryClient()


// Mount the app into <div id="root"> with providers for Query + Router
ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
<QueryClientProvider client={queryClient}>
<BrowserRouter>
<App />
</BrowserRouter>
</QueryClientProvider>
</React.StrictMode>
)