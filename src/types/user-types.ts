export enum UserTypes {
  PROFESSIONAL = 'professional',
  PATIENT = 'patient',
  // Adicione outros tipos conforme necessário
}

export interface UserPrivateMetadata {
  userType: UserTypes | undefined;
  companyDataCompleted: boolean | undefined;
}
