import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isClientRoute = createRouteMatcher(['/dashboard(.*)']);
const isPatientRoute = createRouteMatcher(['/schedule(.*)']);
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-up',
  '/about',
  '/contact',
]);

// Definição de rotas específicas
const patientRoutes = ['/schedule', '/dashboard', '/login-callback'];
const professionalRoutes = ['/dashboard', '/login-callback'];

export default clerkMiddleware(async (auth, request) => {
  if (isPatientRoute(request)) {
    auth().protect(has => {
      console.log('has', has);
      return has({ permission: 'org:patient:all' });
    });
  }
  if (isClientRoute(request)) {
    auth().protect(has => {
      return has({ permission: 'org:client:all' });
    });
  }
  if (isClientRoute(request)) auth().protect();
});

export const config = {
  matcher: [
    // Ignorar internals do Next.js e arquivos estáticos
    '/((?!_next|api|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
