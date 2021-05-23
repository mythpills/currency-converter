import { useEffect, useState } from "react";

export const useLoaderText = (
  exchangeRateErrorText:string,
  ratesErrorText:string,
  onError:Function
) => {
  const [errorText, setErrorText] = useState("");
  useEffect(() => {
    if (exchangeRateErrorText) {
      setErrorText(exchangeRateErrorText);
    } else if (ratesErrorText) {
      setErrorText(ratesErrorText);
    }
    onError(errorText);
  }, [exchangeRateErrorText, ratesErrorText]);

  return { errorText };
};
