import Link from "next/link";
import { Github } from "lucide-react";
import HeartDiseaseAssessment from "./_components/HeartDiseaseAssessment";

export default function Home() {
  return (
    <div className="flex w-screen min-h-screen items-center justify-center">
      <Link href="https://github.com/Aniket11007/Heart_Disease_prediction-WebApp" target='_blank' className="absolute top-0 right-0 p-3 sm:p-5 bg-white/30 rounded-full m-4 hover:scale-105 transform transition-all duration-300 ease-in-out">
        <div className='flex flex-col items-center space-x-2'>
          <Github className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </Link>
      <HeartDiseaseAssessment />
    </div>
  );
}
