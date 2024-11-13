'use client';

import { Provider } from 'react-redux';
// import { SessionProvider } from 'next-auth/react';
import { store } from './store';

interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <Provider store={store}>{children}</Provider>
    );
}

export default Providers;