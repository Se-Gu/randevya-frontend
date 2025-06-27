import { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/shell";
import { UserList } from "@/components/admin/UserList";

export const metadata: Metadata = {
  title: "Kullanıcılar",
  description: "Kullanıcı yönetimi",
};

export default function AdminUsersPage() {
  return (
    <DashboardShell>
      <UserList />
    </DashboardShell>
  );
}
