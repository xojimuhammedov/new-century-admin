import { createRoot } from 'react-dom/client';
import Root from './router/index';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';
import { EditorProvider } from 'react-simple-wysiwyg';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5,
      retryDelay: 1000,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <EditorProvider>
      <Root />
    </EditorProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
