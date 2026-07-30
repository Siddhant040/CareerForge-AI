import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from './contexts/auth.context';
import { InterviewProvider } from './contexts/interview.context';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <AuthProvider>

      <InterviewProvider>

      


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
      </InterviewProvider>
    
    </AuthProvider>
  )
}
