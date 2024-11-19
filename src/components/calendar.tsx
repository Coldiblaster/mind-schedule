'use client';

import '@/styles/calendar.css';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { PlusIcon, X } from 'lucide-react';
import { useRef, useState } from 'react';

import { useEvents } from '@/context/events-context';

import CalendarNav from './calendar-nav';
import { EventDeleteForm } from './event-delete-form';
import { EventEditForm } from './event-edit-form';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

export default function Calendar() {
  const { events } = useEvents();
  const { setEventAddOpen } = useEvents();

  const calendarRef = useRef<FullCalendar | null>(null);
  const [viewedDate, setViewedDate] = useState(new Date());
  const [selectedStart, setSelectedStart] = useState(new Date());
  const [selectedEnd, setSelectedEnd] = useState(new Date());

  const EventItem = ({ info }: any) => {
    const { event } = info;
    const [left, right] = info.timeText.split(' - ');

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {info.view.type == 'dayGridMonth' ? (
            <div
              style={{ backgroundColor: info.backgroundColor }}
              className="flex min-h-full min-w-full cursor-pointer flex-col space-y-0 overflow-hidden rounded-md p-1"
            >
              <p className="flex flex-row text-wrap font-semibold text-gray-950">
                {event.title}
              </p>
              <p className="flex text-gray-800">{left}</p>
              <p className="flex text-gray-800">{right}</p>
            </div>
          ) : (
            <div className="flex cursor-pointer flex-col space-y-0">
              <p className="wrap text-xs font-semibold text-gray-950">
                {event.title}
              </p>
              <p className="flex text-xs text-gray-800">{`${left} - ${right}`}</p>
              <p className="flex text-xs text-gray-800"></p>
            </div>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex flex-row items-center justify-between">
              <h1>{event.title}</h1>
              <AlertDialogCancel>
                <X className="h-5 w-5" />
              </AlertDialogCancel>
            </AlertDialogTitle>
            <table>
              <tr>
                <th>Time:</th>
                <td>{info.timeText}</td>
              </tr>
              <tr>
                <th>Description:</th>
                <td>{event.extendedProps.description}</td>
              </tr>
              <tr>
                <th>Color:</th>
                <td>
                  <div
                    className="h-5 w-5 rounded-full"
                    style={{ backgroundColor: info.backgroundColor }}
                  ></div>
                </td>
              </tr>
            </table>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <EventDeleteForm id={event.id} title={event.title} />
            <EventEditForm
              id={event.id}
              title={event.title}
              description={event.extendedProps.description}
              start={event.start}
              end={event.end}
              color={info.backgroundColor}
            />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  const DayHeader = ({ info }: any) => {
    const [weekday, day] = info.text.split(' ');

    new Date(info.date).toDateString();

    return (
      <div className="flex h-full items-center overflow-hidden">
        {info.view.type == 'timeGridDay' ? (
          <div className="flex flex-col rounded-sm">
            <p>{new Date(info.date).toDateString()}</p>
          </div>
        ) : info.view.type == 'timeGridWeek' ? (
          <div className="flex flex-col rounded-sm">
            <p className="font-semibold">{weekday}</p>
            <p className="text-muted-foreground">{day}</p>
          </div>
        ) : (
          <div className="flex flex-col rounded-sm">
            <p>{weekday}</p>
          </div>
        )}
      </div>
    );
  };

  const DayRender = ({ info }: any) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
      <div
        className="flex h-full w-full"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {isHovering ? (
          <div className="flex h-full w-full justify-center opacity-0 transition-opacity duration-100 ease-in-out hover:opacity-100">
            <PlusIcon className="h-5 w-5" />
          </div>
        ) : (
          info.dayNumberText
        )}
      </div>
    );
  };

  const handleDateSelect = (info: any) => {
    setSelectedStart(info.start);
    setSelectedEnd(info.end);
  };

  return (
    <>
      <CalendarNav
        calendarRef={calendarRef}
        start={selectedStart}
        end={selectedEnd}
        viewedDate={viewedDate}
      />

      <div className="p-5">
        <FullCalendar
          ref={calendarRef}
          timeZone="local"
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            multiMonthPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          editable
          initialView="timeGridWeek"
          headerToolbar={false}
          slotMinTime={'08:00'}
          slotMaxTime={'24:00'}
          allDaySlot={false}
          firstDay={1}
          height={'75vh'}
          displayEventEnd={true}
          windowResizeDelay={0}
          events={events}
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }}
          eventBorderColor={'black'}
          contentHeight={'auto'}
          expandRows={true}
          dayCellContent={dayInfo => <DayRender info={dayInfo} />}
          eventContent={eventInfo => <EventItem info={eventInfo} />}
          dayHeaderContent={headerInfo => <DayHeader info={headerInfo} />}
          select={handleDateSelect}
          datesSet={dates => setViewedDate(dates.start)}
          dateClick={() => setEventAddOpen(true)}
          nowIndicator
          selectable
        />
      </div>
    </>
  );
}
