import { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import BackToTopButton from "./components/BackToTopButton";
import PiCalculator from "./components/PiCalculator";
import PiMemorization from "./components/PiMemorization";
import VisualDemonstrations from "./components/VisualDemonstrations";
import NotFound from "./components/NotFound";
import GoogleSignIn from "./components/GoogleSignIn";
import { auth } from "../Firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { MarksProvider } from "./context/MarksContext";
import PropTypes from "prop-types";

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (authLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    if (!user) return <GoogleSignIn />;

    return children;
  };

  // Add prop validation
  ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <MarksProvider>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Header user={user} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/about" element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            } />
            <Route path="/services" element={
              <ProtectedRoute>
                <Services />
              </ProtectedRoute>
            } />
            <Route path="/projects" element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            } />
            <Route path="/contact" element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            } />
            <Route path="/pi-calculator" element={
              <ProtectedRoute>
                <PiCalculator />
              </ProtectedRoute>
            } />
            <Route path="/pi-memorization" element={
              <ProtectedRoute>
                <PiMemorization />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/visual-demonstrations" element={
              <ProtectedRoute>
                <VisualDemonstrations />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BackToTopButton />
        </main>
        <Footer />
      </div>
    </MarksProvider>
  );
}

export default App;
