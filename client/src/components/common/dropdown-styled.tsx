import { Dropdown, MenuProps, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { FC, useState } from "react";

interface IProps {
  items: MenuProps["items"];
  title: string | JSX.Element;
}

const DropdownStyled: FC<IProps> = ({ items, title }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Dropdown menu={{ items }} onOpenChange={() => setHovered(!hovered)}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {title}
          <DownOutlined
            style={{
              transform: `rotate(${hovered ? "180deg" : "0deg"})`,
              transition: "transform 0.2s ease-in"
            }}
          />
        </Space>
      </a>
    </Dropdown>
  );
};

export default DropdownStyled;
