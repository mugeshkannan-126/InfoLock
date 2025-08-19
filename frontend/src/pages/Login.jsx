//
//
// import React, { useEffect, useState } from "react";
//
// export default function Login({ isOpen, onClose }) {
//     const [state, setState] = useState("login");
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//
//     // Close when clicking outside the modal
//     useEffect(() => {
//         const handleEsc = (e) => {
//             if (e.key === "Escape") onClose();
//         };
//         window.addEventListener("keydown", handleEsc);
//         return () => window.removeEventListener("keydown", handleEsc);
//     }, [onClose]);
//
//     if (!isOpen) return null;
//
//     return (
//         <div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
//             onClick={onClose}
//         >
//             <div
//                 className="w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white p-8 py-12"
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 <p className="text-2xl font-medium m-auto mb-6">
//                     <span className="text-indigo-500">User</span>{" "}
//                     {state === "login" ? "Login" : "Sign Up"}
//                 </p>
//
//                 {state === "register" && (
//                     <div className="w-full mb-4">
//                         <p className="text-sm">Name</p>
//                         <input
//                             onChange={(e) => setName(e.target.value)}
//                             value={name}
//                             placeholder="type here"
//                             className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500 text-sm"
//                             type="text"
//                             required
//                         />
//                     </div>
//                 )}
//
//                 <div className="w-full mb-4">
//                     <p className="text-sm">Email</p>
//                     <input
//                         onChange={(e) => setEmail(e.target.value)}
//                         value={email}
//                         placeholder="type here"
//                         className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500 text-sm"
//                         type="email"
//                         required
//                     />
//                 </div>
//
//                 <div className="w-full mb-6">
//                     <p className="text-sm">Password</p>
//                     <input
//                         onChange={(e) => setPassword(e.target.value)}
//                         value={password}
//                         placeholder="type here"
//                         className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500 text-sm"
//                         type="password"
//                         required
//                     />
//                 </div>
//
//                 {state === "register" ? (
//                     <p className="text-sm mb-4">
//                         Already have account?{" "}
//                         <span
//                             onClick={() => setState("login")}
//                             className="text-indigo-500 cursor-pointer"
//                         >
//               click here
//             </span>
//                     </p>
//                 ) : (
//                     <p className="text-sm mb-4">
//                         Create an account?{" "}
//                         <span
//                             onClick={() => setState("register")}
//                             className="text-indigo-500 cursor-pointer"
//                         >
//               click here
//             </span>
//                     </p>
//                 )}
//
//                 <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer text-sm">
//                     {state === "register" ? "Create Account" : "Login"}
//                 </button>
//             </div>
//         </div>
//     );
// }

import React, { useState } from 'react';

const Login = ({ onSwitchToRegister, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic
        console.log('Login submitted:', { email, password });
    };

    return (
        <form
            className="flex flex-col gap-4 p-8 py-12 w-80 sm:w-[352px] text-gray-500"
            onSubmit={handleSubmit}
        >
            <p className="text-2xl font-medium m-auto">
                <span className="text-indigo-500">User</span> Login
            </p>

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
