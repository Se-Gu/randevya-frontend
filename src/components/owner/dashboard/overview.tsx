import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Clock, DollarSign } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading";
import { useDashboardMetrics } from "@/hooks/use-dashboard-metrics";
import { formatCurrency, formatDuration } from "@/lib/utils";

export function Overview() {
  const { data, isLoading } = useDashboardMetrics();

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Bugünkü Randevular
          </CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? <LoadingSpinner size="sm" /> : data.todayAppointments}
          </div>
          <p className="text-xs text-muted-foreground">
            {data.todayAppointments === 0 && !isLoading
              ? "Henüz randevu bulunmuyor"
              : ""}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Toplam Müşteri</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? <LoadingSpinner size="sm" /> : data.totalCustomers}
          </div>
          <p className="text-xs text-muted-foreground">
            {data.totalCustomers === 0 && !isLoading
              ? "Henüz müşteri bulunmuyor"
              : ""}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ortalama Süre</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? (
              <LoadingSpinner size="sm" />
            ) : data.averageDuration > 0 ? (
              formatDuration(data.averageDuration)
            ) : (
              "0 dk"
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {data.averageDuration === 0 && !isLoading ? "Henüz veri bulunmuyor" : ""}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Aylık Gelir</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? (
              <LoadingSpinner size="sm" />
            ) : data.monthlyRevenue > 0 ? (
              formatCurrency(data.monthlyRevenue)
            ) : (
              "₺0"
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {data.monthlyRevenue === 0 && !isLoading ? "Henüz gelir bulunmuyor" : ""}
          </p>
        </CardContent>
      </Card>
    </>
  );
}
