'use client';
import { useEffect, useState } from 'react';
import { Lab, LabBooking } from '../types';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalLabs: 0,
    availableLabs: 0,
    maintenanceLabs: 0,
    activeBookings: 0
  });
  const [recentBookings, setRecentBookings] = useState<LabBooking[]>([]);
  const [upcomingMaintenance, setUpcomingMaintenance] = useState<Lab[]>([]);

  useEffect(() => {
    // Vulnerable: No auth check, anyone can access this data
    Promise.all([
      fetch('/api/labs').then(res => res.json()),
      fetch('/api/labs/bookings').then(res => res.json()),
    ]).then(([labsData, bookingsData]) => {
      const labs = labsData.labs;
      setStats({
        totalLabs: labs.length,
        availableLabs: labs.filter((l: Lab) => l.status === 'available').length,
        maintenanceLabs: labs.filter((l: Lab) => l.status === 'maintenance').length,
        activeBookings: bookingsData.bookings.filter((b: LabBooking) => b.status === 'approved').length
      });
      setRecentBookings(bookingsData.bookings.slice(0, 5));
      setUpcomingMaintenance(labs.filter((l: Lab) => {
        const maintenance = new Date(l.nextMaintenance);
        const week = new Date();
        week.setDate(week.getDate() + 7);
        return maintenance <= week;
      }));
    });
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Labs</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.totalLabs}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Available Labs</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.availableLabs}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Bookings</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.activeBookings}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Under Maintenance</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.maintenanceLabs}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Recent Bookings</h3>
            <div className="mt-4">
              <ul className="divide-y divide-gray-200">
                {recentBookings.map((booking) => (
                  <li key={booking.id} className="py-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          Lab #{booking.labId}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(booking.startTime).toLocaleDateString()} - {new Date(booking.endTime).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          booking.status === 'approved' ? 'bg-green-100 text-green-800' : 
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Upcoming Maintenance</h3>
            <div className="mt-4">
              <ul className="divide-y divide-gray-200">
                {upcomingMaintenance.map((lab) => (
                  <li key={lab.id} className="py-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {lab.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Due: {new Date(lab.nextMaintenance).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <button className="text-sm text-indigo-600 hover:text-indigo-900">
                          Schedule
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}