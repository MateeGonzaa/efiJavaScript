import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ToastProvider from "./components/ToastProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostsList from "./pages/PostsList";
import PostDetail from "./pages/PostDetail";
import PostForm from "./pages/PostForm";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <ToastProvider />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<PostsList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route
            path="/nuevo"
            element={
              <ProtectedRoute>
                <PostForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}


