"use client";

import { useEffect, useRef, useState, Suspense } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import gsPresetNewsletter from 'grapesjs-preset-newsletter';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/lib/api';

function EditorContent() {
    const editorRef = useRef(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const campaignId = searchParams.get('id');
    const [campaignName, setCampaignName] = useState(searchParams.get('name') || '');
    const [subject, setSubject] = useState(searchParams.get('subject') || '');
    const [editor, setEditor] = useState<any>(null);
    const [loading, setLoading] = useState(!!campaignId);

    useEffect(() => {
        let e: any;
        const initEditor = async () => {
            let initialData = null;
            if (campaignId) {
                try {
                    const user = JSON.parse(localStorage.getItem('user') || '{}');
                    const res = await api.get(`/campaigns.php?user_id=${user.id}&id=${campaignId}`);
                    if (res.data) {
                        setCampaignName(res.data.campaign_name);
                        setSubject(res.data.subject);
                        if (res.data.design_json) {
                            try {
                                initialData = JSON.parse(res.data.design_json);
                            } catch (e) {
                                console.error('Error parsing design JSON', e);
                            }
                        }
                    }
                } catch (error) {
                    console.error("Error fetching campaign data", error);
                }
            }

            if (!editorRef.current) return;
            e = grapesjs.init({
                container: editorRef.current,
                plugins: [gsPresetNewsletter],
                pluginsOpts: {
                    ['gjs-preset-newsletter']: {
                        // options...
                    }
                },
                assetManager: {
                    upload: 'http://localhost/mailnova/backend/api/upload_image.php',
                    uploadName: 'files',
                },
                storageManager: false, // Disabling local storage for now, will handle manual save
            });

            if (initialData) {
                e.loadProjectData(initialData);
            }

            setEditor(e);
            setLoading(false);
        };

        initEditor();

        return () => {
            if (e) {
                e.destroy();
            }
        };
    }, [campaignId]);

    const handleSaveAndExit = async () => {
        if (!editor) return;
        const html = editor.runCommand('gjs-get-inlined-html');
        const designData = editor.getProjectData();

        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const data: any = {
                user_id: user.id,
                campaign_name: campaignName,
                subject: subject,
                html_content: html,
                design_json: JSON.stringify(designData)
            };
            if (campaignId) {
                data.id = campaignId;
            }

            await api.post('/create_campaign.php', data);
            alert(campaignId ? 'Campaign updated successfully!' : 'Campaign saved successfully!');
            router.push('/campaigns');
        } catch (err: any) {
            alert(err.response?.data?.message || 'Error saving campaign');
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading Editor...</div>;
    }

    return (
        <div className="flex flex-col h-full space-y-4">
            <div className="flex justify-between items-center bg-white p-4 shadow rounded-md">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">{campaignName || 'Unnamed Campaign'}</h2>
                    <p className="text-sm text-gray-500">{subject || 'No Subject'}</p>
                </div>
                <button
                    onClick={handleSaveAndExit}
                    className="bg-[--color-cta] text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600 shadow"
                >
                    Save Campaign
                </button>
            </div>
            <div className="flex-1 w-full border rounded-md overflow-hidden" style={{ minHeight: '80vh' }}>
                <div ref={editorRef} className="h-full w-full"></div>
            </div>
        </div>
    );
}

export default function NewsletterEditor() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading Map...</div>}>
            <EditorContent />
        </Suspense>
    );
}
