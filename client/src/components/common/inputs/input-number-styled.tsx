import cleanCurrencyValue from "@utils/input/clean-currency-value";
import formatIntegerWithSpaces from "@utils/input/format-integer-with-spaces";
import { InputNumber } from "antd";
import { FC } from "react";

interface IProps {
  autoComplete: string;
  addonAfter: string;
  placeholder: string;
  value?: number;
  onChange?: (value: number | string | null) => void;
}

const InputNumberStyled: FC<IProps> = ({
  autoComplete,
  addonAfter = null,
  placeholder,
  value,
  onChange
}) => {
  return (
    <InputNumber
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      addonAfter={addonAfter}
      style={{ width: "100%" }}
      precision={2}
      placeholder={placeholder}
      formatter={(value) => {
        return formatIntegerWithSpaces(value);
      }}
      parser={(value) => {
        return cleanCurrencyValue(value);
      }}
    />
  );
};

export default InputNumberStyled;
