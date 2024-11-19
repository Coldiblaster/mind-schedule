'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEvents } from '@/context/events-context';

import { DateTimePicker } from './date-picker';
import { Icon } from './icon';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Textarea } from './ui/textarea';

const eventAddFormSchema = z.object({
  title: z
    .string({ required_error: 'Please enter a title.' })
    .min(1, { message: 'Must provide a title for this event.' }),
  description: z
    .string({ required_error: 'Please enter a description.' })
    .min(1, { message: 'Must provide a description for this event.' }),
  start: z.date({
    required_error: 'Please select a start time',
    invalid_type_error: "That's not a date!",
  }),
  end: z.date({
    required_error: 'Please select an end time',
    invalid_type_error: "That's not a date!",
  }),
  color: z
    .string({ required_error: 'Please select an event color.' })
    .min(1, { message: 'Must provide a title for this event.' }),
});

type EventAddFormValues = z.infer<typeof eventAddFormSchema>;

interface EventAddFormProps {
  start: Date;
  end: Date;
}

export function EventAddForm({ start, end }: EventAddFormProps) {
  const { events, addEvent } = useEvents();
  const { eventAddOpen, setEventAddOpen } = useEvents();

  const form = useForm<z.infer<typeof eventAddFormSchema>>({
    resolver: zodResolver(eventAddFormSchema),
  });

  useEffect(() => {
    form.reset({
      title: '',
      description: '',
      start,
      end,
      color: '#76c7ef',
    });
  }, [form, start, end]);

  async function onSubmit(data: EventAddFormValues) {
    const newEvent = {
      id: String(events.length + 1),
      title: data.title,
      description: data.description,
      start: data.start,
      end: data.end,
      color: data.color,
    };
    addEvent(newEvent);
    setEventAddOpen(false);
    toast.success(
      'Event added!',
      //   {
      //   title: 'Event added!',
      //   action: (
      //     <ToastAction altText={'Click here to dismiss notification'}>
      //       Dismiss
      //     </ToastAction>
      //   ),
      // }
    );
  }

  return (
    <AlertDialog open={eventAddOpen}>
      <AlertDialogTrigger className="flex" asChild>
        <Button
          className="w-24 text-xs md:w-28 md:text-sm"
          variant="default"
          onClick={() => setEventAddOpen(true)}
        >
          <PlusIcon className="h-3 w-3 md:h-5 md:w-5" />
          <p>Nova agenda</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogCancel
            className="absolute right-2 top-2"
            onClick={() => setEventAddOpen(false)}
          >
            <Icon name="PiX" />
          </AlertDialogCancel>
          <AlertDialogTitle>Nova agenda</AlertDialogTitle>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2.5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Standup Meeting" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Daily session"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="start"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel htmlFor="datetime">De</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      value={field.value}
                      onChange={field.onChange}
                      hourCycle={12}
                      granularity="minute"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel htmlFor="datetime">Até</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      value={field.value}
                      onChange={field.onChange}
                      hourCycle={12}
                      granularity="minute"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Especiladade</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild className="cursor-pointer">
                        <div className="flex w-full flex-row items-center space-x-2 pl-2">
                          <div
                            className={`h-5 w-5 cursor-pointer rounded-full`}
                            style={{ backgroundColor: field.value }}
                          ></div>
                          <Input {...field} />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="mx-auto flex items-center justify-center">
                        <HexColorPicker
                          className="flex"
                          color={field.value}
                          onChange={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter className="pt-2">
              <AlertDialogAction type="submit">Salvar</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
