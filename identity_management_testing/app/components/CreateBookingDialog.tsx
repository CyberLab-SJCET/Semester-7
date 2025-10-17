'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Lab } from '@/app/types';

interface CreateBookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingCreated: () => void;
  labs: Lab[];
}

export default function CreateBookingDialog({ isOpen, onClose, onBookingCreated, labs }: CreateBookingDialogProps) {
  const [formData, setFormData] = useState({
    labId: '',
    purpose: '',
    startTime: '',
    endTime: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/labs/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          labId: parseInt(formData.labId),
          status: 'pending',
        }),
      });

      if (response.ok) {
        onBookingCreated();
        onClose();
        setFormData({
          labId: '',
          purpose: '',
          startTime: '',
          endTime: '',
        });
      } else {
        console.error('Failed to create booking');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
          <Dialog.Title className="text-xl font-semibold leading-6 text-gray-900 mb-4">
            Create New Booking
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lab</label>
              <select
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2.5 text-gray-900 text-base bg-white"
                value={formData.labId}
                onChange={(e) => setFormData({ ...formData, labId: e.target.value })}
              >
                <option value="">Select a lab</option>
                {labs.map((lab) => (
                  <option key={lab.id} value={lab.id}>
                    {lab.name} - {lab.department}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
              <textarea
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2.5 text-base text-gray-900"
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                rows={3}
                placeholder="Enter booking purpose"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <input
                type="datetime-local"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2.5 text-base text-gray-900"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <input
                type="datetime-local"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2.5 text-base text-gray-900"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              />
            </div>            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                className="rounded-md border border-gray-300 px-4 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md border border-transparent bg-indigo-600 px-4 py-2.5 text-base font-medium text-white hover:bg-indigo-700"
              >
                Create Booking
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}