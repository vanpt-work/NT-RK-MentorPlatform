import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme();

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            position="top-right"
            expand={false}
            closeButton={true}
            style={
                {
                    "--normal-bg": "var(--popover)",
                    "--normal-text": "var(--popover-foreground)",
                    "--normal-border": "var(--border)",
                    "--success-bg": "hsl(var(--success) / 0.9)",
                    "--success-text": "hsl(var(--success-foreground))",
                    "--success-border": "hsl(var(--success) / 0.2)",
                    "--error-bg": "hsl(var(--destructive) / 0.9)",
                    "--error-text": "hsl(var(--destructive-foreground))",
                    "--error-border": "hsl(var(--destructive) / 0.2)",
                    "--gray-1": "var(--primary-foreground)",
                    "--gray-2": "var(--primary)",
                } as React.CSSProperties
            }
            {...props}
        />
    );
};

export { Toaster };
