import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>Nexus</Link>
            </div>
            <ThemeSwitcher />
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          <main className="flex-1 flex flex-col gap-6 px-4 text-center">
            <h1 className="font-bold text-4xl md:text-5xl mb-4">
              Welcome to Nexus
            </h1>
            <p className="text-muted-foreground md:text-lg">
              Your all-in-one solution for managing your digital world.
              <br />
              Nexus provides the tools you need to stay organized and
              productive.
            </p>
            <div className="mt-6">
              <Link href="/dashboard" passHref>
                <Button size="lg">View Dashboard</Button>
              </Link>
            </div>
          </main>
        </div>

        <section className="w-full max-w-5xl p-5">
          <h2 className="text-2xl font-bold text-center mb-8">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Analytics</h3>
              <p className="text-muted-foreground text-center">
                Gain insights into your activities with our powerful analytics
                tools.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">User Management</h3>
              <p className="text-muted-foreground text-center">
                Easily manage users and their permissions within your
                organization.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-2">And much more...</h3>
              <p className="text-muted-foreground text-center">
                Explore all the features designed to boost your productivity.
              </p>
            </div>
          </div>
        </section>

        <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
          <p>Powered by Scogo ai</p>
        </footer>
      </div>
    </main>
  );
}
