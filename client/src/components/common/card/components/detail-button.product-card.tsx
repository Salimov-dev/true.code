import { Button } from "antd";
import { FC } from "react";

interface IProps {
  onOpenProductDetails: () => void;
}

const DetailButtonProductCard: FC<IProps> = ({
  onOpenProductDetails
}): JSX.Element => {
  return (
    <Button color="default" variant="dashed" onClick={onOpenProductDetails}>
      ПОДРОБНЕЕ
    </Button>
  );
};

export default DetailButtonProductCard;
