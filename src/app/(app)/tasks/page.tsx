import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../../../components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Badge } from '../../../components/ui/badge';
import { getContacts, getTasks } from '../../../lib/data';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '../../../components/page-header';
import type { Task } from '../../../lib/types';
import { format } from 'date-fns';
import { AddTaskButton } from '../../../components/tasks/add-task-button';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { DeleteTaskMenuItem } from '../../../components/tasks/delete-task-button';
import { MarkTaskAsCompleteMenuItem } from '../../../components/tasks/mark-task-complete-button';
import { EditTaskButton } from '../../../components/tasks/edit-task-button';
import { MarkTaskAsDueMenuItem } from '../../../components/tasks/mark-task-due-button';

function getStatusBadge(status: Task['status']) {
  switch (status) {
    case 'completed':
      return <Badge variant="secondary">Completed</Badge>;
    case 'overdue':
      return <Badge variant="destructive">Overdue</Badge>;
    case 'pending':
    default:
      return <Badge variant="outline">Pending</Badge>;
  }
}

export default async function TasksPage() {
  const tasks = await getTasks();
  const contacts = await getContacts();

  return (
    <div className="flex h-full flex-col space-y-8">
      <PageHeader
        title="Tasks"
        description={`View and manage all ${tasks.length} tasks.`}
      >
        <AddTaskButton contacts={contacts} />
      </PageHeader>
      
      <Card className="flex-1">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task Title</TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Due Date</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map(task => {
                const contact = contacts.find(c => c.id === task.contactId);
                return (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">
                       <Link href={`/tasks/${task.id}`} className="hover:underline">
                        {task.title}
                       </Link>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {contact && (
                        <Link href={`/contacts/${contact.id}`} className="flex items-center gap-2 group">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={contact.avatarUrl} alt={contact.firstName} />
                            <AvatarFallback>{contact.firstName?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className='group-hover:underline'>{`${contact.firstName} ${contact.lastName || ''}`.trim()}</span>
                        </Link>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(task.status)}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {task.dueDate ? format(new Date(task.dueDate), 'PPP') : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {task.status !== 'completed' && (
                            <>
                              <MarkTaskAsCompleteMenuItem taskId={task.id} />
                              <MarkTaskAsDueMenuItem taskId={task.id} />
                            </>
                          )}
                           <EditTaskButton task={task} contacts={contacts} asMenuItem />
                          <DropdownMenuSeparator />
                          <DeleteTaskMenuItem taskId={task.id} />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
