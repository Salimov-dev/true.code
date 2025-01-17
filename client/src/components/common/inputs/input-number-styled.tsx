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
        if (!value) return "";

        const [integer, decimal] = String(value).split(".");
        const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

        return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
      }}
      parser={(value) => {
        if (!value) return "";

        return value.replace(/\s?₽/g, "").replace(/\s/g, "");
      }}
    />
  );
};

export default InputNumberStyled;
