export interface TimeProps {
  available: boolean;
  time: string;
}

export interface AvailableTimesProps {
  day: Date;
  morning?: TimeProps[];
  afternoon?: TimeProps[];
  night?: TimeProps[];
}

interface AddressProps {
  street: string;
  neighborhood: string;
  number: string;
  city: string;
  zipCode: string;
  state: string;
  complement?: string;
  lat?: string;
  long?: string;
}

export interface ProfessionalProps {
  name: string;
  specialty: string;
  avatar: string;
  id: string;
  advice?: string;
  typeOfService?: string;
  phone?: string;
  price?: string;
  specialties?: string;
  time?: AvailableTimesProps[];
  telephone?: string;
  cell?: string;
  address?: AddressProps;
}

export const professionalData: ProfessionalProps[] = [
  {
    id: '1',
    name: 'Verônica Ramos de Oliveira Bastazin',
    avatar: '/mock/avatar-1.jpeg',
    specialty: 'Psicóloga',
    typeOfService: 'Online e presencial',
    price: 'A definir',
    specialties:
      'Psicóloga especializada em atendimento em analise do comportamento',
    advice: 'CRP: 06/160355',
    cell: '18988859877',
    phone: '1838859577',
    time: [
      {
        day: new Date(2024, 9, 2),
        afternoon: [
          {
            available: false,
            time: '13:00',
          },
          {
            available: true,
            time: '14:00',
          },
          {
            available: false,
            time: '15:00',
          },
          {
            available: false,
            time: '15:30',
          },
          {
            available: true,
            time: '16:00',
          },
          {
            available: true,
            time: '16:30',
          },
          {
            available: true,
            time: '17:00',
          },
          {
            available: true,
            time: '18:00',
          },
        ],
        morning: [
          {
            available: true,
            time: '7:30',
          },
          {
            available: true,
            time: '8:00',
          },
          {
            available: true,
            time: '8:30',
          },
          {
            available: true,
            time: '9:00',
          },
          {
            available: true,
            time: '9:30',
          },
          {
            available: false,
            time: '10:00',
          },
          {
            available: false,
            time: '11:00',
          },
          {
            available: false,
            time: '11:30',
          },
          {
            available: false,
            time: '12:30',
          },
        ],
        night: [
          {
            available: true,
            time: '19:00',
          },
          {
            available: true,
            time: '19:30',
          },
          {
            available: false,
            time: '20:00',
          },
          {
            available: false,
            time: '21:00',
          },
        ],
      },
      {
        day: new Date(2024, 9, 3),
        afternoon: [
          {
            available: false,
            time: '13:00',
          },
          {
            available: true,
            time: '14:00',
          },
          {
            available: false,
            time: '15:00',
          },
          {
            available: true,
            time: '16:00',
          },
        ],
        morning: [
          {
            available: true,
            time: '8:00',
          },
          {
            available: true,
            time: '9:00',
          },
          {
            available: false,
            time: '10:00',
          },
          {
            available: false,
            time: '11:00',
          },
        ],
        night: [
          {
            available: true,
            time: '19:00',
          },
          {
            available: true,
            time: '19:30',
          },
          {
            available: false,
            time: '20:00',
          },
          {
            available: false,
            time: '21:00',
          },
        ],
      },
    ],
    address: {
      street: 'Rua Domingos Lordsleen',
      neighborhood: 'Jardim Paulista',
      number: '85',
      city: 'Presidente Prudente',
      state: 'SP',
      complement: 'ANDAR 1',
      zipCode: '19865-666',
    },
  },
  {
    id: '2',
    name: 'Anna Borges',
    avatar: '/mock/avatar-2.jpg',
    specialty: 'Psicóloga',
    advice: 'CRP: 06/160355',
  },
  {
    id: '3',
    name: 'Juliana Dias',
    avatar: '/mock/avatar-3.jpg',
    specialty: 'Psicóloga',
    advice: 'CRP: 06/160355',
  },
  {
    id: '4',
    name: 'Fábio Almeida',
    avatar: '/mock/avatar-4.png',
    specialty: 'Psicólogo',
    advice: 'CRP: 06/160355',
  },
  {
    id: '5',
    name: 'Affonso Solano',
    avatar: '/mock/avatar-5.webp',
    specialty: 'Fisioterapeuta',
    advice: 'CRP: 06/160355',
  },
  {
    id: '6',
    name: 'Verônica Ramos de Oliveira Bastazin',
    avatar: '/mock/avatar-1.jpeg',
    specialty: 'Psicóloga',
    advice: 'CRP: 06/160355',
  },
  {
    id: '7',
    name: 'Verônica Ramos de Oliveira Bastazin',
    avatar: '/mock/avatar-1.jpeg',
    specialty: 'Psicóloga',
    advice: 'CRP: 06/160355',
  },
  {
    id: '8',
    name: 'Verônica Ramos de Oliveira Bastazin',
    avatar: '/mock/avatar-1.jpeg',
    specialty: 'Psicóloga',
    advice: 'CRP: 06/160355',
  },
  {
    id: '9',
    name: 'Verônica Ramos de Oliveira Bastazin',
    avatar: '/mock/avatar-1.jpeg',
    specialty: 'Psicóloga',
    advice: 'CRP: 06/160355',
  },
  {
    id: '10',
    name: 'Verônica Ramos de Oliveira Bastazin',
    avatar: '/mock/avatar-1.jpeg',
    specialty: 'Psicóloga',
    advice: 'CRP: 06/160355',
  },
  {
    id: '11',
    name: 'Verônica Ramos de Oliveira Bastazin',
    avatar: '/mock/avatar-1.jpeg',
    specialty: 'Psicóloga',
    advice: 'CRP: 06/160355',
  },
  {
    id: '12',
    name: 'Verônica Ramos de Oliveira Bastazin',
    avatar: '/mock/avatar-1.jpeg',
    specialty: 'Psicóloga',
    advice: 'CRP: 06/160355',
  },
  {
    id: '13',
    name: 'Verônica Ramos de Oliveira Bastazin',
    avatar: '/mock/avatar-1.jpeg',
    specialty: 'Psicóloga',
    advice: 'CRP: 06/160355',
  },
];
