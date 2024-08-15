import ChartContainer from "@/components/ChartContainer";
import DogData from "@/components/DogData";
import Image from "next/image";
import Papa from "papaparse";



export default function Home() {
    return (
        <main>
            <div className='flex flex-col justify-center bg-[#FAFAFA]'>
                <div className='flex flex-row justify-evenly'>
                    <DogData />
                    <DogData />
                </div>
            </div>
            <div className="bg-white text-black p-4 m-4">
                <ChartContainer />
            </div>

        </main>
    );
}