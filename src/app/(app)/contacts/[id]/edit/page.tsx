'use server';

import { notFound } from 'next/navigation';
import { getContactById } from '../../../../../lib/data';
import { PageHeader } from '../../../../../components/page-header';
import { EditContactForm } from '../../../../../components/contacts/edit-contact-form';

export default async function EditContactPage({
  params,
}: {
  params: { id: string };
}) {
  const contact = await getContactById(Number(params.id));

  if (!contact) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Edit Contact"
        description={`Update the details for ${contact.firstName} ${contact.lastName || ''}.`}
      />
      <EditContactForm contact={contact} />
    </div>
  );
}
