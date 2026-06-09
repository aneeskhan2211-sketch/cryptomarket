import { r as reactExports, j as jsxRuntimeExports } from "./index-CAwuyKvd.js";
function SparklineImpl({
  data,
  positive,
  width = 88,
  height = 32,
  strokeWidth = 1.5,
  showFill = true
}) {
  const gradientId = reactExports.useId();
  if (!data || data.length < 2) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        width,
        height,
        viewBox: `0 0 ${width} ${height}`,
        role: "img",
        "aria-label": "Keine Sparkline-Daten",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: 0,
            y1: height / 2,
            x2: width,
            y2: height / 2,
            stroke: "oklch(var(--muted-foreground) / 0.4)",
            strokeWidth: "1",
            strokeDasharray: "2 2"
          }
        )
      }
    );
  }
  let min = data[0];
  let max = data[0];
  for (const v of data) {
    if (v < min) min = v;
    if (v > max) max = v;
  }
  const range = max - min || 1;
  let line = "";
  let area = "";
  for (let i = 0; i < data.length; i++) {
    const x = i / (data.length - 1) * width;
    const y = height - (data[i] - min) / range * (height - 2) - 1;
    line += i === 0 ? `M${x.toFixed(2)},${y.toFixed(2)}` : ` L${x.toFixed(2)},${y.toFixed(2)}`;
  }
  area = `${line} L${width},${height} L0,${height} Z`;
  const stroke = positive ? "oklch(var(--price-up))" : "oklch(var(--price-down))";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width,
      height,
      viewBox: `0 0 ${width} ${height}`,
      className: "overflow-visible",
      role: "img",
      "aria-label": positive ? "Aufwärtstrend" : "Abwärtstrend",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: gradientId, x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: stroke, stopOpacity: "0.35" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: stroke, stopOpacity: "0" })
        ] }) }),
        showFill && /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: area, fill: `url(#${gradientId})` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: line,
            fill: "none",
            stroke,
            strokeWidth,
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ]
    }
  );
}
const Sparkline = reactExports.memo(SparklineImpl);
export {
  Sparkline as S
};
