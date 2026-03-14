"use client";

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Upload, Plus } from 'lucide-react';

export default function Subscribers() {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState('');

    const fetchSubscribers = async () => {
        try {
            const userStr = localStorage.getItem('user');
            if (!userStr) return;
            const user = JSON.parse(userStr);
            const res = await api.get(`/subscribers.php?user_id=${user.id}`);
            setSubscribers(res.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const handleAddSubscriber = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            await api.post(`/subscribers.php?user_id=${user.id}`, { email, name });
            setMessage('Subscriber added successfully.');
            setEmail('');
            setName('');
            fetchSubscribers();
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Error adding subscriber');
        }
    };

    const handleFileUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const formData = new FormData();
            formData.append('file', file);
            formData.append('user_id', user.id);

            await api.post('/upload_subscribers.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage('CSV uploaded successfully.');
            setFile(null);
            fetchSubscribers();
        } catch (error: any) {
            setMessage(error.response?.data?.message || 'Error uploading file');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900">Subscribers</h1>
            </div>

            {message && (
                <div className="p-4 rounded-md bg-blue-50 text-blue-700">
                    {message}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 shadow rounded-lg">
                    <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center"><Plus className="mr-2" /> Add Single Subscriber</h2>
                    <form onSubmit={handleAddSubscriber} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[--color-primary] focus:ring-[--color-primary] sm:text-sm p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name (Optional)</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[--color-primary] focus:ring-[--color-primary] sm:text-sm p-2 border"
                            />
                        </div>
                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[--color-primary] hover:bg-indigo-700">
                            Add Subscriber
                        </button>
                    </form>
                </div>

                <div className="bg-white p-6 shadow rounded-lg">
                    <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center"><Upload className="mr-2" /> Upload CSV</h2>
                    <p className="text-sm text-gray-500 mb-4">Upload a CSV file with "email" and "name" columns.</p>
                    <form onSubmit={handleFileUpload} className="space-y-4">
                        <div>
                            <input
                                type="file"
                                accept=".csv"
                                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-[--color-primary] hover:file:bg-indigo-100"
                            />
                        </div>
                        <button type="submit" disabled={!file} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[--color-cta] hover:bg-green-600 disabled:opacity-50">
                            Upload CSV
                        </button>
                    </form>
                </div>
            </div>

            <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Total Subscribers: {subscribers.length}</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {subscribers.map((sub: any) => (
                                <tr key={sub.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sub.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${sub.status === 'subscribed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {sub.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(sub.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            {subscribers.length === 0 && !loading && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">No subscribers found. Upload a list to get started.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
