import Plot from "react-plotly.js";

function PredictedValueChart(props) {
  const { rates, predictedValue } = props;
  const chartData = {
    x: rates.map((rate) => rate.created_at),
    y: rates.map((rate) => rate.rate),
    type: "scatter",
    mode: "lines",
    name: "Rate",
    marker: { color: "red" },
  };

  const predictedPoint = {
    x: [
      rates[rates.length - 1]?.created_at
        ? new Date(
            new Date(rates[rates.length - 1]?.created_at).getTime() + 3600000
          )
        : new Date(),
    ],
    y: [predictedValue],
    type: "scatter",
    mode: "markers",
    name: "Predicted Value",
    marker: { color: "blue", size: 8 },
  };

  const layout = {
    xaxis: {
      title: "",
      type: "date",
      tickformat: "%H:%M",
    },
    yaxis: {
      title: "",
    },
    legend: {
      orientation: "h",
      x: 0.5,
      xanchor: "center",
    },
  };

  return (
    <div>
      <Plot
        data={[chartData, predictedPoint]}
        layout={layout}
        style={{ width: "100%", height: "450px" }}
      />
    </div>
  );
}

export default PredictedValueChart;
