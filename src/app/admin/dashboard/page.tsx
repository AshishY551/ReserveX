'use client';
// ✅ Solution: Convert to a Client Component
// At the top of your .tsx file, add this line:
// 'use client';
// This tells Next.js to treat the entire file as a Client Component, allowing usage of hooks like useRef, useEffect, useState, etc.
// --------------------------------------------
// import React from 'react';
// export default function AdminDashboard() {
//   return <div className="p-4"><h1>Admin Dashboard</h1><p>Welcome, Admin!</p></div>;
// }

// import image for icon
import Image from 'next/image';


import React from 'react';
// ✅ Add Chart.js (or Recharts later)
// At top (if using JS/TSX in React)
// ----------------------------------------------------
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

// ✅ Fix for TypeScript error on options={chartOptions}
// You need to ex
// ✅ Updated Import 
import type { ChartOptions } from 'chart.js';


// ✅ Add Chart.js (or Recharts later)
// Register components for Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

// ✅ Add Chart.js (or Recharts later)
// Mock data (to be replaced with real-time DB data later)
const chartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Total Reservations',
      data: [5, 8, 6, 12, 9, 15, 10],
      fill: false,
      backgroundColor: '#6366f1',
      borderColor: '#6366f1',
      tension: 0.4,
    },
  ],
};

// ✅ Add Chart.js (or Recharts later)
const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#4B5563',
        font: {
          // weight: '600' as const, // or just '600' as a string--- error
          weight: 'bold',
        },
      },
    },
    title: {
      display: true,
      text: 'Reservation Trends',
      color: '#111827',
      font: {
        size: 16,
        weight: 'bold',
      },
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false,
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Dates',
        color: '#6B7280',
        font: {
          weight: 'bold',
        },
      },
      ticks: {
        color: '#9CA3AF',
      },
      grid: {
        color: '#E5E7EB',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Bookings',
        color: '#6B7280',
        font: {
          weight: 'bold',
        },
      },
      ticks: {
        color: '#9CA3AF',
      },
      grid: {
        color: '#E5E7EB',
      },
    },
  },
};
// -------------------------------------------------------------------


export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Users', value: '1,230', color: 'bg-blue-500' },
          { label: 'Reservations Today', value: '82', color: 'bg-green-500' },
          { label: 'Pending Requests', value: '14', color: 'bg-yellow-500' },
          { label: 'Total Revenue', value: '₹1.2L', color: 'bg-purple-500' },
        ].map((card, i) => (
          <div key={i} className={`rounded-lg shadow-md p-4 text-white ${card.color}`}>
            <h2 className="text-lg font-medium">{card.label}</h2>
            <p className="text-2xl font-bold mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ✨ 1.Reservation Summary Chart */}
        {/* Reservation Summary Chart (Placeholder) */}
        {/* // In JSX */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
            📈 Reservation Trends
            <span className="text-sm bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full animate-pulse">AI Insights Beta</span>
          </h3>
          <div className="h-64">
            <Line data={chartData} options={chartOptions} />
          </div>
          <div className="text-sm text-gray-500 italic mt-2">
            Predictive trend based on past 7 days’ user behavior. More AI-powered insights coming soon.
          </div>
        </div>


        {/* ✨ 2. Recent Feedback from Users */}
        {/* Recent Feedback (Static Sample for now) */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Recent User Feedback</h3>
          <ul className="divide-y divide-gray-200">
            {[
              { user: 'Amit', feedback: 'Great experience booking the hall!' },
              { user: 'Neha', feedback: 'Please add more photos to the venue listings.' },
              { user: 'Raj', feedback: 'Payment was smooth and quick.' },
            ].map((f, idx) => (
              <li key={idx} className="py-2">
                <p className="font-medium text-gray-800">{f.user}</p>
                <p className="text-gray-600">{f.feedback}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. */}
        {/* Smart Insights / Admin Assistant Tool */}
        <div className="mt-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg shadow-md text-white">
          <h3 className="text-xl font-semibold mb-4">Smart Insights (AI Assistant)</h3>
          <p className="mb-3">🤖 Based on current trends, you should consider:</p>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Offering weekend discounts — high booking spikes seen on Fridays.</li>
            <li>Sending follow-up surveys — user feedback response rate is 70%.</li>
            <li>Automating approval for small reservations (under ₹2000).</li>
          </ul>
          <button className="mt-4 bg-white text-indigo-700 font-semibold px-4 py-2 rounded hover:bg-indigo-100 transition">
            Generate Full Report
          </button>
        </div>

        {/* Recent Users */}
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Recent Activity</h3>
          <ul className="space-y-4">
            {[
              'User John booked "Banquet Hall A"',
              'Admin approved a new reservation',
              'User Priya canceled a booking',
              'Payment of ₹4,000 received from Rahul',
            ].map((item, idx) => (
              <li key={idx} className="border-b pb-2 text-gray-600">{item}</li>
            ))}
          </ul>
        </div>

        

        {/* Quick Links / Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Quick Actions</h3>
          <ul className="space-y-3">
            <li><button className="w-full text-left text-blue-600 hover:underline">Manage Reservations</button></li>
            <li><button className="w-full text-left text-blue-600 hover:underline">Add New Venue</button></li>
            <li><button className="w-full text-left text-blue-600 hover:underline">Send Notifications</button></li>
            <li><button className="w-full text-left text-blue-600 hover:underline">View User Feedback</button></li>
          </ul>
        </div>
      </div>
      {/* ✨ 3. Admin Profile Overview Section */}
      {/* Admin Profile Overview */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-8 mb-16">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Admin Profile</h3>
        <div className="flex items-center space-x-4">
          {/* <img src="/Image/admin/AdminAvatar.jpeg" alt="Admin" className="w-16 h-16 rounded-full border" /> */}

          {/* 2. ✅ Replace <img /> with Next.js <Image />: */}
          <Image
            src="/images/admin/AdminAvatar.jpeg"
            alt="Admin"
            width={64}
            height={64}
            className="w-16 h-16 rounded-full border"
          />
          <div>
            <p className="text-lg font-semibold text-gray-800">Admin Name</p>
            <p className="text-sm text-gray-500">admin@example.com</p>
            <p className="text-sm text-green-600 mt-1">Online</p>
          </div>
        </div>
      </div>

    </div>
  );
}
