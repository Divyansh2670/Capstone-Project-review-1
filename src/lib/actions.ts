'use server';

import { revalidatePath } from 'next/cache';
import { contacts, tasks } from './data';
import type { Task, Contact } from './types';
import { z } from 'zod';
import { redirect } from 'next/navigation';

export async function addTask(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const contactId = formData.get('contactId') as string;
  const dueDate = formData.get('dueDate') as string;

  if (!title || !contactId) {
    // Basic validation
    return { error: 'Title and Contact are required.' };
  }

  const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
  const newStatus =
    dueDate && new Date(dueDate) < new Date() ? 'overdue' : 'pending';

  const newTask: Task = {
    id: newId,
    title,
    description: description || undefined,
    contactId: Number(contactId),
    dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
    status: newStatus,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);

  revalidatePath('/dashboard');
  revalidatePath('/tasks');
  if (contactId) {
    revalidatePath(`/contacts/${contactId}`);
  }
}

const editTaskSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  description: z.string().optional(),
  contactId: z.string().nonempty({ message: 'Please select a contact.' }),
  dueDate: z.date().optional(),
});

export async function editTask(taskId: number, values: z.infer<typeof editTaskSchema>) {
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) {
    return { error: 'Task not found.' };
  }

  const validatedFields = editTaskSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields.' };
  }

  const { title, description, contactId, dueDate } = validatedFields.data;
  
  const originalContactId = tasks[taskIndex].contactId;

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title,
    description: description || undefined,
    contactId: Number(contactId),
    dueDate: dueDate ? dueDate.toISOString() : undefined,
  };
  
  revalidatePath('/dashboard');
  revalidatePath('/tasks');
  revalidatePath(`/tasks/${taskId}`);
  revalidatePath(`/contacts/${originalContactId}`);
  if (originalContactId !== Number(contactId)) {
    revalidatePath(`/contacts/${contactId}`);
  }
}

export async function addContact(formData: FormData) {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;

  if (!firstName || !email) {
    return { error: 'First name and email are required.' };
  }

  const newId =
    contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1;

  const newContact: Contact = {
    id: newId,
    firstName,
    lastName: lastName || undefined,
    email,
    phone: phone || undefined,
    createdAt: new Date().toISOString(),
    userId: 1, // Static for now
    avatarUrl: `https://i.pravatar.cc/150?u=${firstName}_${lastName}`,
  };

  contacts.push(newContact);

  revalidatePath('/dashboard');
  revalidatePath('/contacts');
  revalidatePath('/tasks');
}

const editContactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  notes: z.string().optional(),
});

export async function editContact(contactId: number, values: z.infer<typeof editContactSchema>) {
  const contactIndex = contacts.findIndex(c => c.id === contactId);

  if (contactIndex === -1) {
    return { error: 'Contact not found.' };
  }

  const validatedFields = editContactSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields.' };
  }

  contacts[contactIndex] = {
    ...contacts[contactIndex],
    ...validatedFields.data,
  };

  revalidatePath('/dashboard');
  revalidatePath('/contacts');
  revalidatePath(`/contacts/${contactId}`);
}


export async function deleteContact(contactId: number) {
  const contactIndex = contacts.findIndex(c => c.id === contactId);
  if (contactIndex === -1) {
    return { error: 'Contact not found.' };
  }

  // Also delete associated tasks
  const associatedTasks = tasks.filter(t => t.contactId === contactId);
  associatedTasks.forEach(task => {
    const taskIndex = tasks.findIndex(t => t.id === task.id);
    if (taskIndex > -1) {
      tasks.splice(taskIndex, 1);
    }
  });

  contacts.splice(contactIndex, 1);

  revalidatePath('/dashboard');
  revalidatePath('/contacts');
  revalidatePath('/tasks');
  
  // Since the contact page is deleted, redirect to the list
  redirect('/contacts');
}


export async function deleteTask(taskId: number) {
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) {
    return { error: 'Task not found.' };
  }
  const contactId = tasks[taskIndex].contactId;

  tasks.splice(taskIndex, 1);

  revalidatePath('/dashboard');
  revalidatePath('/tasks');
  if (contactId) {
    revalidatePath(`/contacts/${contactId}`);
  }
  revalidatePath(`/tasks/${taskId}`);
  redirect('/tasks');
}

export async function markTaskAsComplete(taskId: number) {
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) {
    return { error: 'Task not found.' };
  }
  const contactId = tasks[taskIndex].contactId;

  tasks[taskIndex].status = 'completed';

  revalidatePath('/dashboard');
  revalidatePath('/tasks');
  revalidatePath(`/tasks/${taskId}`);
  if (contactId) {
    revalidatePath(`/contacts/${contactId}`);
  }
}

export async function markTaskAsDue(taskId: number) {
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) {
    return { error: 'Task not found.' };
  }
  const contactId = tasks[taskIndex].contactId;

  tasks[taskIndex].status = 'overdue';

  revalidatePath('/dashboard');
  revalidatePath('/tasks');
  revalidatePath(`/tasks/${taskId}`);
  if (contactId) {
    revalidatePath(`/contacts/${contactId}`);
  }
}

export async function markTaskAsPending(taskId: number) {
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) {
    return { error: 'Task not found.' };
  }
  const contactId = tasks[taskIndex].contactId;

  tasks[taskIndex].status = 'pending';

  revalidatePath('/dashboard');
  revalidatePath('/tasks');
  revalidatePath(`/tasks/${taskId}`);
  if (contactId) {
    revalidatePath(`/contacts/${contactId}`);
  }
}
