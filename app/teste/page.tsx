'use client';
import { useState } from "react";
import type { FileWithPath } from 'react-dropzone';
import { useDropzone } from "react-dropzone";

interface ImageProcessingProps {
    width?: number;
    height?: number;
    quality?: number;
}

export default function ImageUploader() {
    const [processedImage, setProcessedImage] = useState<string | null>(null);

    const processImage = (
        image: HTMLImageElement,
        { width = 400, height = 300, quality = 0.8 }: ImageProcessingProps = {}
    ): string => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = width || image.width;
        canvas.height = height || image.height;

        ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL("image/jpeg", quality);
    };

    const onDrop = (acceptedFiles: FileWithPath[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            const image = new Image();
            image.onload = () => {
                const resizedImage = processImage(image);
                setProcessedImage(resizedImage);
            };
            image.src = e.target?.result as string;
        };

        reader.readAsDataURL(file);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif']
        },
        maxFiles: 1
    });

    return (
        <div className="font-sans text-center p-5 w-full flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold mb-6">Upload e Redimensionamento de Imagem</h1>

            <div
                {...getRootProps()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-5 cursor-pointer
                          hover:border-gray-400 transition-colors w-[600px] h-[600px] flex flex-col justify-center items-center"
            >
                <input {...getInputProps()} />
                <p>Arraste e solte sua imagem aqui, ou clique para selecionar</p>


                {processedImage && (
                    <div className="mt-5">
                        <img
                            src={processedImage}
                            alt="Imagem processada"
                            className="border border-gray-200 rounded-lg mx-auto"
                        />
                        <h2 className="text-xl font-semibold mb-3">Imagem Processada</h2>
                    </div>
                )}

            </div>
        </div>
    );
}
