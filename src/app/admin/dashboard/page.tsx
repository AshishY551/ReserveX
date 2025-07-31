// import React from 'react';
// export default function AdminDashboard() {
//   return <div className="p-4"><h1>Admin Dashboard</h1><p>Welcome, Admin!</p></div>;
// }

import React from 'react';

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
    </div>
  );
}
