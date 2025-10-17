export interface Lab {
  id: number;
  name: string;
  status: 'available' | 'in-use' | 'maintenance';
  capacity: number;
  currentOccupancy: number;
  equipment: string[];
  lastMaintenance: string;
  nextMaintenance: string;
  department: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  department?: string;
  labAccess?: string[];
}

export interface LabBooking {
  id: number;
  labId: number;
  userId: number;
  startTime: string;
  endTime: string;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
}