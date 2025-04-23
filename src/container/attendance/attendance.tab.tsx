import { ErrorMessage, Spinner } from "@/components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CurrentDayEmployeeCard, YesterdayEmployeeCard } from "./components";
import { useAttendance } from "./hooks";

export const AttendanceTab = () => {
  const { data, isLoading, error } = useAttendance();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <ErrorMessage title="Fetching data failed" message={error.message} />
    );
  }

  return (
    <>
      <h2 className="text-2xl text-accent-foreground font-bold tracking-tight">Team: {data?.team?.name}</h2>
      <Tabs title={data?.team.name} defaultValue="today" className="w-full mt-4">
        <TabsList className="mb-4">
          <TabsTrigger value="today">🟢 Live Now</TabsTrigger>
          <TabsTrigger value="yesterday">📅 Yesterday Recap</TabsTrigger>
        </TabsList>

        <TabsContent value="today">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.attendance_data.current_day.employees.map((emp, idx) => (
              <CurrentDayEmployeeCard key={idx} employeeAttendance={emp} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="yesterday">
          <div className="space-y-4">
            {data?.attendance_data.yesterday.employees.map((emp) => (
              <YesterdayEmployeeCard employeeAttendance={emp} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};
