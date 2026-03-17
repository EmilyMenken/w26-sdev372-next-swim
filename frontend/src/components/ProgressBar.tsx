interface Props {
  current: number;
  total: number;
}

export default function QuizProgress({ current, total }: Props) {

  const percent = Math.round((current / total) * 100);

  return (
    <div className="quiz-progress">

      <div className="quiz-progress-bar">
        <div
          className="quiz-progress-fill"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="quiz-progress-text">
        {current} / {total} Questions
      </p>

    </div>
  );
}