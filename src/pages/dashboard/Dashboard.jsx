import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import getBaseUrl from '../../utils/baseURL';
import { MdIncompleteCircle } from 'react-icons/md'
import RevenueChart from './RevenueChart';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/admin/login');
                    return;
                }

                // Fetch books count
                const booksResponse = await axios.get(`${getBaseUrl()}/api/books`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                // Fetch orders count
                const ordersResponse = await axios.get(`${getBaseUrl()}/api/orders`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                // Fetch users count
                const usersResponse = await axios.get(`${getBaseUrl()}/api/auth/users`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                // Calculate total revenue
                const totalRevenue = ordersResponse.data.reduce((sum, order) => sum + order.totalPrice, 0);

                setData({
                    totalUsers: usersResponse.data.length,
                    totalBooks: booksResponse.data.length,
                    totalOrders: ordersResponse.data.length,
                    totalRevenue: totalRevenue.toFixed(2)
                });
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                if (error.response?.status === 401 || error.response?.status === 403) {
                    localStorage.removeItem('token');
                    navigate('/admin/login');
                }
                setLoading(false);
            }
        }

        fetchData();
    }, [navigate]);

    if(loading) return <Loading/>

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                    <p className="text-3xl font-bold text-blue-600">{data.totalUsers || 0}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Total Books</h3>
                    <p className="text-3xl font-bold text-green-600">{data.totalBooks || 0}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
                    <p className="text-3xl font-bold text-yellow-600">{data.totalOrders || 0}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
                    <p className="text-3xl font-bold text-purple-600">${data.totalRevenue || 0}</p>
                </div>
            </div>
            <div className="mt-8">
                <RevenueChart />
            </div>
        </div>
    );
};

export default Dashboard;