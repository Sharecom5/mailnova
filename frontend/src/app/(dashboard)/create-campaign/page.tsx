"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateCampaign() {
    const router = useRouter();
    const [campaignName, setCampaignName] = useState('');
    const [subject, setSubject] = useState('');

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (!campaignName || !subject) return;
        router.push(`/newsletter-editor?name=${encodeURIComponent(campaignName)}&subject=${encodeURIComponent(subject)}`);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-2xl font-semibold text-gray-900">Create New Campaign</h1>
            <div className="bg-white shadow rounded-lg p-6">
                <form onSubmit={handleNext} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Campaign Name (Internal)</label>
                        <input
                            type="text"
                            required
                            value={campaignName}
                            onChange={(e) => setCampaignName(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[--color-primary] focus:ring-[--color-primary] sm:text-sm p-3 border"
                            placeholder="e.g. Summer Sale 2026"
                        />
                        <p className="mt-1 text-sm text-gray-500">Only you will see this name.</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Subject Line</label>
                        <input
                            type="text"
                            required
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[--color-primary] focus:ring-[--color-primary] sm:text-sm p-3 border"
                            placeholder="Huge savings inside!"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[--color-primary] hover:bg-indigo-700">
                            Next: Design Email
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
