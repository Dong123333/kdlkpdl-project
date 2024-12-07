import Plot from "react-plotly.js";
import { useEffect, useState } from "react";

function HalfHourlyChart(props) {
  const { rates } = props;
  const [averagedData, setAveragedData] = useState([]);
  const calculateAverageRates = (data) => {
    let result = [];
    let currentGroup = [];
    let currentTime = new Date(data[0].created_at);
    data.forEach((item) => {
      let itemTime = new Date(item.created_at);
      let timeDifference = (itemTime - currentTime) / 1000 / 60;
      if (timeDifference < 30) {
        currentGroup.push(item.rate);
      } else {
        const averageRate =
          currentGroup.reduce((sum, rate) => sum + rate, 0) /
          currentGroup.length;
        result.push({
          rate: averageRate,
          created_at: currentTime.toISOString(),
        });
        currentTime = itemTime;
        currentGroup = [item.rate];
      }
    });
    if (currentGroup.length > 0) {
      const averageRate =
        currentGroup.reduce((sum, rate) => sum + rate, 0) / currentGroup.length;
      result.push({
        rate: averageRate,
        created_at: currentTime.toISOString(),
      });
    }
    return result;
  };

  useEffect(() => {
    if (rates.length >= 60) {
      const averaged = calculateAverageRates(rates);
      setAveragedData(averaged);
    }
  }, [rates]);

  const chartData = {
    x: averagedData.map((rate) => new Date(rate.created_at)),
    y: averagedData.map((rate) => rate.rate),
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

export default HalfHourlyChart;
