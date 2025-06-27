import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DashboardShell } from "@/components/dashboard/shell";

export const metadata: Metadata = {
  title: "Yönetim Paneli",
  description: "Sistem yöneticisi için panel",
};

export default function AdminPage() {
  return (
    <DashboardShell>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Yönetim Paneli</h1>
        <div className="space-x-2">
          <Link href="/admin/users">
            <Button variant="secondary">Kullanıcılar</Button>
          </Link>
          <Link href="/admin/salons">
            <Button variant="secondary">Salonlar</Button>
          </Link>
        </div>
      </div>
    </DashboardShell>
  );
}
