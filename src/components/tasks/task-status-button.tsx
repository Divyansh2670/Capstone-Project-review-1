'use client';

import { useTransition } from 'react';
import { useToast } from '../../hooks/use-toast';
import { markTaskAsComplete, markTaskAsDue, markTaskAsPending } from '../../lib/actions';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import type { TaskStatus } from '../../lib/types';
import { cn } from '../../lib/utils';

type TaskStatusButtonProps = {
  taskId: number;
  currentStatus: TaskStatus;
  targetStatus: TaskStatus;
  children: React.ReactNode;
  className?: string;
};

export function TaskStatusButton({
  taskId,
  currentStatus,
  targetStatus,
  children,
  className
}: TaskStatusButtonProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleAction = () => {
    startTransition(async () => {
      let result;
      let successMessage = '';
      if (targetStatus === 'completed') {
        result = await markTaskAsComplete(taskId);
        successMessage = 'Task marked as complete.';
      } else if (targetStatus === 'overdue') {
        result = await markTaskAsDue(taskId);
        successMessage = 'Task marked as overdue.';
      } else if (targetStatus === 'pending') {
        result = await markTaskAsPending(taskId);
        successMessage = 'Task marked as pending.';
      }

      if (result?.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error,
        });
      } else {
        toast({
          title: 'Status Updated',
          description: successMessage,
        });
      }
    });
  };

  return (
    <Button
      onClick={handleAction}
      disabled={isPending || currentStatus === targetStatus}
      variant="outline"
      size="sm"
      className={cn(className)}
    >
      {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
