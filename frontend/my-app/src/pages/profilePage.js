import { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [updatedData, setUpdatedData] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);

    const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
            return;
        }
        
        try {
            const response = await axios.get('http://localhost:8080/api/users/profile', {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            setUserData(response.data);
            setUpdatedData(response.data);
            setError(''); // Clear any error messages on successful fetch
        } catch (error) {
            handleError();
        }
    };

    useEffect(() => {
        fetchUserData();

        const role = localStorage.getItem('role');
        setIsAdmin(role === 'Admin');
    }, []);

    const handleError = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
        setError('Failed to fetch or update user data.');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async () => {
        const confirmSave = window.confirm("Are you sure you want to save these changes?");
        if (!confirmSave) return;
    
        const token = localStorage.getItem('token');
        if (!token) return handleError();
    
        try {
            await axios.put('http://localhost:8080/api/users/profile', updatedData, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
    
            if (updatedData.password) {
                localStorage.clear();
                window.location.href = '/login';
            } 
        } catch (error) {
            window.location.reload()
        }
    };
    

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = '/login';
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-3/4 ml-20">
                <h1 className="text-2xl font-semibold mb-6">Profile Page</h1>
                {error && <p className="text-red-500">{error}</p>}
                {userData ? (
                    <div className="flex justify-between">
                        <div className="w-3/4">
                            {!isEditing ? (
                                <div>
                                    <p className="mb-2"><strong>Username:</strong> {userData.username}</p>
                                    <p className="mb-2"><strong>Email:</strong> {userData.email}</p>
                                    <p className="mb-2"><strong>First Name:</strong> {userData.firstName}</p>
                                    <p className="mb-2"><strong>Last Name:</strong> {userData.lastName}</p>
                                    <p className="mb-2"><strong>Role:</strong> {userData.role}</p>
                                    <button
                                        className="mt-4 px-4 py-2 bg-black text-white rounded"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        Edit Profile
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={updatedData.username || ''}
                                            onChange={handleChange}
                                            className="border rounded w-full py-2 px-3"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={updatedData.email || ''}
                                            onChange={handleChange}
                                            className="border rounded w-full py-2 px-3"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={updatedData.firstName || ''}
                                            onChange={handleChange}
                                            className="border rounded w-full py-2 px-3"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={updatedData.lastName || ''}
                                            onChange={handleChange}
                                            className="border rounded w-full py-2 px-3"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={updatedData.password || ''}
                                            onChange={handleChange}
                                            className="border rounded w-full py-2 px-3"
                                        />
                                    </div>
                                    <button
                                        className="mt-4 px-4 py-2 bg-black text-white rounded mr-2"
                                        onClick={handleSubmit}
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="w-1/4 flex flex-col justify-center items-center">
                            {isAdmin ? (
                                <>
                                    <button
                                        className="mb-4 px-4 py-2 bg-black text-white rounded"
                                        onClick={() => window.location.href = '/viewUsers'}
                                    >
                                        View Users
                                    </button>
                                    <button
                                        className="mb-4 px-4 py-2 bg-black text-white rounded"
                                        onClick={() => window.location.href = '/viewProducts'}
                                    >
                                        View Products
                                    </button>
                                </>
                            ) : (
                                <p className=""></p>
                            )}
                            <button className="mb-4 px-4 py-2 bg-red-500 text-white rounded" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <p>Loading user data...</p>
                )}
            </div>
        </main>
    );
};

export default ProfilePage;
