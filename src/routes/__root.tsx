import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { useAuthenticatedContext } from '@/hooks/useAuthenticatedContext';
import '../index.css';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const auth = useAuthenticatedContext();

  return (
    <>
      {/* Navigation */}
      <nav className="flex gap-4 bg-neutral-900 mb-4">
        <Link
          to="/"
          activeProps={{
            className: 'text-red-500',
          }}
        >
          Dashboard
        </Link>
        <Link
          to="/about"
          activeProps={{
            className: 'text-red-500',
          }}
        >
          About
        </Link>
        <div className="ml-auto"></div>
      </nav>
      <main className="px-4">
        {/* Page */}
        <Outlet />
        <TanStackRouterDevtools position="bottom-right" />
      </main>
    </>
  );
}
