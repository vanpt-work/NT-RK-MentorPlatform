import { MentorApprovalsForm } from "./components/mentor-approvals-form";

export default function MentorApprovalsPage() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Mentor Approvals Management
                    </h1>
                    <p className="text-gray-500">
                        Manage mentor approvals on the platform
                    </p>
                </div>
            </div>

            <div className="rounded-lg border shadow-sm">
                <div className="border-b px-6 py-5">
                    <h2 className="text-xl font-semibold">
                        Mentor Applications
                    </h2>
                </div>
                <div className="p-6">
                    <MentorApprovalsForm />
                </div>
            </div>
        </div>
    );
}
