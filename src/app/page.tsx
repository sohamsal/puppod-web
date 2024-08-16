import ChartContainer from "@/components/ChartContainer";
import DogData from "@/components/DogData";




export default function Home() {
    return (
        <main className="bg-white flex flex-col justify-center">
            <h1 className="mx-auto mt-10 text-black text-4xl font-bold">Compare dogs</h1>
            <div className='flex flex-row justify-evenly py-10'>
                <DogData />
                <DogData />
            </div>
            <hr className="w-1/2 mx-auto my-10" />
            <div className="bg-white text-black p-4 m-4 flex flex-col">
                <h1 className="mx-auto mb-10 text-black text-4xl font-bold">Dog performance vs. Dog features data</h1>
                <ChartContainer />
            </div>
            <div className="my-4 p-4">
            </div>
        </main>
    );
}