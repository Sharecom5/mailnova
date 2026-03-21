"use client";

import { useState, useEffect } from 'react';

export default function Settings() {
    const [user, setUser] = useState({ name: '', email: '' });

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-2xl font-semibold text-gray-900">Account Settings</h1>

            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            disabled
                            value={user.name}
                            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm sm:text-sm p-3 border"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            disabled
                            value={user.email}
                            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm sm:text-sm p-3 border"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">AWS SES Configuration</h2>
                <p className="text-sm text-gray-500 mb-4">Update your cron/send_emails.php file manually or via environment variables to modify SES credentials on Hostinger.</p>
                <div className="bg-gray-100 p-4 rounded-md font-mono text-sm text-gray-700">
                    <div>AWS_REGION=us-east-1</div>
                    <div>AWS_ACCESS_KEY_ID=...</div>
                    <div>AWS_SECRET_ACCESS_KEY=...</div>
                    <div>SENDER_EMAIL={user.email || 'noreply@mailnova.com'}</div>
                </div>
            </div>
        </div>
    );
}
