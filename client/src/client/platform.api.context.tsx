import React, { createContext, useContext } from 'react';
import ApiClient from './platform.api.client';

interface ApiClientContextProps {
    apiClient: ApiClient;
}

// Create context with undefined as the initial value
const ApiClientContext = createContext<ApiClientContextProps | undefined>(undefined);

interface ApiClientProviderProps {
    baseURL: string;
    children: React.ReactNode;
}

// ApiClientProvider Component
export const ApiClientProvider: React.FC<ApiClientProviderProps> = ({ baseURL, children }) => {
    // Initialize the ApiClient with the baseURL only once
    const apiClient = new ApiClient(baseURL);

    return (
        <ApiClientContext.Provider value={{ apiClient }}>
            {children}
        </ApiClientContext.Provider>
    );
};

// Custom hook to use the ApiClient
export const useApiClient = (): ApiClient => {
    const context = useContext(ApiClientContext);
    if (!context) {
        throw new Error('useApiClient must be used within an ApiClientProvider');
    }
    return context.apiClient;
};
