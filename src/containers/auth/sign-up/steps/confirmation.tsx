import { useAuth, useClerk } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

import success from '@/assets/animations/success.json';
import { Animations } from '@/components/animations/animations';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { createAccount } from '@/services/createAccount';
import { useStepsDataStore } from '@/store/steps-data-store';

export function Confirmation() {
  const { formData } = useStepsDataStore();
  const { getToken } = useAuth();

  const [token, setToken] = useState<string | null>(null);

  const handleToken = async () => {
    setToken(await getToken({ template: 'development-jwt' }));
  };

  useEffect(() => {
    handleToken();
  }, []);

  const { user } = useClerk();

  console.log(formData);
  const handleCreateAccount = async () => {
    try {
      await createAccount(
        {
          businessTypeId: formData.business?.businessType?.id,
          customSegment: formData.business?.businessType?.label,
          address: {
            cep: formData.location?.cep ?? '',
            street: formData.location?.street ?? '',
            number: formData.location?.number ?? '',
            neighborhood: formData.location?.neighborhood ?? '',
            city: formData.location?.city ?? '',
            state: formData.location?.state ?? '',
            complement: formData.location?.complement,
          },
          services: formData?.services?.map(service => ({
            description: service.name,
            value: service.price,
            time: service.duration,
          })),
          operatingHours: formData.schedule ?? { days: [] },
          email: user?.emailAddresses[0]?.emailAddress ?? '',
          providerId: user?.id ?? '',
        },
        token!,
      );
    } catch (error) {
      toast({
        title: 'Erro ao cliar a conta',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(error, null, 2)}</code>
          </pre>
        ),
      });
    }
  };

  // export const CreateAccountSchema = z.object({
  //   businessTypeId: z.number().optional(),
  //   customSegment: z.string().optional(),
  //   address: LocationSchema,
  //   services: z.array(ServiceSchema).optional(),
  //   operatingHours: ScheduleSchema,
  //   email: z.string().email('O e-mail deve ser um endereço válido'),
  //   providerId: z.string(),
  // });

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
      <p className="mb-4 text-sm text-muted-foreground md:mb-6">
        Agora você pode usar o sistema da forma que mais atende o seu negócio.
      </p>
      <div className="flex justify-center">
        <Button onClick={handleCreateAccount} className="mt-4" size="lg">
          Efetuar cadastro
        </Button>
      </div>
    </div>
  );
}
