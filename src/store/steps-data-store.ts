import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';

import {
  BusinessData,
  LocationData,
  ScheduleData,
  ServiceData,
} from '@/schemas/schemas-sign-up';

interface FormData {
  business?: BusinessData;
  location?: LocationData;
  services?: ServiceData[];
  schedule?: ScheduleData;
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
