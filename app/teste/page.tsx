import dados from "./data.json";
import ListPhoto from "./listPhoto";

export default function Home() {
    return (
        <div className="container flex flex-col w-full h-screen bg-slate-300 mx-auto py-8 items-center">
            <h1 className="text-2xl font-bold mb-6">Relatório Fotográfico</h1>
            <ListPhoto
                initialPhotos={dados.photos}
            />
        </div>
    );
}