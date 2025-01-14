"use client";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import Avaliation from "./components/Avaliation";
import useRandomImage from "@/app/hooks/useRandomImage";
import useGPTAvaliation from "@/app/hooks/useGPTAvaliation";
import { RingLoader } from "react-spinners";
import ImageView from "./components/ImageView";

export default function ImageDescriber() {
  const [isPending, startTransition] = useTransition();
  const [disable, setDisable] = useState(false);
  const [description, setDescription] = useState("");
  const [isDone, setIsDone] = useState(false);
  const { imageURL, fetchRandomImage, error: unsplashError } = useRandomImage();
  const {
    avaliation,
    score,
    fetchAvaliation,
    words,
    error: gptError,
    clearAvaliation,
  } = useGPTAvaliation();

  const handleAvaliation = async () => {
    startTransition(async () => {
      await fetchAvaliation(description);
      setDisable(true);
      setIsDone(true);
    });
  };

  const handleNewAvaliation = async () => {
    startTransition(async () => {
      setDisable(false);
      setIsDone(false);
      setDescription("");
      clearAvaliation();
      await fetchRandomImage();
    });
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full p-4">
      <div className="flex w-full  gap-4 items-start min-h-[250px] h-full justify-start ">
        <ImageView
          imageURL={imageURL}
          fetchRandomImage={fetchRandomImage}
          unsplashError={unsplashError}
        />
        {imageURL && (
          <form className="w-full max-w-xl flex flex-col h-full ">
            <div>
              <Textarea
                value={description}
                className="resize-none h-28"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva a imagem"
                maxLength={280}
              />
              <p className="text-right text-gray-400">
                <small>{description.length}/280</small>
              </p>
            </div>
            <Avaliation
              score={score}
              recommendation={avaliation}
              words={words}
              error={gptError}
            />
            <div className="flex justify-center items-center my-4">
              {isDone ? (
                <Button
                  type="button"
                  className="max-w-[550px] w-full bg-[#36d7b7] hover:bg-[#2cbba6] text-white"
                  onClick={handleNewAvaliation}
                >
                  Nova Avaliação
                </Button>
              ) : (
                <Button
                  type="button"
                  className="max-w-[550px] w-full bg-[#36d7b7] hover:bg-[#2cbba6] text-white"
                  onClick={handleAvaliation}
                  disabled={isPending || disable}
                >
                  {isPending ? (
                    <RingLoader color="#fff" size={24} />
                  ) : (
                    "Avaliar"
                  )}
                </Button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
