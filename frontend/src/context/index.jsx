import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const RateContext = createContext();

export const useRateContext = () => {
  return useContext(RateContext);
};

export const RateProvider = ({ children }) => {
  const [ratesJPY, setRatesJPY] = useState([]);
  const [ratesGBP, setRatesGBP] = useState([]);
  const [ratesEUR, setRatesEUR] = useState([]);
  const [initialLoadJPY, setInitialLoadJPY] = useState(true);
  const [initialLoadGBP, setInitialLoadGBP] = useState(true);
  const [initialLoadEUR, setInitialLoadEUR] = useState(true);

  const fetchExchangeRatesUSDJPY = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/rates/USDJPY"
      );
      if (initialLoadJPY) {
        setRatesJPY(response.data[0]);
        setInitialLoadJPY(false);
      } else {
        const lastRate = response.data[0][response.data[0].length - 1];
        setRatesJPY((prevRates) => {
          if (
            prevRates.find((rate) => rate.created_at === lastRate.created_at)
          ) {
            return prevRates;
          }
          return [...prevRates, lastRate];
        });
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const fetchExchangeRatesUSDGBP = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/rates/USDGBP"
      );
      if (initialLoadGBP) {
        setRatesGBP(response.data[0]);
        setInitialLoadGBP(false);
      } else {
        const lastRate = response.data[0][response.data[0].length - 1];
        setRatesGBP((prevRates) => {
          if (
            prevRates.find((rate) => rate.created_at === lastRate.created_at)
          ) {
            return prevRates;
          }
          return [...prevRates, lastRate];
        });
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const fetchExchangeRatesUSDEUR = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/rates/USDEUR"
      );
      if (initialLoadEUR) {
        setRatesEUR(response.data[0]);
        setInitialLoadEUR(false);
      } else {
        const lastRate = response.data[0][response.data[0].length - 1];
        setRatesEUR((prevRates) => {
          if (
            prevRates.find((rate) => rate.created_at === lastRate.created_at)
          ) {
            return prevRates;
          }
          return [...prevRates, lastRate];
        });
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  useEffect(() => {
    fetchExchangeRatesUSDJPY();
    fetchExchangeRatesUSDGBP();
    fetchExchangeRatesUSDEUR();
    const intervalIdJPY = setInterval(fetchExchangeRatesUSDJPY, 60000);
    const intervalIdGBP = setInterval(fetchExchangeRatesUSDGBP, 60000);
    const intervalIdEUR = setInterval(fetchExchangeRatesUSDEUR, 60000);

    return () => {
      clearInterval(intervalIdJPY);
      clearInterval(intervalIdGBP);
      clearInterval(intervalIdEUR);
    };
  }, []);

  return (
    <RateContext.Provider value={{ ratesJPY, ratesGBP, ratesEUR }}>
      {children}
    </RateContext.Provider>
  );
};
