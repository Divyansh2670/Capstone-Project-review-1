export type TaskStatus = 'pending' | 'completed' | 'overdue';

export type Task = {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string;
  contactId: number;
  createdAt: string;
};

export type Contact = {
  id: number;
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  notes?: string;
  createdAt: string;
  userId: number;
  avatarUrl: string;
};

export type User = {
  id: number;
  email: string;
  createdAt: string;
  role: 'user' | 'admin';
};
