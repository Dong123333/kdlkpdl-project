import { useState, useEffect } from "react";
import axios from "axios";
import { useRateContext } from "../context/index.jsx";
import Chart from "../Component/Chart.jsx";
import HalfHourlyChart from "../Component/HalfHourlyChart.jsx";
import HourlyChart from "../Component/HourlyChart.jsx";
import PredictedValueChart from "../Component/PredictedValueChart.jsx";
import PriceDisplay from "../Component/PriceDisplay.jsx";

function USDJPYPage() {
  const { ratesJPY } = useRateContext();
  const [chartType, setChartType] = useState("minute");
  const [predictedValue, setPredictedValue] = useState({});
  const handleChangeChartType = (type) => {
    setChartType(type);
  };
  const formattedPredictedValue = predictedValue.predicted_rate_next_hour
    ? predictedValue.predicted_rate_next_hour.toFixed(5)
    : "NA";
  let changePercent = 0;
  let displayValueChange = "";
  let valueChange = 0.0;
  let isNegative = false;
  const newRate = ratesJPY[ratesJPY.length - 1]?.rate;
  const formattedNewRate = newRate !== undefined ? newRate.toFixed(4) : "N/A";
  if (ratesJPY.length >= 2) {
    const oldRate = ratesJPY[ratesJPY.length - 2]?.rate;
    changePercent = ((newRate - oldRate) / oldRate) * 100;
    valueChange = newRate - oldRate;
    displayValueChange =
      valueChange > 0
        ? `+${valueChange.toFixed(5)}`
        : `${valueChange.toFixed(5)}`;
    isNegative = changePercent < 0;
  } else {
    displayValueChange = valueChange.toFixed(5);
  }

  const fetchPredictedValue = async () => {
    try {
      const response = await axios.get("http://localhost:8001/api/predict");
      setPredictedValue(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchPredictedValue();
    const intervalIdJPY = setInterval(fetchPredictedValue(), 60000);

    return () => {
      clearInterval(intervalIdJPY);
    };
  }, []);

  return (
    <div className="px-[48px] py-[24px]">
      <h2 className="text-[24px] font-normal border-b-[1px] border-solid border-[#e8eaed] pb-2">
        Đô la Mỹ sang Yên Nhật
      </h2>
      <div>
        <PriceDisplay
          price={formattedNewRate}
          changePercent={changePercent.toFixed(5)}
          changeValue={displayValueChange}
          isNegative={isNegative}
        />
        <div className="flex items-center gap-x-10 my-2 ml-4">
          <button
            onClick={() => handleChangeChartType("minute")}
            className="hover:bg-[#f1f3f4] h-[32px] w-[120px]"
            style={{
              color: chartType === "minute" ? "blue" : "#000",
              borderBottom: chartType === "minute" ? "2px solid blue" : "none",
            }}
          >
            1 phút
          </button>
          <button
            onClick={() => handleChangeChartType("thirty-minute")}
            className="hover:bg-[#f1f3f4] h-[32px] w-[120px]"
            style={{
              color: chartType === "thirty-minute" ? "blue" : "#000",
              borderBottom:
                chartType === "thirty-minute" ? "2px solid blue" : "none",
            }}
          >
            30 phút
          </button>
          <button
            onClick={() => handleChangeChartType("hour")}
            className="hover:bg-[#f1f3f4] h-[32px] w-[120px] "
            style={{
              color: chartType === "hour" ? "blue" : "#000",
              borderBottom: chartType === "hour" ? "2px solid blue" : "none",
            }}
          >
            1 giờ
          </button>
        </div>
        {chartType === "minute" && <Chart rates={ratesJPY} />}
        {chartType === "thirty-minute" && <HalfHourlyChart rates={ratesJPY} />}
        {chartType === "hour" && <HourlyChart rates={ratesJPY} />}
        <div className="border-t-[1px] border-solid border-[#000]">
          <div className="flex items-center justify-center mt-6">
            <p className="text-[20px] font-bold pr-2">Dự đoán (sau 1 tiếng):</p>
            <p className="text-[18px] font-medium leading-4">
              {formattedPredictedValue}
            </p>
          </div>
          <PredictedValueChart
            rates={ratesJPY}
            predictedValue={formattedPredictedValue}
          />
        </div>
      </div>
    </div>
  );
}
export default USDJPYPage;
