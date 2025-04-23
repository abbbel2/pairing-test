import { EmployeeAttendance } from "@/api";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IconClock, IconFlame } from "@tabler/icons-react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { FC } from "react";

type CurrentDayEmployeeCardProps = {
  employeeAttendance: EmployeeAttendance;
};

export const CurrentDayEmployeeCard: FC<CurrentDayEmployeeCardProps> = ({
  employeeAttendance,
}) => {
  const checkIn = parseISO(employeeAttendance.checked_in_at);
  const checkOut = employeeAttendance.checked_out_at
    ? parseISO(employeeAttendance.checked_out_at)
    : null;
  const online = !checkOut;

  return (
    <Card key={employeeAttendance.id} className="hover:shadow-lg transition">
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{employeeAttendance.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{employeeAttendance.name}</p>
              <p className="text-xs text-muted-foreground">
                {employeeAttendance.timezone}
              </p>
            </div>
          </div>
          <Badge variant={online ? "default" : "outline"}>
            {online && <div className="h-2 w-2 rounded-full bg-green-400" />}
            {online ? "Online" : "Checked Out"}
          </Badge>
        </div>
        <Separator className=" my-2" />
        <div className="text-sm flex items-center gap-2">
          <IconClock className="w-4 h-4" />
          <span>
            {online
              ? `${formatDistanceToNow(checkIn)} online`
              : `Out at ${checkOut.toLocaleTimeString()}`}
          </span>
        </div>
        {employeeAttendance.checkout_message && (
          <div className="text-xs mt-1 text-muted-foreground italic">
            <IconFlame className="inline w-3 h-3 mr-1" />"
            {employeeAttendance.checkout_message}"
          </div>
        )}
      </CardContent>
    </Card>
  );
};
