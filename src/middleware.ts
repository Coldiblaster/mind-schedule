import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/', '/sign-up']);

export default clerkMiddleware((auth, request) => {
  const { userId } = auth(); // Verifica se o usuário está autenticado

  // Usuário logado tenta acessar uma rota pública (login ou sign-up)
  if (userId && isPublicRoute(request)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Usuário não autenticado tenta acessar uma rota privada
  if (!userId && !isPublicRoute(request)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Continuar normalmente para rotas públicas ou privadas válidas
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Ignorar internals do Next.js e todos os arquivos estáticos
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Sempre rodar para rotas API
    '/(api|trpc)(.*)',
  ],
};
