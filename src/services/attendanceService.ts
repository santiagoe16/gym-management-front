import { Attendance, CreateAttendanceDTO } from "@/types/activity";
import fetchWithAuth from "@/utils/fetchWithAuth";
import { ATTENDANCE_ENDPOINTS } from "@/constants/apiEndopoints";
import { AttendanceListResponseSchema, AttendanceResponseSchema } from "@/schemas/attendance.schemas";
import { Console } from "console";

export async function getDailyAttendanceService(
  date: string,
  gymId?: number,
  trainerId?: number
): Promise<Attendance[]> {
  try {
    const params = new URLSearchParams();
    if (gymId) params.append('gym_id', gymId.toString());
    if (trainerId) params.append('trainer_id', trainerId.toString());

    const queryString = params.toString();
    const url = `${ATTENDANCE_ENDPOINTS.ATTENDANCE_DAILY}${date}${queryString ? `?${queryString}` : ''}`;
    
    const res = await fetchWithAuth(url);
    
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
      console.log("errordata",errorData)
      throw new Error(errorData.detail || `Error HTTP ${res.status}`);
    }

    const data = await res.json();
    return AttendanceResponseSchema.parse(data);
  } catch (err) {
    console.error("createAttendanceService error:", err);
    throw err;
  }
}
