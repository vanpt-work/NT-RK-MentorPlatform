import { LoginForm } from "../../components/auth/login-form";

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
