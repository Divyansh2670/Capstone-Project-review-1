import { notFound } from 'next/navigation';
import { getContactById, getTasksByContactId, getContacts } from '../../../../lib/data';
import { PageHeader } from '../../../../components/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../../components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/ui/avatar';
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import { Mail, Phone, Edit, PlusCircle, MoreHorizontal } from 'lucide-react';
import type { Task } from '../../../../lib/types';
import { format } from 'date-fns';
import { SummarizeNotes } from '../../../../components/ai/summarize-notes';
import { AddTaskButton } from '../../../../components/tasks/add-task-button';
import Link from 'next/link';
import { DeleteTaskMenuItem } from '../../../../components/tasks/delete-task-button';
import { MarkTaskAsCompleteMenuItem } from '../../../../components/tasks/mark-task-complete-button';
import { EditTaskButton } from '../../../../components/tasks/edit-task-button';
import { MarkTaskAsDueMenuItem } from '../../../../components/tasks/mark-task-due-button';

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

export default async function ContactDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const contact = await getContactById(Number(params.id));
  if (!contact) {
    notFound();
  }
  const tasks = await getTasksByContactId(contact.id);
  const allContacts = await getContacts();

  return (
    <div className="space-y-8">
      <PageHeader
        title={`${contact.firstName} ${contact.lastName || ''}`}
        description={`Details for this contact.`}
      >
        <Button variant="outline" asChild>
          <Link href={`/contacts/${contact.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Contact
          </Link>
        </Button>
      </PageHeader>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="space-y-8 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Contact Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{contact.notes || 'No notes for this contact.'}</p>
              {contact.notes && <SummarizeNotes notes={contact.notes} />}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Tasks</CardTitle>
                <CardDescription>Tasks associated with this contact.</CardDescription>
              </div>
              <AddTaskButton contacts={allContacts} />
            </CardHeader>
            <CardContent className='p-0'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="w-[100px] text-right"><span className='sr-only'>Actions</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.length > 0 ? (
                    tasks.map(task => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">
                          <Link href={`/tasks/${task.id}`} className="hover:underline">
                            {task.title}
                          </Link>
                        </TableCell>
                        <TableCell>{getStatusBadge(task.status)}</TableCell>
                        <TableCell>{task.dueDate ? format(new Date(task.dueDate), 'PPP') : 'N/A'}</TableCell>
                        <TableCell className='text-right'>
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
                              <EditTaskButton task={task} contacts={allContacts} asMenuItem />
                              <DropdownMenuSeparator />
                              <DeleteTaskMenuItem taskId={task.id} />
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center h-24">No tasks found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8 md:col-span-1">
          <Card>
            <CardHeader className="items-center">
              <Avatar className="h-24 w-24 border">
                <AvatarImage src={contact.avatarUrl} />
                <AvatarFallback>
                  {contact.firstName?.charAt(0)}
                  {contact.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{contact.phone}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
