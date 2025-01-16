import { Flex, Spin } from "antd";
import styled from "styled-components";
import { useEffect, useState } from "react";
import DropdownStyled from "@common/dropdown-styled";
import useAuthDropdownItems from "./hooks/use-auth-dropdown-items";
import { IUser } from "@interfaces/user.interface";
// components
import AuthButtonHeader from "./components/auth-button.header";
import AddProductButtonHeader from "./components/add-product-item-button.header";
// store
import useAuthStore from "@store/auth.store";
import useUserStore from "@store/user.store";

const RightSideHeader = styled(Flex)`
  gap: 20px;
  align-items: center;
`;

const UserHeaderActionsSection = () => {
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
    <RightSideHeader>
      <AddProductButtonHeader />
      <DropdownStyled items={dropdownItems} title={authUserFullName} />
    </RightSideHeader>
  );
};

export default UserHeaderActionsSection;
