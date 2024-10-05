import { IconName } from '@/components/icon';

interface MenuProps {
  title: string;
  link: string;
  icon: IconName;
}

export const MenuData: MenuProps[] = [
  {
    title: 'Dashboard',
    icon: 'LuHome',
    link: '/dashboard',
  },
  {
    title: 'Agenda',
    icon: 'LuCalendar',
    link: '/schedule',
  },
];
