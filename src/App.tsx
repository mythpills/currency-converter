import React, { useState, } from "react";
import "./App.css";
import Header from "./Components/Header";
import CurrencyRow from "./Components/CurrencyRow";
import GraphContainer from "./Components/Graph/GraphContainer";
import { useFetchTargetRate, useFetchRates } from "./CustomHooks/useFetchRates";
import { useLoaderText } from "./CustomHooks/useLoader";
import { Row, Col, Button } from "reactstrap";
import FullPageLoader from "./Components/FullPageLoader";
import ErrorText from "./Components/ErrorText";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateError } from "./store/ducks/error";
import { RootState, FromAmountChangeEvent, ToAmountChangeEvent, FromCurrencyEvent, ToCurrencyEvent } from "./Interfaces";

function App() {
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const isLoading = useSelector((state: RootState) => state.isLoading.isLoading);
  const dispatch = useDispatch();
  const {
    currencyOptions,
    fromCurrency,
    toCurrency,
    setFromCurrency,
    setToCurrency,
    ratesErrorText,
  } = useFetchRates();

  const { exchangeRate, exchangeRateErrorText } = useFetchTargetRate(
    fromCurrency,
    toCurrency
  );

  const handleError = (errorText: string) => {
    dispatch(updateError(errorText));
  }

  const { errorText } = useLoaderText(
    exchangeRateErrorText,
    ratesErrorText,
    handleError
  );

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  const handleFromAmountChange = (e: FromAmountChangeEvent) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  const handleToAmountChange = (e: ToAmountChangeEvent) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  const handleCurrencySwitch = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  return (
    <>
      <Header />
      <Row className="currencyRow">
        <Col md="5">
          <CurrencyRow
            currencyOptions={currencyOptions}
            selectedCurrency={fromCurrency}
            onChangeCurrency={(e: FromCurrencyEvent) => setFromCurrency(e.target.value)}
            onChangeAmount={handleFromAmountChange}
            amount={fromAmount?fromAmount:1}
          />
        </Col>
        <Col md="2" className="equals">
          <Button outline color="primary" onClick={handleCurrencySwitch}>
            Switch
          </Button>
        </Col>
        <Col md="5">
          <CurrencyRow
            currencyOptions={currencyOptions}
            selectedCurrency={toCurrency}
            onChangeCurrency={(e: ToCurrencyEvent) => setToCurrency(e.target.value)}
            onChangeAmount={handleToAmountChange}
            amount={toAmount?toAmount:1}
          />
        </Col>
      </Row>

      <GraphContainer fromCurrency={fromCurrency} toCurrency={toCurrency} />
      <FullPageLoader isLoading={isLoading} />
      {errorText !== "" && <ErrorText errorText={errorText} />}
    </>
  );
}

export default App;
