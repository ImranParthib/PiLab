import { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Dashboard from "./components/Dashboard.jsx";
import BackToTopButton from "./components/BackToTopButton.jsx";
import PiCalculator from "./components/PiCalculator.jsx";
import PiMemorization from "./components/PiMemorization.jsx";
import VisualDemonstrations from "./components/VisualDemonstrations.jsx";
import NotFound from "./components/NotFound.jsx";
import GoogleSignIn from "./components/GoogleSignIn.jsx";
import History from "./components/History.jsx";
import Contribute from "./components/Contribute.jsx";
import Quiz from "./components/Quiz.jsx"; // Import Quiz component
import { auth } from "../Firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { MarksProvider } from "./context/MarksContext.jsx";
import PropTypes from "prop-types";
import Footer from "./components/Footer.jsx";

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
            <Route path="/history" element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            } />
            <Route path="/contribute" element={
              <ProtectedRoute>
                <Contribute />
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
            <Route path="/quiz" element={
              <ProtectedRoute>
                <Quiz />
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
