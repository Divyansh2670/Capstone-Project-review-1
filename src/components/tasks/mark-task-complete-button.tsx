'use client';

import { useTransition } from 'react';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { markTaskAsComplete } from '../../lib/actions';
import { useToast } from '../../hooks/use-toast';
import { Loader2 } from 'lucide-react';

export function MarkTaskAsCompleteMenuItem({ taskId }: { taskId: number }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleMarkAsComplete = () => {
    startTransition(async () => {
      const result = await markTaskAsComplete(taskId);
      if (result?.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error,
        });
      } else {
        toast({
          title: 'Task Completed',
          description: 'The task has been marked as complete.',
        });
      }
    });
  };

  return (
    <DropdownMenuItem onClick={handleMarkAsComplete} disabled={isPending}>
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Marking...</span>
        </>
      ) : (
        'Mark as Complete'
      )}
    </DropdownMenuItem>
  );
}
