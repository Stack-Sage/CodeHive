import Register from "@/components/student/stuAuth/register";

export default function Page() {   
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-700 text-center my-4 px-4 sm:px-0">
        Register Page
      </h1>

      <Register />
    </div>
  );
}
