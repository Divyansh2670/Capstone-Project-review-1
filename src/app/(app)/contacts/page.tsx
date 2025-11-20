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
import { getContacts } from '../../../lib/data';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '../../../components/page-header';
import { Card, CardContent } from '../../../components/ui/card';
import { AddContactButton } from '../../../components/contacts/add-contact-button';
import { Button } from '../../../components/ui/button';
import { DeleteContactMenuItem } from '../../../components/contacts/delete-contact-button';

export default async function ContactsPage() {
  const contacts = await getContacts();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Contacts"
        description={`Manage your ${contacts.length} contacts.`}
      >
        <AddContactButton />
      </PageHeader>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map(contact => (
                <TableRow key={contact.id}>
                  <TableCell>
                    <Link href={`/contacts/${contact.id}`} className="flex items-center gap-4 group">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={contact.avatarUrl} alt={contact.firstName} />
                        <AvatarFallback>
                          {contact.firstName?.charAt(0)}
                          {contact.lastName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="font-medium group-hover:underline">
                        {contact.firstName} {contact.lastName}
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{contact.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{contact.phone}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                           <Link href={`/contacts/${contact.id}/edit`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DeleteContactMenuItem contactId={contact.id} />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
