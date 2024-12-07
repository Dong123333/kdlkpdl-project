import Plot from "react-plotly.js";

function Chart(props) {
  const { rates } = props;
  const chartData = {
    x: rates.map((rate) => rate.created_at),
    y: rates.map((rate) => rate.rate),
    type: "scatter",
    mode: "lines",
    marker: { color: "red" },
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
  };
  return (
    <div>
      <Plot
        data={[chartData]}
        layout={layout}
        style={{ width: "100%", height: "450px" }}
      />
    </div>
  );
}

export default Chart;
