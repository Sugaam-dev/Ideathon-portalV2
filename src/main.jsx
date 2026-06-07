
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'; // Import this
import { queryClient } from './features/api/queryClient';    // Create this file next
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(

    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  
)