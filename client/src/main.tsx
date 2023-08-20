import React from 'react';
import ReactDOM from 'react-dom/client';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import City from './pages/City';
import Favorites from './pages/Favorites';
import Layout from './layout/Layout.tsx';

const queryClient = new QueryClient();

const theme = extendTheme({
  fonts: {
    body: 'Josefin Sans, system-ui, sans-serif', // Add your desired font family here
    heading: 'Josefin Sans, system-ui, sans-serif', // Optional: you can also set a different font for headings
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <City />,
      },
      {
        path: 'city/:city_id',
        element: <City />,
      },
      {
        path: 'favorites',
        element: <Favorites />,
      },
    ],
  },
]);

if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mocks/browser');
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
