import ChartContainer from "@/components/ChartContainer";
import DogData from "@/components/DogData";
import Regression from "@/components/Regression";
import Homepage from "@/components/homepage";

export default function Home() {
    return (
        <main className="h-fit bg-white flex flex-col justify-center">
            <h1 className="mx-auto mt-10 text-white font-bold" style={{ backgroundColor: '#6d8ee3', padding: '20px 40px', borderRadius: '5px', textAlign: 'center', fontSize: '5rem' }}>
                PupPod Data Analysis
            </h1>

            <div className='flex flex-row justify-evenly py-10'>
                <Homepage />
            </div>
            <h1 className="mx-auto mt-10 text-black text-4xl font-bold">Compare dogs</h1>
            <div className='flex flex-row justify-evenly py-10'>
                <DogData />
                <DogData />
            </div>
            <hr className="w-1/2 mx-auto my-10" />
            <div className="bg-white text-black p-4 flex flex-col my-10 mx-4">
                <h1 className="mx-auto mb-10 text-black text-4xl font-bold">Plot dog data</h1>
                <ChartContainer />
            </div>
            <hr className="w-1/2 mx-auto mt-10" />
            <div className="h-full p-4">
                <Regression/>
            </div>
            <hr className="w-1/2 mx-auto mb-10" />

        </main>
    );
}