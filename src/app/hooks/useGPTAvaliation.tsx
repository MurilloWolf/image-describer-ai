import OpenAI from "openai";
import { useState } from "react";

// const mockResponse = {
//   words: [
//     "robot",
//     "painting",
//     "dark",
//     "head",
//     "behind",
//     "finished",
//     "lot",
//     "glass",
//     "pencils",
//     "around",
//   ],
//   tip: `Tente usar a concordância correta entre singular e plural. Por exemplo, use 'it has' em vez de 'they are' e 'a lot' em vez de 'lote'. Isso tornará sua frase mais clara.`,
//   score: 70,
// };

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_GPT_ACCESS_KEY as string,
  dangerouslyAllowBrowser: true,
});

const prompt = `Act like a native american correcting a text of someone who is starting to learn English, I want you to analyze grammar too and return me in a json a score for the text, from 0 to 100, a tip to improve the text said (with a maximum of 280 char), and words that could your used, the json keys must be score, tip, words, i need the tip to be in portuguese pt-br, the words in english, and the score in a number. Be strict with corrections, as if it were a test for English proficiency`;

export type GPTResponse = {
  score: number;
  tip: string;
  words: string[];
};

export default function useGPTAvaliation() {
  const [avaliation, setAvaliation] = useState("");
  const [score, setScore] = useState(0);
  const [words, setWords] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const clearAvaliation = () => {
    setAvaliation("");
    setScore(0);
    setWords([]);
    setError(null);
  };
  const fetchAvaliation = async (description: string) => {
    setError(null);
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: prompt },
          {
            role: "user",
            content: description,
          },
        ],
      });
      const response = completion.choices[0].message.content;

      const { score, tip, words } = JSON.parse(
        response as string
      ) as GPTResponse;

      setScore(score);
      setAvaliation(tip);
      setWords(words);
    } catch (err) {
      console.error(err);
      setError("Erro ao conectar com ChatGPT");
    }
  };

  return { avaliation, score, words, fetchAvaliation, error, clearAvaliation };
}
