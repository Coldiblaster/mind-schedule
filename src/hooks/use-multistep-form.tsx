import React, {
  createContext,
  type ReactNode,
  useContext,
  useState,
} from 'react';

import { ProfessionalProps } from '@/data/mock/professional';

interface Data {
  stepNumber: number;
  professional: ProfessionalProps;
}

interface MultiStepFormContextType {
  data: Data;
  updatePropertyForm: (property: Partial<Data>) => void;
}

interface MultiStepFormContextProviderProps {
  children: ReactNode;
}

const MultiStepFormContext = createContext({} as MultiStepFormContextType);

const MultiStepFormProvider = ({
  children,
}: MultiStepFormContextProviderProps) => {
  const [data, setData] = useState<Data>({
    stepNumber: 1,
    professional: {},
  } as Data);

  const updatePropertyForm = (values: Partial<Data>) => {
    setData({ ...data, ...values });
  };

  return (
    <MultiStepFormContext.Provider
      value={{
        data,
        updatePropertyForm,
      }}
    >
      {children}
    </MultiStepFormContext.Provider>
  );
};

const useMultiStepForm = () => {
  return useContext(MultiStepFormContext);
};

export { MultiStepFormProvider, useMultiStepForm };
