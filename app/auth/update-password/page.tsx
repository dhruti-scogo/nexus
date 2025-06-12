import { UpdatePasswordForm } from "@/components/update-password-form";
import AuthLayout from "../AuthLayout";

export default function UpdatePasswordPage() {
  return (
    <AuthLayout
      title="Update your password"
      description="Enter your new password below."
      linkHref="/dashboard"
      linkText="Back to dashboard"
    >
      <UpdatePasswordForm />
    </AuthLayout>
  );
} 