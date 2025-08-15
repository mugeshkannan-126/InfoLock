import React, { useState } from 'react';
import { authAPI } from '../api/api.js'; // Adjust path as needed

const Login = ({ onSwitchToRegister, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const token = await authAPI.login(email, password);
            console.log('Login successful! Token:', token);

            // Close modal or redirect user
            onClose();
            window.location.reload(); // Optional: Refresh to update auth state
        } catch (err) {
            setError(err.error || 'Invalid email or password');
        }
    };

    return (
        <form
            className="flex flex-col gap-4 p-8 py-12 w-80 sm:w-[352px] text-gray-500"
            onSubmit={handleSubmit}
        >
            <p className="text-2xl font-medium m-auto">
                <span className="text-indigo-500">User</span> Login
            </p>

            {error && (
                <p className="text-red-500 text-sm">{error}</p>
            )}

            <div className="w-full">
                <p>Email</p>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="type here"
                    className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
                    type="email"
                    required
                />
            </div>

            <div className="w-full">
                <p>Password</p>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="type here"
                    className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
                    type="password"
                    required
                />
            </div>

            <p>
                Create an account?{' '}
                <span
                    onClick={onSwitchToRegister}
                    className="text-indigo-500 cursor-pointer"
                >
          click here
        </span>
            </p>

            <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer"
            >
                Login
            </button>
        </form>
    );
};

export default Login;