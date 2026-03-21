"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Send, FileEdit, Settings, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setUserName(JSON.parse(user).name);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/login');
    };

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Campaigns', href: '/campaigns', icon: Send },
        { name: 'Subscribers', href: '/subscribers', icon: Users },
        { name: 'Create Campaign', href: '/create-campaign', icon: FileEdit },
        { name: 'Settings', href: '/settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen w-64 flex-col bg-white border-r">
            <div className="flex h-16 items-center justify-center border-b">
                <span className="text-2xl font-bold text-indigo-600">Mailnova</span>
            </div>
            <nav className="flex-1 space-y-1 px-2 py-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${isActive
                                ? 'bg-indigo-50 text-indigo-600'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <item.icon
                                className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'
                                    }`}
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="border-t p-4 flex justify-between items-center">
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700">{userName || 'User'}</span>
                </div>
                <button onClick={handleLogout} className="text-gray-400 hover:text-red-500">
                    <LogOut size={20} />
                </button>
            </div>
        </div>
    );
}
