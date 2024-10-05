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

export interface AddressProps {
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
  reviews?: number;
  bio?: string;
  yearsOfExperience?: number;
  education?: string[];
  languages?: string[];
  servicesOffered?: string[];
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
      'Psicóloga especializada em atendimento em análise do comportamento',
    advice: 'CRP: 06/160355',
    cell: '18988859877',
    phone: '1838859577',
    reviews: 4.8,
    bio: 'Atuando há mais de 10 anos com análise do comportamento, ajudando pacientes a melhorar sua qualidade de vida.',
    yearsOfExperience: 12,
    education: [
      'Pós-graduação em Terapia Cognitivo-Comportamental',
      'Graduação em Psicologia pela USP',
    ],
    languages: ['Português', 'Inglês'],
    servicesOffered: ['Terapia presencial', 'Terapia online'],
    time: [
      {
        day: new Date(2024, 9, 2),
        morning: [
          { available: true, time: '07:00' },
          { available: false, time: '07:30' },
          { available: true, time: '08:00' },
          { available: true, time: '08:30' },
          { available: true, time: '09:00' },
          { available: false, time: '09:30' },
          { available: true, time: '10:00' },
          { available: true, time: '10:30' },
          { available: false, time: '11:00' },
          { available: true, time: '11:30' },
          { available: true, time: '12:00' },
          { available: true, time: '12:30' },
        ],
        afternoon: [
          { available: false, time: '13:00' },
          { available: true, time: '13:30' },
          { available: true, time: '14:00' },
          { available: true, time: '14:30' },
          { available: false, time: '15:00' },
          { available: true, time: '15:30' },
          { available: true, time: '16:00' },
          { available: false, time: '16:30' },
          { available: true, time: '17:00' },
          { available: true, time: '17:30' },
          { available: true, time: '18:00' },
          { available: true, time: '18:30' },
        ],
        night: [
          { available: true, time: '19:00' },
          { available: false, time: '19:30' },
          { available: true, time: '20:00' },
          { available: true, time: '20:30' },
          { available: false, time: '21:00' },
        ],
      },
      {
        day: new Date(2024, 9, 3),
        morning: [
          { available: true, time: '07:00' },
          { available: false, time: '07:30' },
          { available: false, time: '08:00' },
          { available: false, time: '08:30' },
          { available: true, time: '09:00' },
          { available: false, time: '09:30' },
          { available: true, time: '10:00' },
          { available: false, time: '10:30' },
          { available: false, time: '12:00' },
          { available: false, time: '12:30' },
        ],
        afternoon: [
          { available: true, time: '13:00' },
          { available: true, time: '13:30' },
          { available: true, time: '14:00' },
          { available: true, time: '14:30' },
          { available: true, time: '15:00' },
          { available: true, time: '15:30' },
          { available: false, time: '17:00' },
          { available: false, time: '17:30' },
          { available: false, time: '18:00' },
          { available: false, time: '18:30' },
        ],
        night: [
          { available: false, time: '19:00' },
          { available: false, time: '19:30' },
          { available: false, time: '20:00' },
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
    name: 'João Paulo Alves Ferreira',
    avatar: '/mock/avatar-4.png',
    specialty: 'Fisioterapeuta',
    typeOfService: 'Presencial',
    price: 'R$ 150,00 por sessão',
    specialties:
      'Fisioterapeuta especializado em reabilitação esportiva e fisioterapia ortopédica',
    advice: 'CREFITO: 123456',
    cell: '11999998888',
    phone: '1133332222',
    reviews: 4.9,
    bio: 'Especializado em tratamentos para atletas e pessoas com lesões esportivas.',
    yearsOfExperience: 8,
    education: [
      'Mestrado em Fisioterapia Esportiva pela USP',
      'Graduação em Fisioterapia pela UNESP',
    ],
    languages: ['Português', 'Espanhol'],
    servicesOffered: [
      'Fisioterapia ortopédica',
      'Reabilitação esportiva',
      'Pilates',
    ],
    time: [
      {
        day: new Date(2024, 9, 4),
        morning: [
          {
            available: true,
            time: '9:00',
          },
        ],
        afternoon: [
          {
            available: true,
            time: '14:00',
          },
        ],
        night: [
          {
            available: true,
            time: '19:00',
          },
        ],
      },
    ],
    address: {
      street: 'Rua da Saúde',
      neighborhood: 'Centro',
      number: '120',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01000-000',
    },
  },
  {
    id: '3',
    name: 'Ana Carolina da Silva',
    avatar: '/mock/avatar-3.jpg',
    specialty: 'Terapeuta Ocupacional',
    typeOfService: 'Online e presencial',
    price: 'R$ 200,00 por sessão',
    specialties:
      'Especialista em desenvolvimento infantil e terapia ocupacional para crianças e adolescentes',
    advice: 'CREFITO: 789123',
    cell: '21988887777',
    phone: '2133445566',
    reviews: 4.7,
    bio: 'Com mais de 15 anos de experiência no cuidado de crianças com dificuldades de desenvolvimento.',
    yearsOfExperience: 15,
    education: [
      'Graduação em Terapia Ocupacional pela UFRJ',
      'Especialização em Desenvolvimento Infantil pela UFF',
    ],
    languages: ['Português'],
    servicesOffered: [
      'Terapia ocupacional infantil',
      'Desenvolvimento motor e cognitivo',
    ],
    time: [
      {
        day: new Date(2024, 9, 5),
        morning: [
          {
            available: true,
            time: '8:00',
          },
        ],
        afternoon: [
          {
            available: true,
            time: '14:00',
          },
        ],
        night: [
          {
            available: true,
            time: '18:00',
          },
        ],
      },
    ],
    address: {
      street: 'Rua das Flores',
      neighborhood: 'Copacabana',
      number: '75',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zipCode: '22050-020',
    },
  },
  // Novo Profissional 1
  {
    id: '4',
    name: 'Carlos Eduardo Lima',
    avatar: '/mock/avatar-4.png',
    specialty: 'Fonoaudiólogo',
    typeOfService: 'Presencial',
    price: 'R$ 250,00 por sessão',
    specialties: 'Fonoaudiologia com foco em disfunções da fala e audição',
    advice: 'CRFa: 2-12345',
    cell: '21987654321',
    phone: '2132123456',
    reviews: 4.6,
    bio: 'Atuando com crianças e adultos com dificuldades auditivas e de fala há mais de 8 anos.',
    yearsOfExperience: 9,
    education: [
      'Graduação em Fonoaudiologia pela PUC-RJ',
      'Especialização em Audiologia Clínica pela UFRJ',
    ],
    languages: ['Português', 'Inglês'],
    servicesOffered: [
      'Terapia de fala',
      'Acompanhamento auditivo',
      'Ajuste de aparelhos auditivos',
    ],
    time: [
      {
        day: new Date(2024, 9, 6),
        morning: [
          {
            available: true,
            time: '8:30',
          },
        ],
        afternoon: [
          {
            available: true,
            time: '14:30',
          },
        ],
        night: [
          {
            available: false,
            time: '20:00',
          },
        ],
      },
    ],
    address: {
      street: 'Av. Atlântica',
      neighborhood: 'Copacabana',
      number: '202',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zipCode: '22060-000',
    },
  },
  // Novo Profissional 2
  {
    id: '5',
    name: 'Mariana Alves Borges',
    avatar: '/mock/avatar-5.webp',
    specialty: 'Nutricionista',
    typeOfService: 'Online e presencial',
    price: 'R$ 180,00 por sessão',
    specialties: 'Nutrição esportiva e emagrecimento',
    advice: 'CRN: 12345',
    cell: '31988887777',
    phone: '3133445566',
    reviews: 4.9,
    bio: 'Nutricionista com enfoque em dietas para atletas e pessoas que buscam emagrecimento saudável.',
    yearsOfExperience: 10,
    education: [
      'Graduação em Nutrição pela UFMG',
      'Especialização em Nutrição Esportiva pela UNICAMP',
    ],
    languages: ['Português', 'Inglês'],
    servicesOffered: ['Consultoria nutricional', 'Avaliação antropométrica'],
    time: [
      {
        day: new Date(2024, 9, 7),
        morning: [
          {
            available: true,
            time: '9:00',
          },
        ],
        afternoon: [
          {
            available: true,
            time: '14:00',
          },
        ],
        night: [
          {
            available: true,
            time: '19:00',
          },
        ],
      },
    ],
    address: {
      street: 'Rua dos Atletas',
      neighborhood: 'Centro',
      number: '321',
      city: 'Belo Horizonte',
      state: 'MG',
      zipCode: '30140-120',
    },
  },
  {
    id: '6',
    name: 'Verônica Ramos de Oliveira Bastazin',
    avatar: '/mock/avatar-1.jpeg',
    specialty: 'Psicóloga',
    typeOfService: 'Online e presencial',
    price: 'A definir',
    specialties:
      'Psicóloga especializada em atendimento em análise do comportamento',
    advice: 'CRP: 06/160355',
    cell: '18988859877',
    phone: '1838859577',
    reviews: 4.8,
    bio: 'Atuando há mais de 10 anos com análise do comportamento, ajudando pacientes a melhorar sua qualidade de vida.',
    yearsOfExperience: 12,
    education: [
      'Pós-graduação em Terapia Cognitivo-Comportamental',
      'Graduação em Psicologia pela USP',
    ],
    languages: ['Português', 'Inglês'],
    servicesOffered: ['Terapia presencial', 'Terapia online'],
    time: [
      {
        day: new Date(2024, 9, 2),
        morning: [
          { available: true, time: '07:00' },
          { available: false, time: '07:30' },
          { available: true, time: '08:00' },
          { available: true, time: '08:30' },
          { available: true, time: '09:00' },
          { available: false, time: '09:30' },
          { available: true, time: '10:00' },
          { available: true, time: '10:30' },
          { available: false, time: '11:00' },
          { available: true, time: '11:30' },
          { available: true, time: '12:00' },
          { available: true, time: '12:30' },
        ],
        afternoon: [
          { available: false, time: '13:00' },
          { available: true, time: '13:30' },
          { available: true, time: '14:00' },
          { available: true, time: '14:30' },
          { available: false, time: '15:00' },
          { available: true, time: '15:30' },
          { available: true, time: '16:00' },
          { available: false, time: '16:30' },
          { available: true, time: '17:00' },
          { available: true, time: '17:30' },
          { available: true, time: '18:00' },
          { available: true, time: '18:30' },
        ],
        night: [
          { available: true, time: '19:00' },
          { available: false, time: '19:30' },
          { available: true, time: '20:00' },
          { available: true, time: '20:30' },
          { available: false, time: '21:00' },
        ],
      },
      {
        day: new Date(2024, 9, 3),
        morning: [
          { available: true, time: '07:00' },
          { available: false, time: '07:30' },
          { available: false, time: '08:00' },
          { available: false, time: '08:30' },
          { available: true, time: '09:00' },
          { available: false, time: '09:30' },
          { available: true, time: '10:00' },
          { available: false, time: '10:30' },
          { available: false, time: '12:00' },
          { available: false, time: '12:30' },
        ],
        afternoon: [
          { available: true, time: '13:00' },
          { available: true, time: '13:30' },
          { available: true, time: '14:00' },
          { available: true, time: '14:30' },
          { available: true, time: '15:00' },
          { available: true, time: '15:30' },
          { available: false, time: '17:00' },
          { available: false, time: '17:30' },
          { available: false, time: '18:00' },
          { available: false, time: '18:30' },
        ],
        night: [
          { available: false, time: '19:00' },
          { available: false, time: '19:30' },
          { available: false, time: '20:00' },
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
    id: '7',
    name: 'Verônica Ramos de Oliveira Bastazin',
    avatar: '/mock/avatar-1.jpeg',
    specialty: 'Psicóloga',
    typeOfService: 'Online e presencial',
    price: 'A definir',
    specialties:
      'Psicóloga especializada em atendimento em análise do comportamento',
    advice: 'CRP: 06/160355',
    cell: '18988859877',
    phone: '1838859577',
    reviews: 4.8,
    bio: 'Atuando há mais de 10 anos com análise do comportamento, ajudando pacientes a melhorar sua qualidade de vida.',
    yearsOfExperience: 12,
    education: [
      'Pós-graduação em Terapia Cognitivo-Comportamental',
      'Graduação em Psicologia pela USP',
    ],
    languages: ['Português', 'Inglês'],
    servicesOffered: ['Terapia presencial', 'Terapia online'],
    time: [
      {
        day: new Date(2024, 9, 2),
        morning: [
          { available: true, time: '07:00' },
          { available: false, time: '07:30' },
          { available: true, time: '08:00' },
          { available: true, time: '08:30' },
          { available: true, time: '09:00' },
          { available: false, time: '09:30' },
          { available: true, time: '10:00' },
          { available: true, time: '10:30' },
          { available: false, time: '11:00' },
          { available: true, time: '11:30' },
          { available: true, time: '12:00' },
          { available: true, time: '12:30' },
        ],
        afternoon: [
          { available: false, time: '13:00' },
          { available: true, time: '13:30' },
          { available: true, time: '14:00' },
          { available: true, time: '14:30' },
          { available: false, time: '15:00' },
          { available: true, time: '15:30' },
          { available: true, time: '16:00' },
          { available: false, time: '16:30' },
          { available: true, time: '17:00' },
          { available: true, time: '17:30' },
          { available: true, time: '18:00' },
          { available: true, time: '18:30' },
        ],
        night: [
          { available: true, time: '19:00' },
          { available: false, time: '19:30' },
          { available: true, time: '20:00' },
          { available: true, time: '20:30' },
          { available: false, time: '21:00' },
        ],
      },
      {
        day: new Date(2024, 9, 3),
        morning: [
          { available: true, time: '07:00' },
          { available: false, time: '07:30' },
          { available: false, time: '08:00' },
          { available: false, time: '08:30' },
          { available: true, time: '09:00' },
          { available: false, time: '09:30' },
          { available: true, time: '10:00' },
          { available: false, time: '10:30' },
          { available: false, time: '12:00' },
          { available: false, time: '12:30' },
        ],
        afternoon: [
          { available: true, time: '13:00' },
          { available: true, time: '13:30' },
          { available: true, time: '14:00' },
          { available: true, time: '14:30' },
          { available: true, time: '15:00' },
          { available: true, time: '15:30' },
          { available: false, time: '17:00' },
          { available: false, time: '17:30' },
          { available: false, time: '18:00' },
          { available: false, time: '18:30' },
        ],
        night: [
          { available: false, time: '19:00' },
          { available: false, time: '19:30' },
          { available: false, time: '20:00' },
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
];
