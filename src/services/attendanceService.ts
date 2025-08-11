import { Attendance, CreateAttendanceDTO } from "@/types/attendance";
import fetchWithAuth from "@/utils/fetchWithAuth";
import { ATTENDANCE_ENDPOINTS } from "@/constants/apiEndopoints";
import { AttendanceListResponseSchema, AttendanceResponseSchema } from "@/schemas/attendance.schemas";

export async function getDailyAttendanceService(date: string): Promise<Attendance[]> {
  try {
    const res = await fetchWithAuth(`${ATTENDANCE_ENDPOINTS.ATTENDANCE_DAILY}${date}`);
    
    if (!res.ok) {
      throw new Error(`Error HTTP ${res.status}`);
    }
    
    const data = await res.json();
    console.log("respuesta del servidor attendance", data)
    return AttendanceListResponseSchema.parse(data);
  } catch (err) {
    console.error("getDailyAttendanceService error:", err);
    throw err;
  }
}

export async function createAttendanceService(documentId: string, attendance: CreateAttendanceDTO): Promise<Attendance> {
  try {
    const res = await fetchWithAuth(`${ATTENDANCE_ENDPOINTS.ATTENDANCE_CREATE}${documentId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(attendance),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || `Error HTTP ${res.status}`);
    }

    const data = await res.json();
    return AttendanceResponseSchema.parse(data);
  } catch (err) {
    console.error("createAttendanceService error:", err);
    throw err;
  }
}
