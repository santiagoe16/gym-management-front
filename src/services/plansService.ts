import Plan from "@/types/plan";

export async function getPlansService(): Promise<Plan[]> {
  const res = await fetch("/mocks/plans.json");
  if (!res.ok) throw new Error("Error al obtener planes");
  return res.json();
}
