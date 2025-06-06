"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Sparkles } from "lucide-react";
import { UserDetailsStep } from "./register-steps/user-details-step";
import { SalonDetailsStep } from "./register-steps/salon-details-step";
import { SuccessStep } from "./register-steps/success-step";
import { cn } from "@/lib/utils";
import { useRegister } from "@/hooks/auth/use-register";

export type RegisterData = {
  // User details
  name: string;
  email: string;
  password: string;
  confirmPassword: string;

  // Salon details
  salonName: string;
  salonPhone: string;
  salonEmail: string;
  address: string;
  lat?: number;
  lng?: number;
  weeklyAvailability: Array<{
    day: string;
    slots: Array<{ start: string; end: string }>;
  }>;
};

const steps = [
  {
    id: 1,
    title: "Hesap",
    description: "Kişisel bilgiler",
    icon: "👤",
  },
  {
    id: 2,
    title: "Salon",
    description: "Salon detayları",
    icon: "✂️",
  },
  {
    id: 3,
    title: "Hazır",
    description: "Tamamlandı",
    icon: "🎉",
  },
];

export function RegisterFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const registerMutation = useRegister();
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    salonName: "",
    salonPhone: "",
    salonEmail: "",
    address: "",
    weeklyAvailability: [],
  });

  const updateData = (data: Partial<RegisterData>) => {
    setRegisterData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await registerMutation.mutateAsync(registerData);
      nextStep();
    } catch (error) {
      // Error is handled by the mutation
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-purple-500" />
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Salonunuzu Kaydedin
          </h1>
          <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-purple-500" />
        </div>
        <p className="text-sm md:text-base text-muted-foreground">
          Dijital dönüşümünüzü başlatın, müşterilerinizi artırın
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 -z-10">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 ease-out"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex flex-col items-center space-y-1 md:space-y-2 relative"
          >
            <div
              className={cn(
                "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-base md:text-lg font-semibold transition-all duration-300",
                currentStep > step.id
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                  : currentStep === step.id
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg scale-110"
                  : "bg-gray-200 text-gray-500"
              )}
            >
              {currentStep > step.id ? (
                <CheckCircle className="h-5 w-5 md:h-6 md:w-6" />
              ) : (
                <span>{step.icon}</span>
              )}
            </div>
            <div className="text-center">
              <p
                className={cn(
                  "text-xs md:text-sm font-medium transition-colors",
                  currentStep >= step.id
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {step.title}
              </p>
              <p className="text-xs text-muted-foreground hidden md:block">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="min-h-[300px] md:min-h-[400px]">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <UserDetailsStep
                data={registerData}
                updateData={updateData}
                onNext={nextStep}
                isLoading={isLoading}
              />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SalonDetailsStep
                data={registerData}
                updateData={updateData}
                onNext={handleSubmit}
                onPrev={prevStep}
                isLoading={isLoading}
              />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <SuccessStep data={registerData} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
