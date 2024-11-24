import { Icon } from "@iconify/react";

function PriceDisplay({ price, changePercent, changeValue, isNegative }) {
  return (
    <div className="flex items-center">
      <p className="text-[36px] font-medium mr-4">{price}</p>
      <div
        className={`px-2 ${
          isNegative ? "bg-[#fce8e6]" : "bg-[#e6f4ea]"
        } min-w-[40px] rounded-[8px] h-[32px] flex items-center justify-center mr-2`}
      >
        <div
          className={`flex items-center text-[16px] ${
            isNegative ? "text-[#a50e0e]" : "text-[#137333]"
          }`}
        >
          <Icon icon={isNegative ? "ri:arrow-down-line" : "ri:arrow-up-line"} />
          <p className="font-medium">{changePercent}%</p>
        </div>
      </div>
      <div
        className={`flex items-center ${
          isNegative ? "text-[#a50e0e]" : "text-[#137333]"
        } text-[16px] font-medium`}
      >
        <p>{changeValue}</p>
        <p className="pl-1">Hôm nay</p>
      </div>
    </div>
  );
}

export default PriceDisplay;
