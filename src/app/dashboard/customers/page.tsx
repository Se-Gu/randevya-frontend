import { Metadata } from "next";
import { DashboardHeader } from "@/components/owner/dashboard/header";
import { DashboardShell } from "@/components/owner/dashboard/shell";
import { CustomerList } from "@/components/customers";

export const metadata: Metadata = {
  title: "Müşteriler",
  description: "Müşteri yönetimi",
};

export default function CustomersPage() {
  return (
    <DashboardShell>
      {/* <DashboardHeader heading="Müşteriler" text="Müşteri yönetimi" /> */}
      <CustomerList />
    </DashboardShell>
  );
}
