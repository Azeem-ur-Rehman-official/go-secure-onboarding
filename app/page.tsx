import EmployeeForm from "@/components/EmployeeForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center  font-sans bg-[#09111F]">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-0 sm:py-10 px-2 sm:px-16 bg-[#09111F] sm:items-start">
       
      <EmployeeForm/>
        
      </main>
    </div>
  );
}
