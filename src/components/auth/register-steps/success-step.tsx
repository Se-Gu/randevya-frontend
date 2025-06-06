"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  Sparkles,
  ArrowRight,
  Calendar,
  Users,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RegisterData } from "../register-flow";
import Link from "next/link";

interface SuccessStepProps {
  data: RegisterData;
}

export function SuccessStep({ data }: SuccessStepProps) {
  const features = [
    {
      icon: Calendar,
      title: "Randevu Yönetimi",
      description: "Müşteri randevularınızı kolayca yönetin",
    },
    {
      icon: Users,
      title: "Müşteri Takibi",
      description: "Müşteri bilgilerini ve geçmişini görüntüleyin",
    },
    {
      icon: Settings,
      title: "Salon Ayarları",
      description: "Hizmetlerinizi ve çalışma saatlerinizi düzenleyin",
    },
  ];

  return (
    <div className="text-center space-y-6 md:space-y-8">
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
        className="flex justify-center"
      >
        <div className="relative">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
            <CheckCircle className="h-10 w-10 md:h-12 md:w-12 text-white" />
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-yellow-400" />
          </motion.div>
        </div>
      </motion.div>

      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-2 md:space-y-4"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-green-600">
          Tebrikler! 🎉
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground">
          <span className="font-semibold text-foreground">
            {data.salonName}
          </span>{" "}
          başarıyla kaydedildi
        </p>
        <p className="text-sm md:text-base text-muted-foreground">
          Dijital dönüşümünüz başladı! Artık müşterileriniz online randevu
          alabilir.
        </p>
      </motion.div>

      {/* Features Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-3"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            className="p-3 md:p-4 border rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200"
          >
            <feature.icon className="h-6 w-6 md:h-8 md:w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-xs md:text-sm">
              {feature.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="space-y-3 md:space-y-4"
      >
        <Link href="/dashboard">
          <Button
            size="lg"
            className="w-full h-10 md:h-12 text-base md:text-lg"
            style={{
              background: `linear-gradient(135deg, rgba(99, 102, 241, 0.9) 0%, rgba(139, 92, 246, 0.9) 100%)`,
              color: "white",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
              boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            Kontrol Paneline Git
            <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </Link>

        <p className="text-xs md:text-sm text-muted-foreground">
          Giriş bilgileriniz e-posta adresinize gönderildi
        </p>
      </motion.div>
    </div>
  );
}
