import { useState } from "react";
import { useRateContext } from "../context/index.jsx";
import Chart from "../Component/Chart.jsx";
import HalfHourlyChart from "../Component/HalfHourlyChart.jsx";
import HourlyChart from "../Component/HourlyChart.jsx";
import PriceDisplay from "../Component/PriceDisplay.jsx";

function USDGBPPage() {
  const { ratesGBP } = useRateContext();
  const [chartType, setChartType] = useState("minute");
  const handleChangeChartType = (type) => {
    setChartType(type);
  };
  let changePercent = 0;
  let displayValueChange = "";
  let valueChange = 0.0;
  let isNegative = false;
  const newRate = ratesGBP[ratesGBP.length - 1]?.rate;
  const formattedNewRate = newRate !== undefined ? newRate.toFixed(4) : "N/A";
  if (ratesGBP.length >= 2) {
    const oldRate = ratesGBP[ratesGBP.length - 2]?.rate;
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
  return (
    <div className="px-[48px] py-[24px]">
      <h2 className="text-[24px] font-normal border-b-[1px] border-solid border-[#e8eaed] pb-2">
        Đô la Mỹ sang Bảng Anh
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
        {chartType === "minute" && <Chart rates={ratesGBP} />}
        {chartType === "thirty-minute" && <HalfHourlyChart rates={ratesGBP} />}
        {chartType === "hour" && <HourlyChart rates={ratesGBP} />}
      </div>
    </div>
  );
}
export default USDGBPPage;
