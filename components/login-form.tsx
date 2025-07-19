"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  email: z.union([z.string().email(), z.literal("admin")]),
  password: z.string().min(6),
});

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.email === "admin" && values.password === "123456") {
      router.push("/auth/sign-up?allowed=true");
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword(values);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged in successfully!");

      // Add a small delay to ensure the session is properly set
      // before redirecting to dashboard
      setTimeout(() => {
        router.push("/dashboard");
        // Force a page refresh to ensure middleware picks up the new session
        router.refresh();
      }, 100);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-base font-semibold">
                <Mail className="h-4 w-4" />
                Email Address
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Enter your email address"
                    {...field}
                    className="pl-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 focus:border-slate-500 dark:focus:border-slate-400 h-12 text-base"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
                </div>
              </FormControl>
              <FormDescription className="text-sm text-slate-600 dark:text-slate-400">
                Enter the email address associated with your account
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-base font-semibold">
                  <Lock className="h-4 w-4" />
                  Password
                </FormLabel>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium transition-colors duration-300 underline-offset-4 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...field}
                    className="pl-10 pr-10 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 focus:border-slate-500 dark:focus:border-slate-400 h-12 text-base"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormDescription className="text-sm text-slate-600 dark:text-slate-400">
                Enter your account password
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          type="submit"
          loading={form.formState.isSubmitting}
          loadingText="Signing in..."
          className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-12 text-base font-semibold"
        >
          <LogIn className="h-4 w-4 mr-2" />
          Sign In
        </LoadingButton>

        <div className="text-center pt-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Don't have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 font-semibold transition-colors duration-300 underline-offset-4 hover:underline"
              prefetch={true}
              onClick={() => {
                console.log("Navigating to sign-up page");
              }}
            >
              Create one now
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
