import { useEffect, useState } from "react";
import { createApi } from "unsplash-js";

export default function useRandomImage() {
  const [imageURL, setImageURL] = useState<string>("/");
  const [error, setError] = useState<string | null>(null);

  const unsplash = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY as string,
  });

  const fetchRandomImage = async () => {
    unsplash.photos
      .getRandom({})
      .then((result) => {
        if (result.errors) {
          setImageURL("");
          console.error("error occurred: ", result.errors[0]);
        } else {
          console.log(result.response);
          const url = Array.isArray(result.response)
            ? result.response[0]?.urls?.regular
            : result.response?.urls?.regular;
          setImageURL(url);
          setError(null);
        }
      })
      .catch((error) => {
        setImageURL("");
        setError(
          "Erro ao conectar com Unsplash, você pode ter atingido o limite de imagens, tente novamente em 1 hora."
        );
        console.error("error occurred: ", error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchRandomImage();
    };
    fetchData();
  }, []);

  return { imageURL, fetchRandomImage, error };
}
