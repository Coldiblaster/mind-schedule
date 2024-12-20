import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

import success from '@/assets/animations/success.json';
import { Animations } from '@/components/animations/animations';
import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { usePutMetadata } from '@/services/putUserMetadata';
import { usePostRegister } from '@/services/register/postRegister';
import { useStepsDataStore } from '@/store/steps-data-store';
import { UserTypes } from '@/types/user-types';

export function Confirmation() {
  const { formData } = useStepsDataStore();
  const { user } = useClerk();
  const router = useRouter();
  const { toast } = useToast();

  const useSaveMetadata = usePutMetadata({
    userId: user?.id,
    companyDataCompleted: true,
    userType: UserTypes.PROFESSIONAL,
  });

  const mutation = usePostRegister({
    businessTypeId: formData.business?.businessType?.id,
    customSegment: formData.business?.businessType?.label,
    address: {
      cep: formData.address?.cep ?? '',
      street: formData.address?.street ?? '',
      number: formData.address?.number ?? '',
      neighborhood: formData.address?.neighborhood ?? '',
      city: formData.address?.city ?? '',
      state: formData.address?.state ?? '',
      complement: formData.address?.complement,
    },
    services: formData?.services?.map(service => ({
      title: service.title,
      description: service.title,
      value: service.value,
      time: service.time,
    })),
    operatingHours: formData.operatingHoursProps ?? { days: [] },
    email: user?.emailAddresses[0]?.emailAddress ?? '',
    providerId: user?.id ?? '',
  });

  const handleCreateAccount = async () => {
    mutation.mutate();

    if (mutation.isSuccess) {
      useSaveMetadata.mutate();
      router.push('/login-callback');
    }

    mutation.isError &&
      toast({
        title: 'Ocorreu um erro ao tenta efetuar o cadastro, tente novamente!',
        variant: 'destructive',
      });
  };

  return (
    <div
      className="w-full animate-fade-down text-center"
      role="tabpanel"
      aria-label="Horário de funcionamento"
    >
      <div className="flex flex-col items-center gap-4">
        <Animations url={success} size={{ width: '250px', height: 'auto' }} />
      </div>
      <h2 className="mb-2 text-2xl font-bold">Finalizado</h2>
      <p className="mx-auto mb-4 max-w-[480px] text-sm text-muted-foreground md:mb-6">
        Agora você pode usar o sistema da forma que mais atende o seu negócio.
        Clique no botão abaixo para concluir seu cadastro.
      </p>
      <div className="flex justify-center">
        <Button onClick={handleCreateAccount} className="mt-4" size="lg">
          {mutation.isPending ? (
            <>
              <Icon
                name="PiCircleNotch"
                className="mr-2 h-4 w-4 animate-spin"
              />
              Processando...
            </>
          ) : (
            <>
              Efetuar cadastro
              <Icon name="MdArrowForward" className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
