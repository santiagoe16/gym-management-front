import UserDetailView from "@/views/userDetailView";

export default function Page({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  return <UserDetailView userId={id} />;
}