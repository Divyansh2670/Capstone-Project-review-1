'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '../ui/dialog';
import { PlusCircle } from 'lucide-react';
import { AddContactForm } from './add-contact-form';

export function AddContactButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Contact
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
          <DialogDescription>
            Enter the details for your new contact. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <AddContactForm onFinished={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
