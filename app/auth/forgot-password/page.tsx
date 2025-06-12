import { ForgotPasswordForm } from "@/components/forgot-password-form";
import AuthLayout from "../AuthLayout";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Forgot your password?"
      description="Enter your email and we'll send you a link to reset it."
      linkHref="/auth/login"
      linkText="Back to login"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
} 