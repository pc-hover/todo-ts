import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const SignInPage: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    // const handleSignIn = async () => {
    //     try {
    //         const response = await axios.post('http://localhost:3000/signin', { username, password });
    //         localStorage.setItem('token', response.data.token);
    //         navigate('/dashboard');
    //     } catch (error) {
    //         console.error('Error during sign-in:', error);
    //         // Handle error (e.g., show error message)
    //     }
    // };

    return (
        <div className="h-1/2 w-1/2 flex ">

            <div className="bg-gray-50 dark:bg-gray-900 h-1/2 w-1/2 flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Sign In</h1>

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            id="username"
                            className="mt-1 p-2 border border-gray-300 rounded-lg w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 p-2 border border-gray-300 rounded-lg w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit" onClick={async () => {
                            const response = await axios.post("http://localhost:3000/login", {
                                username,
                                password
                            })
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                            localStorage.setItem("token", response.data.token);
                            localStorage.setItem("token", response.data.token)
                            localStorage.setItem("user", JSON.stringify(response.data.user));
                            console.log(response.data);
                            if (response.data.token) {
                                navigate("/dashboard")
                            }
                        }}
                    >
                        Sign In
                    </button>
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                        Don't have an account?{' '}
                        <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
                    </p>

                    <div>

                    </div>
                </div>
            </div>
        </div>
    );
};
