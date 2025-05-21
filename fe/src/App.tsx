import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";

import { Toaster } from "@/common/components/ui/sonner";
import { ThemeProvider } from "@/common/context/theme-provider";
import router from "@/routes";

import AuthProvider from "./common/context/auth-context";

const queryClient = new QueryClient();

function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="mentorplatform-theme">
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <RouterProvider router={router} />
                    <Toaster />
                </AuthProvider>
                <ReactQueryDevtools initialIsOpen={true} />
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
