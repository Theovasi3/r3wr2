import { useEffect, useState } from 'react';
import axios from 'axios';

const ViewUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 20;
    const baseURL = 'http://localhost:8080/api';

    const fetchUsers = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${baseURL}/users/all`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setUsers(response.data);
        } catch (error) {
            setError('Failed to fetch users.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${baseURL}/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            setError('Failed to delete user.');
        }};

    const goToEditUser = (userId) => {
        window.location.href = `/editUser/${userId}`;
    };

    const totalPages = Math.ceil(users.length / usersPerPage);
    const currentUsers = users.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    );

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <main className="flex items-start justify-center min-h-screen bg-gray-100 pt-10 pb-10">
            <div className="bg-white shadow-md rounded-lg p-8 w-3/4">
                <h1 className="text-2xl font-semibold mb-6 flex justify-between items-center">
                    User Management
                    <div className="flex gap-4">
                        <button
                            onClick={() => window.location.href = '/profilePage'}
                            className="px-4 py-2 bg-gray-500 text-white rounded"
                        >
                            Back to Profile
                        </button>
                        <button
                            onClick={() => window.location.href = '/addUser'}
                            className="px-4 py-2 bg-black text-white rounded"
                        >
                            Add User
                        </button>
                    </div>
                </h1>
                {error && <p className="text-red-500">{error}</p>}
                {loading ? (
                    <p>Loading users...</p>
                ) : (
                    <>
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 p-4">Username</th>
                                    <th className="border border-gray-300 p-4">Email</th>
                                    <th className="border border-gray-300 p-4">Role</th>
                                    <th className="border border-gray-300 p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.length > 0 ? (
                                    currentUsers.map(user => (
                                        <tr key={user.id}>
                                            <td className="border border-gray-300 p-4">{user.username}</td>
                                            <td className="border border-gray-300 p-4">{user.email}</td>
                                            <td className="border border-gray-300 p-4">{user.role}</td>
                                            <td className="border border-gray-300 p-4">
                                                <button
                                                    onClick={() => goToEditUser(user.id)}
                                                    className="px-4 py-2 bg-black text-white rounded mr-2"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center p-4">No users found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={goToPreviousPage}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                Previous
                            </button>
                            <button
                                onClick={goToNextPage}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
};

export default ViewUsers;
