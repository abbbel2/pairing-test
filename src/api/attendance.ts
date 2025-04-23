 
import { AttendanceResponse } from "./types";
import * as data from "../data.json";

// export const getAttendance = async (): Promise<AttendanceResponse> => {
//   try {
//     const res = await fetch(`https://teamcheckout.com/api/teams/42`);
//     const data: AttendanceResponse = await res.json();
//     return data;
//   } catch (error: any) {
//     throw new Error(error?.response?.data?.message || "Failed to fetch data");
//   }
// };

export const getAttendance = async (): Promise<AttendanceResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data as AttendanceResponse);
    }, 3000)
  })
}
