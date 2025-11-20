'use client';

import * as React from 'react';
import { useTransition } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { deleteTask } from '../../lib/actions';
import { useToast } from '../../hooks/use-toast';
import { Loader2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

function DeleteDialog({ 
  taskId,
  open,
  setOpen,
  trigger
}: { 
  taskId: number,
  open: boolean,
  setOpen: (open: boolean) => void,
  trigger: React.ReactNode
}) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteTask(taskId);
      if (result?.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error,
        });
      } else {
        toast({
          title: 'Task Deleted',
          description: 'The task has been successfully deleted.',
        });
        setOpen(false);
        // router.push('/tasks');
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the task.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending} className="bg-destructive hover:bg-destructive/90">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}


export function DeleteTaskMenuItem({ taskId }: { taskId: number }) {
  const [open, setOpen] = React.useState(false);
  const trigger = (
    <DropdownMenuItem onSelect={e => e.preventDefault()} className="text-destructive">
      Delete
    </DropdownMenuItem>
  );

  return (
    <DeleteDialog taskId={taskId} open={open} setOpen={setOpen} trigger={trigger} />
  );
}

export function DeleteTaskButton({ taskId }: { taskId: number }) {
  const [open, setOpen] = React.useState(false);
  const trigger = (
     <Button size="sm" variant="destructive">
        <Trash2 className="mr-2 h-4 w-4" />
        Delete Task
      </Button>
  );

  return (
    <DeleteDialog taskId={taskId} open={open} setOpen={setOpen} trigger={trigger} />
  );
}
