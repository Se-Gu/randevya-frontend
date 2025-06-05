import { DashboardNav } from "@/components/layout/dashboard-nav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNav />
      <main className="flex-1">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
