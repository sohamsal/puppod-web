import DogData from "@/components/DogData";
import Image from "next/image";
import Papa from "papaparse";



export default function Home() {
    return (
        <main>
            <div className='flex flex-col justify-center h-screen bg-[#FAFAFA]'>
                <div className='flex flex-row justify-evenly'>
                    <DogData/>
                    <DogData/>
                </div>
            </div>
        </main>
    );
}
