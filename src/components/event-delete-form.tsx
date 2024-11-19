'use client';

import React from 'react';
import toast from 'react-hot-toast';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useEvents } from '@/context/events-context';

interface EventDeleteFormProps {
  id: string;
  title: string;
}

export function EventDeleteForm({ id, title }: EventDeleteFormProps) {
  const { deleteEvent } = useEvents();
  // const { eventDeleteOpen, setEventDeleteOpen } = useEvents();

  async function onSubmit() {
    deleteEvent(id);
    toast.success(
      'Event deleted!',
      //   {
      //   title: 'Event deleted!',
      //   action: (
      //     <ToastAction altText={'Dismiss notification.'}>Dismiss</ToastAction>
      //   ),
      // }
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Event</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex flex-row items-center justify-between">
            <h1>Delete {title}</h1>
          </AlertDialogTitle>
          Are you sure you want to delete this event?
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={() => onSubmit()}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
