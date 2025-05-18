import { MessageSquare, UserCheck, UserX } from "lucide-react";
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

import { cn } from "../../../../common/lib/utils";
import { userServices } from "../../../../common/services/userServices";
import type { User } from "../types";

export const ActionCell = ({ user }: { user: User }) => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const handleOpenDialog = () => {
        setIsConfirmOpen(true);
    };

    const handleCloseDialog = () => {
        setIsConfirmOpen(false);
    };

    const confirmAction = async () => {
        if (!user.isActive) {
            await userServices.activate(user.id);
        } else {
            await userServices.deactivate(user.id);
        }
        setIsConfirmOpen(false);
    };

    return (
        <>
            <div className="flex space-x-2">
                <Button
                    variant="ghost"
                    onClick={() => console.log("Message", user.id)}
                    className="rounded bg-blue-50 p-1.5 text-blue-600 hover:bg-blue-100 dark:bg-blue-800 dark:text-blue-100 dark:hover:bg-blue-700"
                    title="Message user"
                >
                    <MessageSquare />
                </Button>

                {!user.isActive ? (
                    <button
                        onClick={handleOpenDialog}
                        className="rounded bg-green-50 p-1.5 text-green-600 hover:bg-green-100 dark:bg-green-800 dark:text-green-100 dark:hover:bg-green-700"
                        title="Activate user"
                    >
                        <UserCheck />
                    </button>
                ) : (
                    <button
                        onClick={handleOpenDialog}
                        className="rounded bg-red-50 p-1.5 text-red-600 hover:bg-red-100 dark:bg-red-800 dark:text-red-100 dark:hover:bg-red-700"
                        title="Deactivate user"
                    >
                        <UserX />
                    </button>
                )}
            </div>

            <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {!user.isActive
                                ? "Activate Account"
                                : "Deactivate Account"}
                        </DialogTitle>
                        <DialogDescription>
                            {!user.isActive
                                ? `Are you sure you want to activate ${user.name}'s account?`
                                : `Are you sure you want to deactivate ${user.name}'s account?`}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={handleCloseDialog}>
                            Cancel
                        </Button>
                        <Button
                            variant={!user.isActive ? "default" : "destructive"}
                            onClick={confirmAction}
                            className={cn(user.isActive && "text-white")}
                        >
                            {!user.isActive ? "Activate" : "Deactivate"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
