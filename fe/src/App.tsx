import { RouterProvider } from "react-router-dom";

import { Toaster } from "@/common/components/ui/sonner";
import { ThemeProvider } from "@/common/context/theme-provider";
import router from "@/routes";

import AuthProvider from "./common/context/auth-context";

function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="mentorplatform-theme">
            <AuthProvider>
                <RouterProvider router={router} />
                <Toaster />
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
