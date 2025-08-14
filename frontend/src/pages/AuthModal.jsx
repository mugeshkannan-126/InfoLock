import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
    const [mode, setMode] = useState(initialMode);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-xl border border-gray-200"
                onClick={(e) => e.stopPropagation()}
            >
                {mode === 'login' ? (
                    <Login
                        onSwitchToRegister={() => setMode('register')}
                        onClose={onClose}
                    />
                ) : (
                    <Register
                        onSwitchToLogin={() => setMode('login')}
                        onClose={onClose}
                    />
                )}
            </div>
        </div>
    );
};

export default AuthModal;