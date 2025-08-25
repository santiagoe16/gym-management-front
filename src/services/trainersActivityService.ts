import { Attendance, Sale } from "@/types/activity";
import { UserPlan } from "@/types/userPlan";
import { User } from "@/types/user";
import fetchWithAuth from "@/utils/fetchWithAuth";
import { 
  SALES_ENDPOINTS, 
  USER_PLANS_ENDPOINTS, 
  ATTENDANCE_ENDPOINTS, 
  USER_ENDPOINTS 
} from "@/constants/apiEndopoints";
import {
  SaleListResponseSchema,
} from "@/schemas/sale.schemas";
import {
  UserPlanListResponseSchema,
} from "@/schemas/userPlan.schemas";
import {
  AttendanceListResponseSchema,
} from "@/schemas/attendance.schemas";
import {
  UserListResponseSchema,
} from "@/schemas/user.schemas";
import { colombiaDateStringToUTC } from "@/utils/formatDate";

export interface TrainersActivityFilters {
  startDate?: string; // Fecha en formato YYYY-MM-DD (Colombia)
  endDate?: string;   // Fecha en formato YYYY-MM-DD (Colombia)
  trainerId?: number;
  gymId?: number;
}

export interface TrainersActivityData {
  sales: Sale[];
  userPlans: UserPlan[];
  attendance: Attendance[];
}

export interface TrainersActivitySummary {
  totalSales: number;
  totalPlans: number;
  totalAttendance: number;
  totalRevenue: number;
}

// Obtener ventas con filtros de rango de fechas
export async function getSalesInRange(filters: TrainersActivityFilters): Promise<Sale[]> {
  try {
    const params = new URLSearchParams();
    console.log(filters)
    
    if (filters.startDate) {
      const utcStartDate = colombiaDateStringToUTC(filters.startDate);
      params.append('start_date', utcStartDate);
    }
    
    if (filters.endDate) {
      const utcEndDate = colombiaDateStringToUTC(filters.endDate);
      params.append('end_date', utcEndDate);
    }
    
    if (filters.trainerId) {
      params.append('trainer_id', filters.trainerId.toString());
    }
    
    if (filters.gymId) {
      params.append('gym_id', filters.gymId.toString());
    }

    const url = `${SALES_ENDPOINTS.SALES_ALL}?${params.toString()}`;
    const res = await fetchWithAuth(url);

    if (!res.ok) {
      throw new Error(`Error HTTP ${res.status}`);
    }

    const data = await res.json();
    console.log("respuesta del servidor sales range", data);
    return SaleListResponseSchema.parse(data);
  } catch (err) {
    console.error("getSalesInRange error:", err);
    throw err;
  }
}

// Obtener planes vendidos con filtros de rango de fechas
export async function getUserPlansInRange(filters: TrainersActivityFilters): Promise<UserPlan[]> {
  try {
    const params = new URLSearchParams();
    
    if (filters.startDate) {
      const utcStartDate = colombiaDateStringToUTC(filters.startDate);
      params.append('start_date', utcStartDate);
    }
    
    if (filters.endDate) {
      const utcEndDate = colombiaDateStringToUTC(filters.endDate);
      params.append('end_date', utcEndDate);
    }
    
    if (filters.trainerId) {
      params.append('trainer_id', filters.trainerId.toString());
    }
    
    if (filters.gymId) {
      params.append('gym_id', filters.gymId.toString());
    }

    const url = `${USER_PLANS_ENDPOINTS.USER_PLANS_ALL}?${params.toString()}`;
    const res = await fetchWithAuth(url);

    if (!res.ok) {
      throw new Error(`Error HTTP ${res.status}`);
    }

    const data = await res.json();
    console.log("respuesta del servidor user plans range", data);
    return UserPlanListResponseSchema.parse(data);
  } catch (err) {
    console.error("getUserPlansInRange error:", err);
    throw err;
  }
}

// Obtener asistencias con filtros de rango de fechas
export async function getAttendanceInRange(filters: TrainersActivityFilters): Promise<Attendance[]> {
  try {
    const params = new URLSearchParams();
    
    if (filters.startDate) {
      const utcStartDate = colombiaDateStringToUTC(filters.startDate);
      params.append('start_date', utcStartDate);
    }
    
    if (filters.endDate) {
      const utcEndDate = colombiaDateStringToUTC(filters.endDate);
      params.append('end_date', utcEndDate);
    }
    
    if (filters.trainerId) {
      // Para asistencias, filtramos por quien registró la asistencia (recorded_by_id)
      params.append('recorded_by_id', filters.trainerId.toString());
    }
    
    if (filters.gymId) {
      params.append('gym_id', filters.gymId.toString());
    }

    const url = `${ATTENDANCE_ENDPOINTS.ATTENDANCE_ALL}daily/2025-08-16`;
    const res = await fetchWithAuth(url);

    if (!res.ok) {
      throw new Error(`Error HTTP ${res.status}`);
    }

    const data = await res.json();
    console.log("respuesta del servidor attendance range", data);
    return AttendanceListResponseSchema.parse(data);
  } catch (err) {
    console.error("getAttendanceInRange error:", err);
    throw err;
  }
}

// Obtener todos los datos de actividad de entrenadores
export async function getTrainersActivityData(filters: TrainersActivityFilters): Promise<TrainersActivityData> {
  try {
    console.log("Loading trainers activity data with filters:", filters);
    const [sales, userPlans, attendance] = await Promise.all([
      getSalesInRange(filters),
      getUserPlansInRange(filters),
      getAttendanceInRange(filters),
    ]);

    return {
      sales,
      userPlans,
      attendance,
    };
  } catch (err) {
    console.error("getTrainersActivityData error:", err);
    throw err;
  }
}

// Calcular resumen de actividad
export function calculateActivitySummary(data: TrainersActivityData): TrainersActivitySummary {
  const totalSales = data.sales.length;
  const totalPlans = data.userPlans.length;
  const totalAttendance = data.attendance.length;

  // Calcular ingresos totales (ventas de productos + planes)
  const salesRevenue = data.sales.reduce(
    (total, sale) => total + parseFloat(sale.totalAmount),
    0
  );
  
  const plansRevenue = data.userPlans.reduce(
    (total, userPlan) => total + parseFloat(userPlan.plan.price),
    0
  );
  
  const totalRevenue = salesRevenue + plansRevenue;

  return {
    totalSales,
    totalPlans,
    totalAttendance,
    totalRevenue
  };
}
