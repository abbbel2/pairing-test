import { AttendanceTab } from "@/container/attendance/attendance.tab"
import { MainLayout } from "@/layout"

export const HomePage = () => {
    return (
        <MainLayout>
            <AttendanceTab />
        </MainLayout>
    )
}