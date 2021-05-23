import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL: any = process.env.REACT_APP_BASE_URL;

interface IError {
  response: any,
  request: any
}

const handleError = (err: IError) => {
  let errorText = "Oops! Response Error.";
  if (err.response) {
    console.log(err.response);
    errorText = "Oops! Response Error.";
  } else if (err.request) {
    console.log(err.request);
    errorText = "Oops! Request Error.";
  } else {
    console.log(err);
    errorText = "Oops! Error.";
  }
  return errorText;
};

export const useFetchRates = () => {
  const [currencyOptions, setCurrencyOptions] = useState<string[] | []>([]);
  const [fromCurrency, setFromCurr] = useState<string>('');
  const [toCurrency, setToCurr] = useState<string>('');
  const { setRate } = useFetchTargetRate(fromCurrency, toCurrency);
  const [ratesErrorText, setRatesErrorText] = useState<string>("");

  useEffect(() => {
    axios
      .get(BASE_URL)
      .then(({ data }) => {
        setRatesErrorText('');
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([...Object.keys(data.rates)]);
        setFromCurr(data.base);
        setToCurr(firstCurrency);
        setRate(data.rates[firstCurrency]);
      })
      .catch((err) => {
        if (err.response) {
          setRatesErrorText(handleError(err));
        }
      });
  }, []);

  const setFromCurrency = (currency: string) => {
    setFromCurr(currency);
  };

  const setToCurrency = (currency: string) => {
    setToCurr(currency);
  };

  return {
    currencyOptions,
    fromCurrency,
    toCurrency,
    setFromCurrency,
    setToCurrency,
    ratesErrorText,
  };
};

export const useFetchTargetRate = (fromCurrency: string, toCurrency: string) => {
  const [exchangeRate, setExchangeRate] = useState<any>();
  const [exchangeRateErrorText, setExchangeRateErrorText] = useState<string>("");

  useEffect(() => {
    if (fromCurrency !== '' && toCurrency !== '') {
      setExchangeRateErrorText('');
      axios
        .get(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(({ data }) => setExchangeRate(data.rates[toCurrency]))
        .catch((err) => {
          setExchangeRateErrorText(handleError(err));
        });
    }
  }, [fromCurrency, toCurrency]);

  const setRate = (rate: number) => {
    setExchangeRate(rate);
  };

  return { exchangeRate, setRate, exchangeRateErrorText };
};

export const useFetchHistoricalData = (fromCurrency: string, toCurrency: string, dateList: string[]) => {
  const [currencyValues, setCurrencyValues] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [historyDataErrorText, setHistoryDataErrorText] = useState("");

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      dateList.length > 0 && setLoading(true);
      setHistoryDataErrorText('');
      axios
        .all(
          dateList.map((date) =>
            axios.get(
              `${BASE_URL}?date=${date}&base=${fromCurrency}&symbols=${toCurrency}`
            )
          )
        )
        .then(
          axios.spread(function (...responses) {
            const values = responses.map((resp) => resp.data.rates[toCurrency]);
            setCurrencyValues(values);
            setLoading(false);
          })
        )
        .catch((err) => {
          setHistoryDataErrorText(handleError(err));
          setLoading(false);
        });
    }
  }, [fromCurrency, toCurrency, dateList]);

  return { currencyValues, loading, historyDataErrorText };
};
