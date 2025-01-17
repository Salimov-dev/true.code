import { Flex, Spin } from "antd";
import styled from "styled-components";
import { FC, useEffect, useState } from "react";
import DropdownStyled from "@common/dropdown/dropdown-styled";
import useAuthDropdownItems from "@hooks/use-auth-dropdown-items.hook";
import { IUser } from "@interfaces/user.interface";
// components
import AuthButtonHeader from "./components/auth-button.header";
import CreateProductButtonHeader from "./components/create-product-button.header";
import ProductsGenerateButton from "../products-generate-button/products-generate-button";
// store
import useAuthStore from "@store/auth.store";
import useUserStore from "@store/user.store";

const UserActionsWrapper = styled(Flex)`
  gap: 20px;
  align-items: center;
`;

const UserHeaderActionsSection: FC = (): JSX.Element => {
  const [userData, setUserData] = useState<IUser>();

  const { isAuth, authUser } = useAuthStore();
  const { fetchUserById, isLoading } = useUserStore();

  const authUserId = authUser?.userId;
  const authUserFullName = !isLoading ? (
    `${userData?.lastName} ${userData?.firstName}`
  ) : (
    <Spin />
  );

  const dropdownItems = useAuthDropdownItems();

  useEffect(() => {
    if (authUserId) {
      fetchUserById(authUserId).then((user) => setUserData(user));
    }
  }, [fetchUserById, authUserId]);

  return !isAuth ? (
    <AuthButtonHeader />
  ) : (
    <UserActionsWrapper>
      <ProductsGenerateButton />
      <CreateProductButtonHeader />
      <DropdownStyled items={dropdownItems} title={authUserFullName} />
    </UserActionsWrapper>
  );
};

export default UserHeaderActionsSection;
