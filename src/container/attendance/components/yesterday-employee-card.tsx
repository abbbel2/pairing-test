import { EmployeeAttendance } from "@/api";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { differenceInHours } from "date-fns";
import { FC } from "react";

type YesterdayEmployeeCardProps = {
  employeeAttendance: EmployeeAttendance;
};

export const YesterdayEmployeeCard: FC<YesterdayEmployeeCardProps> = ({
  employeeAttendance,
}) => {
  const checkIn = new Date(employeeAttendance.checked_in_at);
  const checkOut = new Date(employeeAttendance.checked_out_at);
  const hours = differenceInHours(checkOut, checkIn);
  
  return (
    <Card key={employeeAttendance.id} className="hover:shadow-md transition">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback>{employeeAttendance.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{employeeAttendance.name}</p>
            <p className="text-xs text-muted-foreground">
              {checkIn.toLocaleTimeString()} → {checkOut.toLocaleTimeString()}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <Badge variant="secondary">{hours} hrs</Badge>
          <span className="text-xs text-muted-foreground mt-1 italic">
            "{employeeAttendance.checkout_message}"
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
