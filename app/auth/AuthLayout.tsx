import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
  children,
  title,
  description,
  linkHref,
  linkText,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  linkHref?: string;
  linkText?: string;
}) {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-balance text-muted-foreground">{description}</p>
          </div>
          {children}
          {linkHref && linkText && (
            <div className="mt-4 text-center text-sm">
              <Link href={linkHref} className="underline">
                {linkText}
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
} 