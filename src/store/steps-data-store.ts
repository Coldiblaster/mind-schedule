import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';

import {
  AddressProps,
  BusinessProps,
  OperatingHoursProps,
  ServiceProps,
} from '@/schemas/schemas-sign-up';

interface FormData {
  business?: BusinessProps;
  address?: AddressProps;
  services?: ServiceProps[];
  operatingHoursProps?: OperatingHoursProps;
}

interface StepsState {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export const useStepsDataStore = create<StepsState>()(
  persist(
    set => ({
      formData: {},
      updateFormData: data =>
        set(state => ({
          formData: { ...state.formData, ...data },
        })),
      shallow,
    }),
    { name: 'steps-form-data' },
  ),
);
