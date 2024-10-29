import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter(); 

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/profilePage'); 
        }
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            
            const response = await axios.post('http://localhost:8080/api/auth/authenticate', {
                username,
                password,
            });
            const { token, role } = response.data; 

            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);
                
                router.push('/profilePage'); 
            }
        } catch (error) {
            setError('Invalid username or password.');
            console.error('Login error:', error);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
                <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label className="block mb-4">
                        <span className="text-gray-700">Username:</span>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-black"
                            required
                        />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-700">Password:</span>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-black"
                            required
                        />
                    </label>
                    <button
                        type="submit"
                        className="w-full bg-black text-white font-semibold py-2 px-4 rounded hover:bg-black transition duration-200 mb-4"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center">{"Don't have an account?"}{' '}
                    <Link href="/register">
                        <span className="text-black hover:underline cursor-pointer">Create one</span>
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default Login;
