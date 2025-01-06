"use client";

import type { Photo } from "@/components/teste/PhotoGrid";
import { PhotoGrid } from "@/components/teste/PhotoGrid";
import dados from "./data.json";

export default function Photos() {
    const handleOrderChange = async (newOrder: Photo[]) => {
        try {
            // Aqui você implementa a chamada à sua API para salvar a nova ordem
            const response = await fetch("/api/photos/reorder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ newOrder }),
            });

            if (response.ok) {
                console.log("Ordem das fotos atualizada com sucesso");
            }

            if (!response.ok) {
                throw new Error("Falha ao atualizar a ordem das fotos");
            }
        } catch (error) {
            console.error("Erro ao salvar a nova ordem:", error);
            // Aqui você pode implementar uma notificação de erro para o usuário
        }
    };

    return (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <PhotoGrid
                initialPhotos={dados.photos}
                onOrderChange={handleOrderChange}
            />
        </div>
    );
}