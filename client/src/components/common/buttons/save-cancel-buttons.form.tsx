import { Button, Flex } from "antd";
import { FC } from "react";
import styled from "styled-components";

interface IProps {
  onClose: () => void;
  saveText?: string;
  closeText?: string;
}

const Component = styled(Flex)`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const SaveCloseButtons: FC<IProps> = ({
  onClose,
  saveText = "Сохранить",
  closeText = "Закрыть"
}): JSX.Element => {
  return (
    <Component>
      <Button type="primary" htmlType="submit">
        {saveText}
      </Button>
      <Button onClick={onClose} danger>
        {closeText}
      </Button>
    </Component>
  );
};

export default SaveCloseButtons;
