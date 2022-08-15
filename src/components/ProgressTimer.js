import React from "react";

// The ProgressTimer component renders an svg circle of a given color.
// The amount of color filling the circle will change depending on what
// percentage of a task is left to complete.

const ProgressTimer = ({ percentage, colour }) => {
  const cleanPercentage = ({ percentage }) => {
    const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0; // we can set non-numbers to 0 here
    const isTooHigh = percentage > 100;
    return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
  };

  const Circle = ({ colour, percentage }) => {
    const r = 100;
    const circ = 2 * Math.PI * r;
    const strokePct = (percentage * circ) / 100; // where stroke will start, e.g. from 15% to 100%.
    return (
      <circle
        r={r}
        cx={50}
        cy={150}
        fill="transparent"
        stroke={strokePct !== circ ? colour : ""} // remove colour as 0% sets full circumference
        strokeWidth={"3.5rem"}
        strokeDasharray={circ}
        strokeDashoffset={percentage ? strokePct : 0}
        // strokeLinecap="round"
      ></circle>
    );
  };

  // const Text = ({ percentage }) => {
  //   return (
  //     <text
  //       x="50%"
  //       y="50%"
  //       dominantBaseline="central"
  //       textAnchor="middle"
  //       fontSize={"1.5em"}
  //     >
  //       {percentage.toFixed(0)}%
  //     </text>
  //   );
  // };

  const pct = cleanPercentage({ percentage });
  return (
    <svg width={300} height={300}>
      <g transform={`rotate(-90 ${"100 100"})`}>
        <Circle colour="lightgrey" />
        <Circle colour={colour} percentage={pct} />
      </g>
      {/* <Text percentage={pct} /> */}
    </svg>
  );
};

export default ProgressTimer;
