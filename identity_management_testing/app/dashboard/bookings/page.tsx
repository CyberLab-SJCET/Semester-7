'use client';
import { useState, useEffect } from 'react';
import { LabBooking, Lab } from '@/app/types';
import CreateBookingDialog from '@/app/components/CreateBookingDialog';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<LabBooking[]>([]);
  const [labs, setLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const fetchData = () => {
    Promise.all([
      fetch('/api/labs/bookings').then(res => res.json()),
      fetch('/api/labs').then(res => res.json())
    ]).then(([bookingsData, labsData]) => {
      setBookings(bookingsData.bookings);
      setLabs(labsData.labs);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLabName = (labId: number) => {
    const lab = labs.find(l => l.id === labId);
    return lab ? lab.name : 'Unknown Lab';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Lab Bookings</h1>
        <button 
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          New Booking
        </button>
      </div>

      <CreateBookingDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onBookingCreated={() => {
          fetchData();
          setIsCreateDialogOpen(false);
        }}
        labs={labs}
      />

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {bookings.map((booking) => (
            <li key={booking.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {getLabName(booking.labId)}
                    </p>
                    <span className={`ml-4 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <button className="text-sm text-gray-600 hover:text-gray-900">
                      View Details
                    </button>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      User ID: {booking.userId}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      Purpose: {booking.purpose}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      {new Date(booking.startTime).toLocaleDateString()} - {new Date(booking.endTime).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}