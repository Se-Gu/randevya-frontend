import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Staff } from "@/types";

interface StaffCardProps {
  staff: Staff;
}

export function StaffCard({ staff }: StaffCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{staff.name}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Çalışan ID: {staff.id}
      </CardContent>
      <CardFooter className="space-x-2">
        <Link href={`/dashboard/staff/${staff.id}/calendar`} passHref>
          <Button size="sm" variant="secondary" asChild>
            <span>Takvim</span>
          </Button>
        </Link>
        <Link href={`/dashboard/staff/${staff.id}/analytics`} passHref>
          <Button size="sm" variant="secondary" asChild>
            <span>Analiz</span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
