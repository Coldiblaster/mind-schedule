export enum UserTypes {
  PROFESSIONAL = 'professional',
  PATIENT = 'patient',
  // Adicione outros tipos conforme necessário
}

export interface UserPrivateMetadata {
  userType: string;
  companyDataCompleted: boolean;
}
