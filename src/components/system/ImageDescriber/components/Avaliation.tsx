export type AvaliationProps = {
  score: number;
  recommendation: string;
  words: string[];
  error: string | null;
};

export default function Avaliation(props: AvaliationProps) {
  const { score, recommendation, words, error } = props;
  console.log("props", error);

  if (error) {
    return (
      <div className="bg-gray-50 rounded-sm p-4 text-center my-10 border-l-4 border-red-400">
        <p className="text-left">{error}</p>
      </div>
    );
  }

  if (!score || !recommendation) return null;

  const getClassNames = (score: number) => {
    if (score < 30) {
      return "border-red-400";
    } else if (score < 60) {
      return "border-yellow-400";
    } else {
      return "border-green-400";
    }
  };

  return (
    <div
      className={`bg-gray-50 rounded-sm p-4 text-center my-10 border-l-4 ${getClassNames(
        score
      )}`}
    >
      <p className="text-left">
        <strong>Nota: {score}/100</strong>
      </p>
      <p className="text-justify">{recommendation}</p>

      <div className="text-left w-full flex flex-col my-4">
        <p className="w-full">
          <strong>Palavras sugeridas:</strong>
        </p>
        <div className="w-full flex flex-wrap gap-1 py-2">
          {words.map((word) => (
            <span
              key={word}
              className="text-xs px-2 py-1 mx-1 bg-gray-200 rounded-md"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
