import { useState, useEffect, useCallback } from "react";
import { Attendance, Sale } from "@/types/activity";
import { UserPlan } from "@/types/userPlan";
import { Gym } from "@/types/gym";
import { Trainer } from "@/types/trainer";

import { getDailyAttendanceService } from "@/services/attendanceService";
import { getDailySalesService } from "@/services/salesService";
import { getDailyUserPlans } from "@/services/userPlansService";
import { getGymsService } from "@/services/gymsService";
import { getTrainersService } from "@/services/trainersService";
import { getColombiaCurrentDateYMD } from "@/utils/formatDate";

interface DailyViewData {
  attendance: Attendance[];
  sales: Sale[];
  userPlans: UserPlan[];
  gyms: Gym[];
  trainers: Trainer[];
}

interface UseDailyViewDataReturn extends DailyViewData {
  loading: boolean;
  error: string | null;
  loadAllData: () => Promise<void>;
  loadAttendance: () => Promise<void>;
  loadSales: () => Promise<void>;
  loadUserPlans: () => Promise<void>;
  loadGyms: () => Promise<void>;
  loadTrainers: () => Promise<void>;
}

export function useDailyViewData(
  gymId?: number,
  trainerId?: number
): UseDailyViewDataReturn {
  const [data, setData] = useState<DailyViewData>({
    attendance: [],
    sales: [],
    userPlans: [],
    gyms: [],
    trainers: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentDate = getColombiaCurrentDateYMD();

  // Internal fetchers that just return data
  const fetchAttendance = useCallback(async () => {
    return await getDailyAttendanceService(currentDate, gymId, trainerId);
  }, [currentDate, gymId, trainerId]);

  const fetchSales = useCallback(async () => {
    return await getDailySalesService(currentDate, gymId, trainerId);
  }, [currentDate, gymId, trainerId]);

  const fetchUserPlans = useCallback(async () => {
    const userPlansData = await getDailyUserPlans(currentDate, gymId, trainerId);
    return Array.from(new Map(userPlansData.map(item => [item.id, item])).values());
  }, [gymId, trainerId]);

  const fetchGyms = useCallback(async () => {
    return await getGymsService();
  }, []);

  const fetchTrainers = useCallback(async () => {
    return await getTrainersService();
  }, []);

  // Exposed load functions that update state
  const loadAttendance = useCallback(async () => {
    try {
      const attendanceData = await fetchAttendance();
      setData(prev => ({ ...prev, attendance: attendanceData }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar asistencias");
    }
  }, [fetchAttendance]);

  const loadSales = useCallback(async () => {
    try {
      const salesData = await fetchSales();
      setData(prev => ({ ...prev, sales: salesData }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar ventas");
    }
  }, [fetchSales]);

  const loadUserPlans = useCallback(async () => {
    try {
      const userPlansData = await fetchUserPlans();
      setData(prev => ({ ...prev, userPlans: userPlansData }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar planes vendidos");
    }
  }, [fetchUserPlans]);

  const loadGyms = useCallback(async () => {
    try {
      const gymsData = await fetchGyms();
      setData(prev => ({ ...prev, gyms: gymsData }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar gimnasios");
    }
  }, [fetchGyms]);

  const loadTrainers = useCallback(async () => {
    try {
      const trainersData = await fetchTrainers();
      setData(prev => ({ ...prev, trainers: trainersData }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar entrenadores");
    }
  }, [fetchTrainers]);

  // Consolidated loader
  const loadAllData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [ // Use Promise.allSettled to ensure all promises run to completion
        attendanceResult,
        salesResult,
        userPlansResult,
        gymsResult,
        trainersResult,
      ] = await Promise.allSettled([
        fetchAttendance(),
        fetchSales(),
        fetchUserPlans(),
        fetchGyms(),
        fetchTrainers(),
      ]);

      setData(prev => ({
        ...prev,
        attendance: attendanceResult.status === 'fulfilled' ? attendanceResult.value : prev.attendance,
        sales: salesResult.status === 'fulfilled' ? salesResult.value : prev.sales,
        userPlans: userPlansResult.status === 'fulfilled' ? userPlansResult.value : prev.userPlans,
        gyms: gymsResult.status === 'fulfilled' ? gymsResult.value : prev.gyms,
        trainers: trainersResult.status === 'fulfilled' ? trainersResult.value : prev.trainers,
      }));

      // Handle errors from individual promises
      if (attendanceResult.status === 'rejected') {
        console.error("Error loading attendance:", attendanceResult.reason);
        setError(attendanceResult.reason instanceof Error ? attendanceResult.reason.message : "Error al cargar asistencias");
      }
      if (salesResult.status === 'rejected' && !error) { // Only set error if not already set by a previous one
        console.error("Error loading sales:", salesResult.reason);
        setError(salesResult.reason instanceof Error ? salesResult.reason.message : "Error al cargar ventas");
      }
      if (userPlansResult.status === 'rejected' && !error) {
        console.error("Error loading user plans:", userPlansResult.reason);
        setError(userPlansResult.reason instanceof Error ? userPlansResult.reason.message : "Error al cargar planes vendidos");
      }
      if (gymsResult.status === 'rejected' && !error) {
        console.error("Error loading gyms:", gymsResult.reason);
        setError(gymsResult.reason instanceof Error ? gymsResult.reason.message : "Error al cargar gimnasios");
      }
      if (trainersResult.status === 'rejected' && !error) {
        console.error("Error loading trainers:", trainersResult.reason);
        setError(trainersResult.reason instanceof Error ? trainersResult.reason.message : "Error al cargar entrenadores");
      }

    } catch (err) {
      console.error("Error loading all daily view data:", err);
      setError(err instanceof Error ? err.message : "Error al cargar todos los datos");
    } finally {
      setLoading(false);
    }
  }, [fetchAttendance, fetchSales, fetchUserPlans, fetchGyms, fetchTrainers]);

  // Initial load and filter changes
  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  return {
    ...data,
    loading,
    error,
    loadAllData,
    loadAttendance,
    loadSales,
    loadUserPlans,
    loadGyms,
    loadTrainers,
  };
}