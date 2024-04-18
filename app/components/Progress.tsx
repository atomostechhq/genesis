export type ProgressBarProps = {
  progress: number;
  progressText?: string;
  progressColor: string;
};

const ProgressBar = ({
  progress,
  progressText = "",
  progressColor,
}: ProgressBarProps) => {
  const _progress = Math.min(Math.max(0, progress), 100);
  return (
    <div className=" rounded">
      <div className="w-full h-2 rounded bg-gray-200" role="progressbar" aria-valuenow={_progress} aria-valuemin={0} aria-valuemax={100}>
        <div
          className={`${progressColor} h-full transition-all duration-250 rounded`}
          style={{ width: `${_progress}%` }}
        ></div>
      </div>
      <span className="flex justify-end text-gray-700 text-text-sm">
        {progressText}
      </span>
    </div>
  );
};

export default ProgressBar;