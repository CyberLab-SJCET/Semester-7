'use client';
import { useState, useEffect } from 'react';
import { Lab } from '@/app/types';
import CreateLabDialog from '@/app/components/CreateLabDialog';

export default function LabsPage() {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const fetchLabs = () => {
    fetch('/api/labs')
      .then(res => res.json())
      .then(data => {
        setLabs(data.labs);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLabs();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'in-use':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Laboratory Management</h1>
        <button 
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add New Lab
        </button>
      </div>

      <CreateLabDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onLabCreated={() => {
          fetchLabs();
          setIsCreateDialogOpen(false);
        }}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {labs.map((lab) => (
          <div key={lab.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">{lab.name}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lab.status)}`}>
                  {lab.status}
                </span>
              </div>
              
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-500">Department: {lab.department}</p>
                <p className="text-sm text-gray-500">
                  Capacity: {lab.currentOccupancy}/{lab.capacity}
                </p>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Equipment:</h4>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {lab.equipment.map((item, index) => (
                      <span key={index} className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between text-sm text-gray-500">
                <div>
                  Last maintained: {new Date(lab.lastMaintenance).toLocaleDateString()}
                </div>
                <div>
                  Next: {new Date(lab.nextMaintenance).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <button className="text-sm text-indigo-600 hover:text-indigo-900">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}