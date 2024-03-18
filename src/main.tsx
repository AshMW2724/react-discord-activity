import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { DiscordSDK } from '@discord/embedded-app-sdk';
import DiscordProvider from './components/providers/discord';
import AuthProvider from './components/providers/auth';

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <DiscordProvider sdk={discordSdk}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </DiscordProvider>,
  );
}
