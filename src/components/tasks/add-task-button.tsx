'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { PlusCircle } from 'lucide-react';
import { AddTaskForm } from './add-task-form';
import type { Contact } from '../../lib/types';

export function AddTaskButton({ contacts }: { contacts: Contact[] }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <AddTaskForm contacts={contacts} onFinished={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
