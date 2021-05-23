import React from "react";
import { Input, Container } from "reactstrap";

interface Props {
  currencyOptions: string[],
  selectedCurrency: string,
  onChangeCurrency: any,
  onChangeAmount: any,
  amount: number
}

const CurrencyRow = ({
  currencyOptions,
  selectedCurrency,
  onChangeCurrency,
  onChangeAmount,
  amount,
}: Props) => {
  return (
    <Container>
      <div>
        <Input
          type="select"
          name="selectCurrency"
          id="selectCurrency"
          value={selectedCurrency}
          onChange={onChangeCurrency}
        >
          {currencyOptions.map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Input>  
      </div>

      <div className="amountInput">
        <Input
          type="number"
          name="inputCurrency"
          id="inputCurrency"
          placeholder="Enter amount here.."
          value={amount}
          onChange={onChangeAmount}
        />
      </div>
    </Container>
  );
};

export default CurrencyRow;
