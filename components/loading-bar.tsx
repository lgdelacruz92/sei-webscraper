export default function LoadingBar({
  progress,
  description,
}: {
  progress: number;
  description: string;
}) {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <svg width="400" height="50" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="0"
        y="0"
        width="100%"
        height="20"
        fill="#ddd"
        rx="5"
        ry="5"
      ></rect>

      <rect
        x="0"
        y="0"
        width={`${clampedProgress}%`} // Use the progress value to set the width
        height="20"
        fill="#4caf50"
        rx="5"
        ry="5"
      ></rect>

      <text
        x="50%"
        y="15"
        font-family="Arial"
        font-size="14"
        fill="#000"
        text-anchor="middle"
        alignment-baseline="middle"
      >
        <tspan id="percentage">{description}</tspan>
        <animate
          attributeName="fill-opacity"
          from="0"
          to="1"
          dur="0.5s"
          begin="0s"
        />
      </text>
    </svg>
  );
}
