import Login from "@/components/student/stuAuth/login";

export default function Page() {   
   return (
       <div className="flex flex-col justify-center items-center h-full">  
         <h1 className="text-3xl font-bold text-gray-700 text-center my-4">Login Page</h1>

         <Login/>

         </div>
   );
}