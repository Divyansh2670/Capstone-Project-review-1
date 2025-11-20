import { notFound } from 'next/navigation';
import { getTaskById, getContactById, getContacts } from '../../../../lib/data';
import { PageHeader } from '../../../../components/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/ui/avatar';
import { Mail, Phone, Calendar, User, ExternalLink, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import type { Task } from '../../../../lib/types';
import { format } from 'date-fns';
import Link from 'next/link';
import { DeleteTaskButton } from '../../../../components/tasks/delete-task-button';
import { EditTaskButton } from '../../../../components/tasks/edit-task-button';
import { Button } from '../../../../components/ui/button';
import { TaskStatusButton } from '../../../../components/tasks/task-status-button';

function getStatusBadge(status: Task['status']) {
  switch (status) {
    case 'completed':
      return <Badge variant="secondary">Completed</Badge>;
    case 'overdue':
      return <Badge variant="destructive">Overdue</Badge>;
    case 'pending':
    default:
      return <Badge>Pending</Badge>;
  }
}

function getGoogleCalendarLink(task: Task) {
    if (!task.dueDate) return '';

    const toGoogleFormat = (date: Date) => {
        return date.toISOString().replace(/-|:|\.\d{3}/g, '');
    }

    const startTime = new Date(task.dueDate);
    // Let's default to a 1-hour event duration
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: task.title,
        details: task.description || '',
        dates: `${toGoogleFormat(startTime)}/${toGoogleFormat(endTime)}`,
    });

    return `https://www.google.com/calendar/render?${params.toString()}`;
}

export default async function TaskDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const task = await getTaskById(Number(params.id));
  if (!task) {
    notFound();
  }
  
  const contact = await getContactById(task.contactId);
  const allContacts = await getContacts();
  const googleCalendarLink = getGoogleCalendarLink(task);

  return (
    <div className="space-y-8">
      <PageHeader
        title={task.title}
        description={task.description || 'No description for this task.'}
      >
        <div className="flex items-center gap-2">
            {googleCalendarLink && (
              <Button variant="outline" size="sm" asChild>
                <Link href={googleCalendarLink} target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Add to Google Calendar
                </Link>
              </Button>
            )}
            <EditTaskButton task={task} contacts={allContacts} />
            <DeleteTaskButton taskId={task.id} />
        </div>
      </PageHeader>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="space-y-8 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Task Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               {task.description && (
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground">{task.description}</p>
                </div>
              )}
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2">Status</Badge>
                {getStatusBadge(task.status)}
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Due Date:</span>
                <span className="ml-2 text-muted-foreground">
                  {task.dueDate ? format(new Date(task.dueDate), 'PPP') : 'Not set'}
                </span>
              </div>
               <div className="space-y-2 pt-2">
                <h3 className="text-sm font-medium">Change Status</h3>
                <div className="flex items-center gap-2">
                    <TaskStatusButton taskId={task.id} currentStatus={task.status} targetStatus='completed'>
                        <CheckCircle />
                        Mark Complete
                    </TaskStatusButton>
                     <TaskStatusButton taskId={task.id} currentStatus={task.status} targetStatus='pending'>
                        <Clock />
                        Mark Pending
                    </TaskStatusButton>
                     <TaskStatusButton taskId={task.id} currentStatus={task.status} targetStatus='overdue'>
                        <AlertTriangle />
                        Mark Overdue
                    </TaskStatusButton>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {contact && (
            <div className="space-y-8 md:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Associated Contact</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col items-center text-center'>
                     <Avatar className="h-24 w-24 border mb-4">
                        <AvatarImage src={contact.avatarUrl} />
                        <AvatarFallback>
                        {contact.firstName?.charAt(0)}
                        {contact.lastName?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <Link href={`/contacts/${contact.id}`} className='font-bold hover:underline'>{contact.firstName} {contact.lastName}</Link>
                    <div className="mt-4 space-y-2 text-sm text-left">
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
                    </div>
                </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
