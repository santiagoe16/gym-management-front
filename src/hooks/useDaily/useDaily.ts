import { useState, useEffect, useCallback } from "react";
import { Attendance, Sale } from "@/types/activity";
import { getDailyAttendanceService } from "@/services/attendanceService";
import { getDailySalesService } from "@/services/salesService";
import { getColombiaCurrentDateYMD } from "@/utils/formatDate";

export function useDaily(gymId?: number, trainerId?: number) {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [salesLoading, setSalesLoading] = useState(false);
  const [attendanceError, setAttendanceError] = useState<string | null>(null);
  const [salesError, setSalesError] = useState<string | null>(null);

  const getCurrentDate = () => {
    return getColombiaCurrentDateYMD();
  };

  const loadDailyData = useCallback(async () => {
    const date = getCurrentDate();
    
    setAttendanceLoading(true);
    setAttendanceError(null);
    try {
      const attendanceData = await getDailyAttendanceService(date, gymId, trainerId);
      setAttendance(attendanceData);
    } catch (error) {
      setAttendanceError(error instanceof Error ? error.message : "Error al cargar asistencias");
    } finally {
      setAttendanceLoading(false);
    }

    setSalesLoading(true);
    setSalesError(null);
    try {
      const salesData = await getDailySalesService(date, gymId, trainerId);
      setSales(salesData);
    } catch (error) {
      setSalesError(error instanceof Error ? error.message : "Error al cargar ventas");
    } finally {
      setSalesLoading(false);
    }
  }, [gymId, trainerId]);

  useEffect(() => {
    loadDailyData();
  }, [loadDailyData]);

  return {
    attendance,
    sales,
    attendanceLoading,
    salesLoading,
    attendanceError,
    salesError,
    loadDailyData,
    setAttendance,
    setSales,
  };
}
