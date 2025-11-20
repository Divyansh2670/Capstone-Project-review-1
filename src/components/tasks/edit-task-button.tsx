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
import { Edit } from 'lucide-react';
import { EditTaskForm } from './edit-task-form';
import type { Contact, Task } from '../../lib/types';
import { DropdownMenuItem } from '../ui/dropdown-menu';

export function EditTaskButton({
  task,
  contacts,
  asMenuItem = false,
}: {
  task: Task;
  contacts: Contact[];
  asMenuItem?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const Trigger = asMenuItem ? (
    <DropdownMenuItem onSelect={e => e.preventDefault()}>Edit</DropdownMenuItem>
  ) : (
    <Button variant="outline" size="sm">
      <Edit className="mr-2 h-4 w-4" />
      Edit Task
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <EditTaskForm
          task={task}
          contacts={contacts}
          onFinished={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
