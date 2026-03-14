"use client";

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import Link from 'next/link';

export default function Campaigns() {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCampaigns = async () => {
        try {
            const userStr = localStorage.getItem('user');
            if (!userStr) return;
            const user = JSON.parse(userStr);
            const res = await api.get(`/campaigns.php?user_id=${user.id}`);
            setCampaigns(res.data || []);
        } catch (error) {
            console.error("Failed to fetch campaigns", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const handleSend = async (campaignId: number) => {
        if (!confirm('Are you sure you want to send this campaign?')) return;
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            await api.post('/send_campaign.php', {
                user_id: user.id,
                campaign_id: campaignId
            });
            alert('Campaign successfully queued for sending!');
            fetchCampaigns();
        } catch (error: any) {
            alert(error.response?.data?.message || 'Error sending campaign');
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'sent': return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Sent</span>;
            case 'sending': return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Sending</span>;
            case 'scheduled': return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Scheduled</span>;
            default: return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Draft</span>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900">Campaigns</h1>
                <Link
                    href="/create-campaign"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[--color-cta] hover:bg-green-600"
                >
                    Create Campaign
                </Link>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {campaigns.map((camp: any) => (
                                <tr key={camp.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{camp.campaign_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{camp.subject}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {getStatusBadge(camp.status)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(camp.created_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium border-none space-x-2">
                                        {camp.status === 'draft' && (
                                            <>
                                                <Link
                                                    href={`/newsletter-editor?id=${camp.id}`}
                                                    className="text-indigo-600 hover:text-indigo-900 font-semibold"
                                                >
                                                    Edit Design
                                                </Link>
                                                <button
                                                    onClick={() => handleSend(camp.id)}
                                                    className="text-[--color-primary] hover:text-indigo-900 font-semibold"
                                                >
                                                    Send Now
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {campaigns.length === 0 && !loading && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                        No campaigns found. <Link href="/create-campaign" className="text-[--color-primary] hover:underline">Create one</Link>.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
