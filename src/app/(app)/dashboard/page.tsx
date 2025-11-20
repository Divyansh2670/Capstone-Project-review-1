import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { Badge } from '../../../components/ui/badge';
import { getContacts, getTasks } from '../../../lib/data';
import { UsersRound, ListChecks, CalendarClock, User } from 'lucide-react';
import type { Task } from '../../../lib/types';
import Link from 'next/link';
import { format, formatDistanceToNow } from 'date-fns';

type StatCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
};

function StatCard({ title, value, icon, description }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

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

export default async function DashboardPage() {
  const contacts = await getContacts();
  const tasks = await getTasks();

  const totalContacts = contacts.length;
  const pendingTasksCount = tasks.filter(t => t.status === 'pending').length;
  const upcomingTasks = tasks
    .filter(t => t.status === 'pending' || t.status === 'overdue')
    .sort((a, b) => new Date(a.dueDate || 0).getTime() - new Date(b.dueDate || 0).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">An overview of your CRM activity.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total Contacts"
          value={totalContacts.toString()}
          icon={<UsersRound className="h-4 w-4 text-muted-foreground" />}
          description="The total number of contacts in your CRM."
        />
        <StatCard
          title="Pending Tasks"
          value={pendingTasksCount.toString()}
          icon={<ListChecks className="h-4 w-4 text-muted-foreground" />}
          description="Tasks that need to be completed."
        />
        <StatCard
          title="Upcoming Deadline"
          value={upcomingTasks.length > 0 && upcomingTasks[0].dueDate ? formatDistanceToNow(new Date(upcomingTasks[0].dueDate), { addSuffix: true }) : 'N/A'}
          icon={<CalendarClock className="h-4 w-4 text-muted-foreground" />}
          description="The next task that is due."
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Tasks</CardTitle>
          <CardDescription>
            Here are your most urgent tasks.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingTasks.length > 0 ? (
                upcomingTasks.map(task => {
                  const contact = contacts.find(c => c.id === task.contactId);
                  return (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.title}</TableCell>
                      <TableCell>{getStatusBadge(task.status)}</TableCell>
                      <TableCell>
                        {task.dueDate ? format(new Date(task.dueDate), 'PPP') : 'N/A'}
                      </TableCell>
                      <TableCell className="text-right">
                         <Link href={`/contacts/${contact?.id}`} className="hover:underline">
                            {contact ? `${contact.firstName} ${contact.lastName || ''}`.trim() : 'N/A'}
                         </Link>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No upcoming tasks. Great job!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
