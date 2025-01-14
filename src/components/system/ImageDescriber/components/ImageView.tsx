/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui";
import { RotateCcw } from "lucide-react";
import { useTransition } from "react";

export type ImageViewProps = {
  imageURL: string;
  fetchRandomImage: () => void;
  unsplashError: string | null;
};

export default function ImageView(props: ImageViewProps) {
  const { imageURL, fetchRandomImage, unsplashError } = props;
  const [isPending, startTransition] = useTransition();

  const handleGetImage = async () => {
    startTransition(async () => {
      if (typeof fetchRandomImage === "function") {
        await fetchRandomImage();
      }
    });
  };

  return (
    <div className="flex flex-col gap-4 items-center ">
      <img
        src={imageURL as string}
        alt="Random image from unsplash"
        className="rounded-lg min-h-[400px] min-w-[500px] max-h-[500px] h-full max-w-[500px] w-full"
      />
      <Button
        type="button"
        variant="ghost"
        disabled={isPending}
        onClick={handleGetImage}
      >
        <RotateCcw />
      </Button>
      {unsplashError && (
        <div className="bg-gray-50 rounded-sm p-4 text-center border-l-4  border-red-400 ">
          {unsplashError}
        </div>
      )}
    </div>
  );
}
