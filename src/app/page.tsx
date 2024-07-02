
import DogData from "@/components/DogData";
import GameSessionData from "@/components/GameSessionData";
import Image from "next/image";
import Papa from "papaparse";



export default function Home() {
    return (
        <main>
            <GameSessionData/>
            {/* <DogData/> */}
        </main>
    );
}
