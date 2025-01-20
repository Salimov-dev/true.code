import { FC, ReactNode } from "react";
import styled from "styled-components";

interface StyledIconProps {
  size?: string;
}

interface IProps {
  children: ReactNode;
}

const Component = styled.span<StyledIconProps>`
  font-size: ${({ size }) => size || "1.4rem"};
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.2);
    color: coral;
    border: none;
  }
`;

const IconStyled: FC<IProps> = ({ children }): JSX.Element => {
  return <Component>{children}</Component>;
};

export default IconStyled;
