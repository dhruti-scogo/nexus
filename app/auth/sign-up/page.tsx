import { SignUpForm } from "@/components/sign-up-form";
import AuthLayout from "../AuthLayout";

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Create an account"
      description="Enter your email below to create your account"
      linkHref="/auth/login"
      linkText="Already have an account? Sign in"
    >
      <SignUpForm />
    </AuthLayout>
  );
} 