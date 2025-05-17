import { cn } from "../lib/utils";

type LoadingSpinnerProps = {
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
    fullScreen?: boolean;
    text?: string;
};

export function LoadingSpinner({
    size = "md",
    className,
    fullScreen = false,
    text,
}: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: "w-4 h-4 border-2",
        md: "w-8 h-8 border-3",
        lg: "w-12 h-12 border-4",
        xl: "w-16 h-16 border-4",
    };

    const wrapperClasses = fullScreen
        ? "fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50"
        : "flex flex-col items-center justify-center";

    return (
        <div className={cn(wrapperClasses, className)}>
            <div className="relative">
                <div
                    className={cn(
                        "border-t-primary animate-spin rounded-full border-transparent",
                        sizeClasses[size],
                    )}
                />
                <div
                    className={cn(
                        "border-primary/20 absolute inset-0 rounded-full border-t-transparent",
                        sizeClasses[size],
                    )}
                />
            </div>
            {text && (
                <p className="text-muted-foreground mt-4 text-sm">{text}</p>
            )}
        </div>
    );
}

export function FullscreenLoading({ text = "Loading..." }: { text?: string }) {
    return <LoadingSpinner size="lg" fullScreen={true} text={text} />;
}

export default LoadingSpinner;
