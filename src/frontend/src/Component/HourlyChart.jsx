import Plot from "react-plotly.js";
import { useEffect, useState } from "react";

function HourlyChart(props) {
  const { rates } = props;
  const [hourlyData, setHourlyData] = useState([]);
  const calculateHourlyRates = (data) => {
    let result = [];
    let currentGroup = [];
    let currentTime = new Date(data[0].created_at).setMinutes(0, 0, 0);

    data.forEach((item) => {
      let itemTime = new Date(item.created_at).setMinutes(0, 0, 0);
      if (itemTime === currentTime) {
        currentGroup.push(item.rate);
      } else {
        if (currentGroup.length > 0) {
          const averageRate =
            currentGroup.reduce((sum, rate) => sum + rate, 0) /
            currentGroup.length;
          result.push({
            rate: averageRate,
            created_at: new Date(currentTime).toISOString(),
          });
        }
        currentTime = itemTime;
        currentGroup = [item.rate];
      }
    });
    if (currentGroup.length > 0) {
      const averageRate =
        currentGroup.reduce((sum, rate) => sum + rate, 0) / currentGroup.length;
      result.push({
        rate: averageRate,
        created_at: new Date(currentTime).toISOString(),
      });
    }
    return result;
  };
  useEffect(() => {
    if (rates.length >= 60) {
      const hourlyRates = calculateHourlyRates(rates);
      setHourlyData(hourlyRates);
    }
  }, [rates]);

  const chartData = {
    x: hourlyData.map((rate) => new Date(rate.created_at)),
    y: hourlyData.map((rate) => rate.rate),
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

export default HourlyChart;
