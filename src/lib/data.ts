import type { Contact, Task } from './types';

// In-memory data store. In a real application, this would be a database.
export let contacts: Contact[] = [
  {
    id: 1,
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.j@example.com',
    phone: '123-456-7890',
    notes: 'Met at the tech conference. Interested in our new product line. Follow up next week about a demo.',
    createdAt: '2023-10-01T10:00:00Z',
    userId: 1,
    avatarUrl: 'https://i.pravatar.cc/150?u=alice_johnson',
  },
  {
    id: 2,
    firstName: 'Bob',
    lastName: 'Williams',
    email: 'bob.w@example.com',
    phone: '234-567-8901',
    notes: 'Long-time client. Needs a contract renewal by the end of the month.',
    createdAt: '2023-09-15T14:30:00Z',
    userId: 1,
    avatarUrl: 'https://i.pravatar.cc/150?u=bob_williams',
  },
  {
    id: 3,
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie.b@example.com',
    phone: '345-678-9012',
    notes: 'New lead from the marketing campaign. Expressed interest in pricing. Sent initial brochure. Next step is to call and discuss requirements.',
    createdAt: '2023-10-10T09:00:00Z',
    userId: 1,
    avatarUrl: 'https://i.pravatar.cc/150?u=charlie_brown',
  },
  {
    id: 4,
    firstName: 'Diana',
    lastName: 'Miller',
    email: 'diana.m@example.com',
    phone: '456-789-0123',
    notes: 'Referral from Bob Williams. Needs a custom solution. Scheduled a discovery call for Friday.',
    createdAt: '2023-10-12T11:00:00Z',
    userId: 1,
    avatarUrl: 'https://i.pravatar.cc/150?u=diana_miller',
  },
];

export let tasks: Task[] = [
  {
    id: 1,
    title: 'Follow up with Alice',
    description: 'Discuss demo for the new product.',
    status: 'pending',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
    contactId: 1,
    createdAt: '2023-10-02T10:00:00Z',
  },
  {
    id: 2,
    title: 'Send contract to Bob',
    description: 'Finalize and send the renewal contract.',
    status: 'pending',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(),
    contactId: 2,
    createdAt: '2023-10-05T11:00:00Z',
  },
  {
    id: 3,
    title: 'Call Charlie',
    description: 'Discuss pricing and requirements.',
    status: 'completed',
    dueDate: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    contactId: 3,
    createdAt: '2023-10-11T13:00:00Z',
  },
  {
    id: 4,
    title: 'Prepare for Diana call',
    description: 'Research her company and prepare for the discovery call.',
    status: 'pending',
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    contactId: 4,
    createdAt: '2023-10-12T15:00:00Z',
  },
   {
    id: 5,
    title: 'Schedule Q2 Review with Bob',
    description: 'Quarterly business review to discuss performance.',
    status: 'overdue',
    dueDate: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
    contactId: 2,
    createdAt: '2023-09-20T16:00:00Z',
  },
];

// In-memory data access functions (simulating a database)

export const getContacts = async () => {
  return contacts;
};

export const getContactById = async (id: number) => {
  return contacts.find(c => c.id === id);
};

export const getTasks = async () => {
  return tasks;
};

export const getTaskById = async (id: number) => {
  return tasks.find(t => t.id === id);
};

export const getTasksByContactId = async (contactId: number) => {
  return tasks.filter(t => t.contactId === contactId);
};
