import UserDetailView from "@/views/userDetailView";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const userId = parseInt(id);
  return <UserDetailView userId={userId} />;
}
