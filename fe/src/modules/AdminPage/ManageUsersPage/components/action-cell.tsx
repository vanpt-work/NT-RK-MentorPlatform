import { useState } from "react";

import { Button } from "@/common/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/common/components/ui/dialog";

import type { User } from "../types";

export const ActionCell = ({ user }: { user: User }) => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [action, setAction] = useState<"activate" | "deactivate">();

    const handleAction = (actionType: "activate" | "deactivate") => {
        setAction(actionType);
        setIsConfirmOpen(true);
    };

    const confirmAction = () => {
        if (action === "activate") {
            console.log("Activate", user.id);
            // Add your activation logic here
        } else {
            console.log("Deactivate", user.id);
            // Add your deactivation logic here
        }
        setIsConfirmOpen(false);
    };

    return (
        <>
            <div className="flex space-x-2">
                <button
                    onClick={() => console.log("Message", user.id)}
                    className="rounded bg-blue-50 p-1.5 text-blue-600 hover:bg-blue-100 dark:bg-blue-800 dark:text-blue-100 dark:hover:bg-blue-700"
                    title="Message user"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                </button>

                {user.status !== "Active" ? (
                    <button
                        onClick={() => handleAction("activate")}
                        className="rounded bg-green-50 p-1.5 text-green-600 hover:bg-green-100 dark:bg-green-800 dark:text-green-100 dark:hover:bg-green-700"
                        title="Activate user"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <polyline points="16 11 18 13 22 9"></polyline>
                        </svg>
                    </button>
                ) : (
                    <button
                        onClick={() => handleAction("deactivate")}
                        className="rounded bg-yellow-50 p-1.5 text-yellow-600 hover:bg-yellow-100 dark:bg-yellow-800 dark:text-yellow-100 dark:hover:bg-yellow-700"
                        title="Deactivate user"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <line x1="18" y1="8" x2="23" y2="13"></line>
                            <line x1="23" y1="8" x2="18" y2="13"></line>
                        </svg>
                    </button>
                )}
            </div>

            <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {action === "activate"
                                ? "Activate Account"
                                : "Deactivate Account"}
                        </DialogTitle>
                        <DialogDescription>
                            {action === "activate"
                                ? `Are you sure you want to activate ${user.name}'s account?`
                                : `Are you sure you want to deactivate ${user.name}'s account?`}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsConfirmOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant={
                                action === "activate"
                                    ? "default"
                                    : "destructive"
                            }
                            onClick={confirmAction}
                        >
                            {action === "activate" ? "Activate" : "Deactivate"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
