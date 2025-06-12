import { LoginForm } from "@/components/login-form";
import AuthLayout from "../AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Login"
      description="Enter your email below to login to your account"
    >
      <LoginForm />
    </AuthLayout>
  );
} 