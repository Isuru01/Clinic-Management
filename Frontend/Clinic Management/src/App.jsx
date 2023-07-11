import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Home,
  Dashboard,
  Appoinment,
  Pay,
  Search,
  SignIn,
} from "./pages/index";
import "./App.css";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider
          clientId={import.meta.env.VITE_GOOGLE_AUTH_API_KEY}
        >
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/appoinment/:session" element={<Appoinment />} />
            <Route path="/dashboard/:type/:action?" element={<Dashboard />} />
          </Routes>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
