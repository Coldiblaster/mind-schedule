import { IconName } from '@/components/icon';
import { UserTypes } from '@/types/user-types';

interface MenuProps {
  title: string;
  link: string;
  icon: IconName;
  allowedUserTypes: UserTypes[]; // Usando o enum aqui
}

export const MenuData: MenuProps[] = [
  {
    title: 'Dashboard',
    icon: 'LuHome',
    link: '/dashboard',
    allowedUserTypes: [UserTypes.PROFESSIONAL, UserTypes.PATIENT],
  },
  {
    title: 'Agenda',
    icon: 'LuCalendar',
    link: '/schedule',
    allowedUserTypes: [UserTypes.PATIENT],
  },
];
