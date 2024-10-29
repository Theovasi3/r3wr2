import { useState } from 'react';
import axios from 'axios';

const AddUser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const baseURL = 'http://localhost:8080/api';

    const handleAddUser = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');

        if (!username || !email || !password || !role || !firstName || !lastName) {
            setError('All fields are required.');
            return;
        }

        try {
            console.log("Sending request to add user:", { username, email, password, role, firstName, lastName });

            const response = await axios.post(
                `${baseURL}/users/signup`, 
                { username, email, password, role, firstName, lastName },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );

            console.log("User added successfully:", response.data);


            window.location.href = '/viewUsers';
        } catch (error) {
            if (error.response) {
                console.error("Server responded with an error:", error.response.data);
                setError(`Failed to add user: ${error.response.data.message || 'Unknown error'}`);
            } else if (error.request) {
                console.error("Request made but no response received:", error.request);
                setError('Failed to add user: No response from server.');
            } else {
                console.error("Error setting up request:", error.message);
                setError('Failed to add user.');
            }
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-1/2">
                <h1 className="text-2xl font-semibold mb-6">Add User</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleAddUser}>
                    <label className="block mb-4">
                        First Name:
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </label>
                    <label className="block mb-4">
                        Last Name:
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </label>
                    <label className="block mb-4">
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </label>
                    <label className="block mb-4">
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </label>
                    <label className="block mb-4">
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </label>
                    <label className="block mb-4">
                        Role:
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                            required
                        >
                            <option value="">Select role</option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </select>
                    </label>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-black text-white rounded hover:bg-gray-700"
                    >
                        Add User
                    </button>
                </form>
            </div>
        </main>
    );
};

export default AddUser;
