import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(fullName: string | undefined): string {
  if (!fullName) return '';

  // Divida o nome completo em partes e pegue a primeira letra de cada palavra
  const nameParts = fullName.split(' ');
  const initials = nameParts.map(part => part.charAt(0).toUpperCase());

  // Limite a quantidade de iniciais a 2 (primeiro e segundo nome, por exemplo)
  return initials.slice(0, 2).join('');
}
