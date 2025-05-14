import { PasswordResetForm } from "../../components/auth/password-reset-form";

export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md">
        <PasswordResetForm />
      </div>
    </div>
  );
}
