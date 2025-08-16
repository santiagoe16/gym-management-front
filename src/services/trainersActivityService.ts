import { Attendance, Sale, UserPlan } from "@/types/activity";
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
  newUsers: User[];
}

export interface TrainersActivitySummary {
  totalSales: number;
  totalPlans: number;
  totalAttendance: number;
  totalNewUsers: number;
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

    const url = `${ATTENDANCE_ENDPOINTS.ATTENDANCE_ALL}?${params.toString()}`;
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

// Obtener usuarios nuevos con filtros de rango de fechas
export async function getNewUsersInRange(filters: TrainersActivityFilters): Promise<User[]> {
  try {
    const params = new URLSearchParams();
    
    if (filters.startDate) {
      const utcStartDate = colombiaDateStringToUTC(filters.startDate);
      params.append('created_start', utcStartDate);
    }
    
    if (filters.endDate) {
      const utcEndDate = colombiaDateStringToUTC(filters.endDate);
      params.append('created_end', utcEndDate);
    }
    
    if (filters.trainerId) {
      params.append('trainer_id', filters.trainerId.toString());
    }
    
    if (filters.gymId) {
      params.append('gym_id', filters.gymId.toString());
    }

    const url = `${USER_ENDPOINTS.USERS_ALL}?${params.toString()}`;
    const res = await fetchWithAuth(url);

    if (!res.ok) {
      throw new Error(`Error HTTP ${res.status}`);
    }

    const data = await res.json();
    console.log("respuesta del servidor new users range", data);
    return UserListResponseSchema.parse(data);
  } catch (err) {
    console.error("getNewUsersInRange error:", err);
    throw err;
  }
}

// Obtener todos los datos de actividad de entrenadores
export async function getTrainersActivityData(filters: TrainersActivityFilters): Promise<TrainersActivityData> {
  try {
    const [sales, userPlans, attendance, newUsers] = await Promise.all([
      getSalesInRange(filters),
      getUserPlansInRange(filters),
      getAttendanceInRange(filters),
      getNewUsersInRange(filters)
    ]);

    return {
      sales,
      userPlans,
      attendance,
      newUsers
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
  const totalNewUsers = data.newUsers.length;

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
    totalNewUsers,
    totalRevenue
  };
}
