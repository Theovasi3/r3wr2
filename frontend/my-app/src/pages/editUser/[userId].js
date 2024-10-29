import { useEffect, useState } from 'react';
import axios from 'axios';

const EditUser = () => {
    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
        role: '',
        firstName: '',
        lastName: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const baseURL = 'http://localhost:8080/api';
    const [id, setId] = useState(null);

    useEffect(() => {
        const userId = window.location.pathname.split('/').pop();
        setId(userId);
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            if (!id) return;
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`${baseURL}/users/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                setUserDetails(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error.response?.data || error.message);
                setError('Failed to fetch user.');
            } finally {
                setFetching(false);
            }
        };
        
        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({
            ...userDetails,
            [name]: value,
        });
    };

    const handleEditUser = async () => {
        const token = localStorage.getItem('token');
        setLoading(true);
        setError('');
    
        try {
            await axios.put(`${baseURL}/users/updateUser/${id}`, userDetails, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            alert('User updated successfully');
            window.location.href = "/viewUsers";
        } catch (error) {
            console.error("Error updating user:", error.response?.data || error.message);
            setError('Failed to update user.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleDeleteUser = async () => {
        const token = localStorage.getItem('token');
        setLoading(true);
        setError('');
        
        try {
            await axios.delete(`${baseURL}/users/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            alert('User deleted successfully');
            window.location.href = '/viewUsers';
        } catch (error) {
            console.error("Error deleting user:", error.response?.data || error.message);
            setError('Failed to delete user.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        window.history.back();
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
                <h1 className="text-2xl font-semibold mb-6">Edit User</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {fetching ? (
                    <p>Loading user data...</p>
                ) : (
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={userDetails.username}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={userDetails.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={userDetails.firstName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={userDetails.lastName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={userDetails.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Role</label>
                            <select
                                name="role"
                                value={userDetails.role}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md"
                                required
                            >
                                <option value="">Select Role</option>
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                        <div className="flex justify-between mt-6">
                            <button
                                type="button"
                                onClick={handleEditUser}
                                className="px-4 py-2 bg-black text-white rounded-md"
                                disabled={loading}
                                aria-label="Edit user"
                            >
                                {loading ? 'Updating...' : 'Edit'}
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteUser}
                                className="px-4 py-2 bg-red-500 text-white rounded-md"
                                disabled={loading}
                                aria-label="Delete user"
                            >
                                {loading ? 'Deleting...' : 'Delete'}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-4 py-2 bg-gray-400 text-white rounded-md"
                                aria-label="Cancel editing"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </main>
    );
};

export default EditUser;
