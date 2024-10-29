import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios'; 

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        return emailPattern.test(email);
    };

    const validatePassword = (password) => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordPattern.test(password);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 
        setSuccessMessage(''); 

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!validatePassword(password)) {
            console.log(password);
            setError('Password include at least one uppercase letter, one lowercase letter, and one number.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/users/signup', {
                username,
                email,
                password
            });

            if (response.status === 201) {
                setSuccessMessage('Account created successfully! You can now log in.');
                window.location.href = '/login';
                setUsername('');
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            setError('Error creating account. Please try again.');
            console.error('Signup error:', error);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
                <h1 className="text-2xl font-semibold text-center mb-6">Create Account</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>} 
                {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>} 
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
                        <span className="text-gray-700">Email:</span>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        Register
                    </button>
                </form>
                <p className="text-center">
                    Already have an account?{' '}
                    <Link href="/login">
                        <span className="text-black hover:underline cursor-pointer">Login</span>
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default Register;
