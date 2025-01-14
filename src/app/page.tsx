"use client";

import { ImageDescriber } from "@/components/system";
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-star  w-full">
        <h1 className="text-4xl text-center w-full">
          Treine seu inglês descrevendo o que vê nas imagens
        </h1>
        <h6 className="w-full text-center text-xl text-[#36d7b7]">
          Correção feit por IA com GPT-4o-mini
        </h6>
        <ImageDescriber />
      </main>
    </div>
  );
}
