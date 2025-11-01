import BookSessionForm from "@/components/session/BookSessionForm";
import { getUserByIdApi } from "@/services/user.service";
import { useGlobalContext } from "@/context/global.context";

export default async function BookSessionTeacherPage({ params }) {
  const teacherId = params.teacherId;
  let teacher = null;
  try {
    const res = await getUserByIdApi(teacherId);
    teacher = res.data; // <-- fix: use .data
  } catch {
    return <div className="p-8 text-red-600">Educator not found.</div>;
  }

  // Accept both "educator" and "teacher" as valid roles
  const isEducator = Array.isArray(teacher?.roles) && (teacher.roles.includes("educator") || teacher.roles.includes("teacher"));
  if (!isEducator) {
    return <div className="p-8 text-red-600">This user is not an educator.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <BookSessionForm teacher={teacher} />
    </div>
  );
}