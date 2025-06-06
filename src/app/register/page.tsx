import type { Metadata } from "next";
import { RegisterFlow } from "@/components/auth/register-flow";
import { RegisterBackground } from "@/components/auth/register-background";

export const metadata: Metadata = {
  title: "Salon Kaydı",
  description: "Salonunuzu dijital dünyaya taşıyın",
};

export default function RegisterPage() {
  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Background Image Section */}
      <RegisterBackground />

      {/* Register Form Section */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-2xl h-full max-h-screen overflow-y-auto py-4 px-4 md:px-8">
          <RegisterFlow />
        </div>
      </div>
    </div>
  );
}
