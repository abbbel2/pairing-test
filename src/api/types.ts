export type EmployeeAttendance = {
  id: number;
  name: string;
  timezone: string;
  checked_in_at: string;
  checked_out_at: string;
  checkout_message: string;
};

export type AttendanceDay = {
  date: string;
  employees: EmployeeAttendance[];
};

export type AttendanceData = {
  current_day: AttendanceDay;
  yesterday: AttendanceDay;
};

export type Team = {
  id: number;
  name: string;
};

export type AttendanceResponse = {
  team: Team;
  attendance_data: AttendanceData;
  status: "success" | "error";
};

export type ErrorResponse = {
  error: {
    response: {
      data: {
        message: string;
      };
    };
  };
};
