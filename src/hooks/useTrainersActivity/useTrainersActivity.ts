import { useState, useEffect, useCallback } from "react";
import {
  TrainersActivityFilters,
  TrainersActivityData,
  TrainersActivitySummary,
  getTrainersActivityData,
  calculateActivitySummary,
} from "@/services/trainersActivityService";
import { getColombiaCurrentDateYMD } from "@/utils/formatDate";

export function useTrainersActivity() {
  const [data, setData] = useState<TrainersActivityData>({
    sales: [],
    userPlans: [],
    attendance: [],
    newUsers: [],
  });
  
  const [summary, setSummary] = useState<TrainersActivitySummary>({
    totalSales: 0,
    totalPlans: 0,
    totalAttendance: 0,
    totalNewUsers: 0,
    totalRevenue: 0,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Filtros por defecto: fecha actual
  const [filters, setFilters] = useState<TrainersActivityFilters>(() => {
    const today = getColombiaCurrentDateYMD();
    return {
      startDate: today,
      endDate: today,
      trainerId: undefined,
      gymId: undefined,
    };
  });

  const loadActivityData = useCallback(async (customFilters?: TrainersActivityFilters) => {
    setLoading(true);
    setError(null);
    
    try {
      const filtersToUse = customFilters || filters;
      const activityData = await getTrainersActivityData(filtersToUse);
      const activitySummary = calculateActivitySummary(activityData);
      
      setData(activityData);
      setSummary(activitySummary);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al cargar datos de actividad";
      setError(errorMessage);
      console.error("Error loading trainers activity data:", err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const updateFilters = useCallback((newFilters: Partial<TrainersActivityFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    const today = getColombiaCurrentDateYMD();
    setFilters({
      startDate: today,
      endDate: today,
      trainerId: undefined,
      gymId: undefined,
    });
  }, []);

  const applyFilters = useCallback(() => {
    loadActivityData(filters);
  }, [filters, loadActivityData]);

  // Cargar datos iniciales
  useEffect(() => {
    loadActivityData();
  }, []);

  return {
    data,
    summary,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    applyFilters,
    loadActivityData,
  };
}
