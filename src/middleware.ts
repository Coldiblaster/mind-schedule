import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// rotas públicas
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-up',
  '/about',
  '/contact',
  '/politicas-de-privacidade',
  '/termos-de-uso',
  '/agendamento/:companyName',
  '/agendamento/:companyName/:professionalName',
  '/agendar',
  '/agendar/especialidade',
  '/agendar/pagamento',
  '/agendar/horarios',
  '/agendar/pix',
  '/agendar/perfil',
  '/agendar/selecione-pagamento',
  '/agendar/agendamento-efetuado',
]);

// Definição de rotas específicas
const patientRoutes = [
  '/schedule',
  '/dashboard',
  '/login-callback',
  '/register',
  '/politicas-de-privacidade',
  '/termos-de-uso',
];
const professionalRoutes = [
  '/dashboard',
  '/login-callback',
  '/register',
  '/agenda',
];

// Função para buscar o tipo de usuário (patient ou professional)
async function getUserType(userId: string) {
  const user = await clerkClient().users.getUser(userId);
  return user.privateMetadata.userType;
}
// Função para buscar o tipo de usuário (patient ou professional)
async function getUserPrivateMetadata(
  userId: string,
): Promise<UserPrivateMetadata> {
  const user = await clerkClient().users.getUser(userId);

  return user.privateMetadata as UserPrivateMetadata;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default clerkMiddleware(async (auth: any, request: NextRequest) => {
  const { userId } = auth();
  const currentPath = new URL(request.url).pathname;

  // Usuário não autenticado tenta acessar uma rota privada
  if (!userId && !isPublicRoute(request)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (userId && isPublicRoute(request)) {
    const userPrivateMetadata = await getUserPrivateMetadata(userId);

    // Preciso que ao startRegister redirecione para do registro com parametro ?register=true
    if (!userPrivateMetadata.companyDataCompleted) {
      return NextResponse.redirect(new URL(`/register`, request.url));
    }

    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Se o usuário está autenticado, verificar o tipo de usuário
  if (userId) {
    try {
      const userType = await getUserType(userId);

      if (userType === 'patient') {
        // Pacientes só podem acessar '/schedule'
        if (!patientRoutes.includes(currentPath)) {
          // Redireciona para uma página de erro apenas se não estiver na página de erro
          if (currentPath !== '/not-found') {
            return NextResponse.redirect(new URL('/not-found', request.url)); // Redireciona para página de erro
          }
        }
      }

      if (userType === 'professional') {
        // Profissionais só podem acessar '/dashboard'
        if (!professionalRoutes.includes(currentPath)) {
          // Redireciona para uma página de erro apenas se não estiver na página de erro
          if (currentPath !== '/not-found') {
            return NextResponse.redirect(new URL('/not-found', request.url)); // Redireciona para página de erro
          }
        }
      }
    } catch (error) {
      console.error('Erro ao obter o tipo de usuário:', error);
      return NextResponse.redirect(new URL('/not-found', request.url));
    }
  }

  // Continuar para rotas públicas ou rotas privadas autorizadas
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Ignorar internals do Next.js e arquivos estáticos
    '/((?!_next|api|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
