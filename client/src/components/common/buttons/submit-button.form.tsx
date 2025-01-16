import { Button, Flex, Form } from "antd";
import { FC } from "react";
import styled from "styled-components";

interface IProps {
  submitText?: string;
}

const Component = styled(Flex)`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const SubmitButtonForm: FC<IProps> = ({
  submitText = "Отправить"
}): JSX.Element => {
  return (
    <Form.Item label={null}>
      <Component>
        <Button type="primary" htmlType="submit">
          {submitText}
        </Button>
      </Component>
    </Form.Item>
  );
};

export default SubmitButtonForm;
