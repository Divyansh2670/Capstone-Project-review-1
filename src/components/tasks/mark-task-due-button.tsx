'use client';

import { useTransition } from 'react';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { markTaskAsDue } from '../../lib/actions';
import { useToast } from '../../hooks/use-toast';
import { Loader2 } from 'lucide-react';

export function MarkTaskAsDueMenuItem({ taskId }: { taskId: number }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleMarkAsDue = () => {
    startTransition(async () => {
      const result = await markTaskAsDue(taskId);
      if (result?.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error,
        });
      } else {
        toast({
          title: 'Task Marked as Due',
          description: 'The task has been marked as overdue.',
        });
      }
    });
  };

  return (
    <DropdownMenuItem onClick={handleMarkAsDue} disabled={isPending}>
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Marking...</span>
        </>
      ) : (
        'Mark as Due'
      )}
    </DropdownMenuItem>
  );
}
