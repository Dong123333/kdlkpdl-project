import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useRateContext } from "../context/index.jsx";

function HomePage({ children }) {
  const navigate = useNavigate();
  const { ratesJPY, ratesGBP, ratesEUR } = useRateContext();

  //JPY
  let displayValueChangeJPY = "";
  let displayChangePercentJPY = "";
  let valueChangeJPY = 0.0;
  let changePercentJPY = 0.0;
  let isNegativeJPY = false;
  const newRateJPY = ratesJPY[ratesJPY.length - 1]?.rate;
  const formattedNewRateJPY =
    newRateJPY !== undefined ? newRateJPY.toFixed(4) : "N/A";
  if (ratesJPY.length >= 2) {
    const oldRateJPY = ratesJPY[ratesJPY.length - 2]?.rate;
    changePercentJPY = ((newRateJPY - oldRateJPY) / oldRateJPY) * 100;
    displayChangePercentJPY =
      changePercentJPY > 0
        ? `+${changePercentJPY.toFixed(5)}%`
        : `${changePercentJPY.toFixed(5)}%`;
    valueChangeJPY = newRateJPY - oldRateJPY;
    displayValueChangeJPY =
      valueChangeJPY > 0
        ? `+${valueChangeJPY.toFixed(5)}`
        : `${valueChangeJPY.toFixed(5)}`;
    isNegativeJPY = changePercentJPY < 0;
  } else {
    displayChangePercentJPY = `${changePercentJPY.toFixed(5)}%`;
    displayValueChangeJPY = valueChangeJPY.toFixed(5);
  }

  //GBP
  let displayValueChangeGBP = "";
  let displayChangePercentGBP = "";
  let changePercentGBP = 0.0;
  let valueChangeGBP = 0.0;
  let isNegativeGBP = false;
  const newRateGBP = ratesGBP[ratesGBP.length - 1]?.rate;
  const formattedNewRateGBP =
    newRateGBP !== undefined ? newRateGBP.toFixed(4) : "N/A";
  if (ratesGBP.length >= 2) {
    const oldRateGBP = ratesGBP[ratesGBP.length - 2]?.rate;
    changePercentGBP = ((newRateGBP - oldRateGBP) / oldRateGBP) * 100;
    displayChangePercentGBP =
      changePercentGBP > 0
        ? `+${changePercentGBP.toFixed(5)}%`
        : `${changePercentGBP.toFixed(5)}%`;
    valueChangeGBP = newRateGBP - oldRateGBP;
    displayValueChangeGBP =
      valueChangeGBP > 0
        ? `+${valueChangeGBP.toFixed(5)}`
        : `${valueChangeGBP.toFixed(5)}`;
    isNegativeGBP = changePercentGBP < 0;
  } else {
    displayChangePercentGBP = `${changePercentGBP.toFixed(5)}%`;
    displayValueChangeGBP = valueChangeGBP.toFixed(5);
  }

  //EUR
  let displayValueChangeEUR = "";
  let displayChangePercentEUR = "";
  let changePercentEUR = 0.0;
  let valueChangeEUR = 0.0;
  let isNegativeEUR = false;
  const newRateEUR = ratesEUR[ratesEUR.length - 1]?.rate;
  const formattedNewRateEUR =
    newRateEUR !== undefined ? newRateEUR.toFixed(4) : "N/A";
  if (ratesEUR.length >= 2) {
    const oldRateEUR = ratesEUR[ratesEUR.length - 2]?.rate;
    changePercentEUR = ((newRateEUR - oldRateEUR) / oldRateEUR) * 100;
    displayChangePercentEUR =
      changePercentEUR > 0
        ? `+${changePercentEUR.toFixed(5)}%`
        : `${changePercentEUR.toFixed(5)}%`;
    valueChangeEUR = newRateEUR - oldRateEUR;
    displayValueChangeEUR =
      valueChangeEUR > 0
        ? `+${valueChangeEUR.toFixed(5)}`
        : `${valueChangeEUR.toFixed(5)}`;
    isNegativeEUR = changePercentEUR < 0;
  } else {
    displayChangePercentEUR = `${changePercentEUR.toFixed(5)}%`;
    displayValueChangeEUR = valueChangeEUR.toFixed(5);
  }

  const handleActiveJPYPage = () => {
    navigate("/USD-JPY");
  };
  const handleActiveGBPPage = () => {
    navigate("/USD-GBP");
  };
  const handleActiveEURPage = () => {
    navigate("/USD-EUR");
  };

  return (
    <>
      <div className="h-[64px] w-full fixed top-0 left-0 right-0">
        <div className="flex items-center justify-between h-full p-2">
          <div className="flex items-center pr-[30px]">
            <div className="p-3 mx-1 text-black">
              <Icon className="text-[24px]" icon="material-symbols:menu" />
            </div>

            <h1 className="text-[22px] text-[#5f6368]">Tài chính</h1>
          </div>
          <div>
            <div className="w-[740px] h-[48px] bg-[#f1f3f4] flex items-center rounded-[6px]">
              <div className="px-[5px] cursor-pointer">
                <div className="p-2 m-[3px]">
                  <Icon className="text-[17px]" icon="tdesign:search" />
                </div>
              </div>
              <input
                className="flex-1 bg-transparent border-none outline-none"
                type="text"
                placeholder="Tìm tỷ giá hối đoái"
              />
            </div>
          </div>
          <div className=" pl-[30px]">
            <div className="flex items-center">
              <div className="h-[48px] w-[48px] flex items-center justify-center">
                <Icon
                  className="text-[24px]"
                  icon="icon-park-outline:application-menu"
                />
              </div>
              <div className="h-[48px] w-[48px] flex items-center justify-center">
                <img
                  className="h-[32px] rounded-[100%]"
                  src="https://placehold.co/400x400"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[96px] mt-[64px] bg-[#f8f9fa]">
        <div className="mx-[200px]">
          <div className="px-[48px] pt-[34px] pb-[12px] flex items-center justify-center gap-x-4">
            <div
              onClick={handleActiveJPYPage}
              className="bg-white border-[1px] border-solid border-[#dadce0] mr-[8px] rounded-[8px] cursor-pointer"
            >
              <div className="p-[6px] flex items-center">
                <div
                  className={`flex items-center justify-center text-[16px] mr-2 h-[32px] w-[32px] rounded-[8px]  ${
                    isNegativeJPY
                      ? "text-[#a50e0e] bg-[#fce8e6]"
                      : "text-[#137333] bg-[#e6f4ea]"
                  }`}
                >
                  <Icon
                    icon={
                      isNegativeJPY ? "ri:arrow-down-line" : "ri:arrow-up-line"
                    }
                  />
                </div>
                <div className="mr-2">
                  <p className="text-[#202124] text-[12px] font-bold">
                    USD / JPY
                  </p>
                  <p className="text-[#3c4043] text-[12px] font-medium">
                    {formattedNewRateJPY}
                  </p>
                </div>
                <div
                  className={`${
                    isNegativeJPY ? "text-[#a50e0e]" : "text-[#137333]"
                  }`}
                >
                  <p className="text-[#137333] text-[12px] font-bold">
                    {displayChangePercentJPY}
                  </p>
                  <p className="text-[#137333] text-[12px] font-medium">
                    {displayValueChangeJPY}
                  </p>
                </div>
              </div>
            </div>
            <div
              onClick={handleActiveGBPPage}
              className="bg-white border-[1px] border-solid border-[#dadce0] mr-[8px] rounded-[8px] cursor-pointer"
            >
              <div className="p-[6px] flex items-center">
                <div
                  className={`flex items-center justify-center text-[16px] mr-2 h-[32px] w-[32px] rounded-[8px]  ${
                    isNegativeGBP
                      ? "text-[#a50e0e] bg-[#fce8e6]"
                      : "text-[#137333] bg-[#e6f4ea]"
                  }`}
                >
                  <Icon
                    icon={
                      isNegativeGBP ? "ri:arrow-down-line" : "ri:arrow-up-line"
                    }
                  />
                </div>
                <div className="mr-2">
                  <p className="text-[#202124] text-[12px] font-bold">
                    USD / GBP
                  </p>
                  <p className="text-[#3c4043] text-[12px] font-medium">
                    {formattedNewRateGBP}
                  </p>
                </div>
                <div>
                  <p className="text-[#137333] text-[12px] font-bold">
                    {displayChangePercentGBP}
                  </p>
                  <p className="text-[#137333] text-[12px] font-medium">
                    {displayValueChangeGBP}
                  </p>
                </div>
              </div>
            </div>
            <div
              onClick={handleActiveEURPage}
              className="bg-white border-[1px] border-solid border-[#dadce0] mr-[8px] rounded-[8px] cursor-pointer"
            >
              <div className="p-[6px] flex items-center">
                <div
                  className={`flex items-center justify-center text-[16px] mr-2 h-[32px] w-[32px] rounded-[8px]  ${
                    isNegativeEUR
                      ? "text-[#a50e0e] bg-[#fce8e6]"
                      : "text-[#137333] bg-[#e6f4ea]"
                  }`}
                >
                  <Icon
                    icon={
                      isNegativeEUR ? "ri:arrow-down-line" : "ri:arrow-up-line"
                    }
                  />
                </div>
                <div className="mr-2">
                  <p className="text-[#202124] text-[12px] font-bold">
                    USD / EUR
                  </p>
                  <p className="text-[#3c4043] text-[12px] font-medium">
                    {formattedNewRateEUR}
                  </p>
                </div>
                <div>
                  <p className="text-[#137333] text-[12px] font-bold">
                    {displayChangePercentEUR}
                  </p>
                  <p className="text-[#137333] text-[12px] font-medium">
                    {displayValueChangeEUR}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-[200px]">{children}</div>
    </>
  );
}

export default HomePage;
