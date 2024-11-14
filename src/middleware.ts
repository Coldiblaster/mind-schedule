import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// rotas públicas
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-up',
  '/about',
  '/contact',
]);

// Definição de rotas específicas
const patientRoutes = ['/schedule', '/dashboard', '/login-callback'];
const professionalRoutes = ['/dashboard', '/login-callback'];

// Função para buscar o tipo de usuário (patient ou professional)
async function getUserType(userId: string) {
  const user = await clerkClient().users.getUser(userId);
  return user.privateMetadata.userType;
}
// Função para buscar o tipo de usuário (patient ou professional)
async function getRegisterType(userId: string) {
  const user = await clerkClient().users.getUser(userId);
  return user.privateMetadata.startRegister;
}

export default clerkMiddleware(async (auth, request) => {
  const { userId } = auth();
  const currentPath = new URL(request.url).pathname;

  // Usuário não autenticado tenta acessar uma rota privada
  if (!userId && !isPublicRoute(request)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (userId && isPublicRoute(request)) {
    const startRegister = await getRegisterType(userId);
    console.log('startRegister', startRegister);
    // Preciso que ao startRegister redirecione para do registro com parametro ?register=true
    if (startRegister) {
      return NextResponse.redirect(new URL(`/register`, request.url));
    }
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Se o usuário está autenticado, verificar o tipo de usuário
  if (userId) {
    try {
      const userType = await getUserType(userId);

      // Validação de rotas com base no tipo de usuário
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
