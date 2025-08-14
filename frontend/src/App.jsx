// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Footer from "./components/Footer";
// import Documents from "./pages/Documents";
//
// export default function App() {
//     const [isLoginOpen, setIsLoginOpen] = useState(false);
//
//     return (
//         <Router>
//             <div className={`min-h-screen flex flex-col ${isLoginOpen ? 'overflow-hidden' : ''}`}>
//                 {/* Blur wrapper for navbar and content when login is open */}
//                 <div className={`flex-grow ${isLoginOpen ? 'filter blur-sm' : ''}`}>
//                     <Navbar onLoginClick={() => setIsLoginOpen(true)} />
//                     <Routes>
//                         <Route path="/" element={<Home />} />
//                         <Route path="/dashboard" element={<Dashboard />} />
//                         <Route path="/documents" element={<Documents />} />
//                     </Routes>
//                 </div>
//                 <Footer />
//             </div>
//
//             {/* Login Modal - rendered outside the blur wrapper */}
//             <Login
//                 isOpen={isLoginOpen}
//                 onClose={() => setIsLoginOpen(false)}
//             />
//         </Router>
//     );
// }

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import Documents from "./pages/Documents";
import AuthModal from "./pages/AuthModal";
import ScrollToTop from "./components/ScrollToTop.jsx";

export default function App() {
    const [authModal, setAuthModal] = useState({
        isOpen: false,
        mode: "login" // 'login' or 'register'
    });

    const openAuthModal = (mode = "login") => {
        setAuthModal({ isOpen: true, mode });
    };

    const closeAuthModal = () => {
        setAuthModal({ ...authModal, isOpen: false });
    };

    const switchAuthMode = (mode) => {
        setAuthModal({ ...authModal, mode });
    };

    return (
        <Router>
            <ScrollToTop />
            <div className={`min-h-screen flex flex-col ${authModal.isOpen ? 'overflow-hidden' : ''}`}>
                {/* Blur wrapper for navbar and content when modal is open */}
                <div className={`flex-grow transition-all ${authModal.isOpen ? 'filter blur-sm' : ''}`}>
                    <Navbar
                        onLoginClick={() => openAuthModal("login")}
                        onRegisterClick={() => openAuthModal("register")}
                    />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </div>
                <Footer />
            </div>

            {/* Auth Modal */}
            <AuthModal
                isOpen={authModal.isOpen}
                mode={authModal.mode}
                onClose={closeAuthModal}
                onSwitchToLogin={() => switchAuthMode("login")}
                onSwitchToRegister={() => switchAuthMode("register")}
            />
        </Router>
    );
}