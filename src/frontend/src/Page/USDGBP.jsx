import Chart from "../Component/Chart.jsx";
import PriceDisplay from "../Component/PriceDisplay.jsx";
import { useRateContext } from "../context/index.jsx";

function USDGBPPage() {
  const { ratesGBP } = useRateContext();

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
        <Chart rates={ratesGBP} />
      </div>
    </div>
  );
}
export default USDGBPPage;
