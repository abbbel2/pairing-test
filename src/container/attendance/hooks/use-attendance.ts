import { getAttendance } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useAttendance = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["attendance-data"],
    queryFn: getAttendance,
  });

  return { data, isLoading, isError, error };
};
