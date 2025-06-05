import { useMutation } from "@tanstack/react-query";
import { authApi, ApiError } from "@/lib/api";
import { LoginDto, LoginResponse } from "@/types";
import { authStorage } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export function useLogin() {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation<LoginResponse, ApiError, LoginDto>({
    mutationFn: (values) => authApi.login(values),
    onSuccess: (data) => {
      authStorage.set(data);
      toast({
        title: "Başarılı",
        description: "Başarıyla giriş yaptınız",
      });
      router.push("/dashboard");
    },
    onError: (error) => {
      let errorMessage = "Giriş yapılamadı. Lütfen tekrar deneyin.";

      if (error.status === 401) {
        errorMessage =
          "E-posta veya şifre hatalı. Lütfen bilgilerinizi kontrol edin.";
      } else if (error.status === 429) {
        errorMessage = "Çok fazla deneme yaptınız. Lütfen bir süre bekleyin.";
      } else if (error.status === 0) {
        errorMessage =
          "Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.";
      }

      toast({
        title: "Hata",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
}
