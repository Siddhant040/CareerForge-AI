import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from './contexts/auth.context';

export default function App() {
  return (
    <AuthProvider>
      


      <AppRoutes />
      <Toaster
        theme="dark"
        richColors
        position="top-right"
        toastOptions={{
          style: {
            background: "#09090b",
            border: "1px solid #27272a",
            color: "#ffffff",
          },
        }}
      />
    
    </AuthProvider>
  )
}
