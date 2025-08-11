import { useState, useEffect } from "react";
import { Attendance } from "@/types/attendance";
import { Sale } from "@/types/sale";
import { getDailyAttendanceService } from "@/services/attendanceService";
import { getDailySalesService } from "@/services/salesService";
import { getColombiaCurrentDateYMD, getCurrentUTCDateYMD } from "@/utils/formatDate";

export function useDaily() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [salesLoading, setSalesLoading] = useState(false);
  const [attendanceError, setAttendanceError] = useState<string | null>(null);
  const [salesError, setSalesError] = useState<string | null>(null);

  const getCurrentDate = () => {
    const date = getCurrentUTCDateYMD();
    return date
  };

  const loadDailyData = async () => {
    const date = getCurrentDate();
    
    // Load attendance
    setAttendanceLoading(true);
    setAttendanceError(null);
    try {
      const attendanceData = await getDailyAttendanceService(date);
      setAttendance(attendanceData);
    } catch (error) {
      setAttendanceError(error instanceof Error ? error.message : "Error al cargar asistencias");
    } finally {
      setAttendanceLoading(false);
    }

    // Load sales
    setSalesLoading(true);
    setSalesError(null);
    try {
      const salesData = await getDailySalesService(date);
      setSales(salesData);
    } catch (error) {
      setSalesError(error instanceof Error ? error.message : "Error al cargar ventas");
    } finally {
      setSalesLoading(false);
    }
  };

  useEffect(() => {
    loadDailyData();
  }, []);

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
