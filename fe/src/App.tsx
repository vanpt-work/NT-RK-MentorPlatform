import { RouterProvider } from "react-router-dom";

import { Toaster } from "@/common/components/ui/sonner";
import { ThemeProvider } from "@/common/context/theme-provider";
import router from "@/routes";

function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="mentorplatform-theme">
            <RouterProvider router={router} />
            <Toaster />
        </ThemeProvider>
    );
}

export default App;
