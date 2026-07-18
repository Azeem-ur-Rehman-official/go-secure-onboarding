interface Props {
  step: number;
}

export default function ProgressBar({ step }: Props) {
  return (
    <div className="flex justify-between mb-10">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className={`flex-1 mx-2 h-3 rounded-full ${
            item <= step ? "bg-blue-600" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}