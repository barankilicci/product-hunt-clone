"use client";
import { useState } from "react";
import Logo from "./logo";
import Menu from "./menu";
import Search from "./search";
import SignInButton from "./sign-in-button";
import SignUpButton from "./sign-up-button";
import Modal from "../ui/modals/modal";
import AuthContent from "./auth-content";
import Avatar from "./avatar";
import NotificationIcon from "./notification-icon";
import Submit from "./submit";

interface NavbarProps {
  authenticatedUser?: any;
  no
}

const Navbar: React.FC<NavbarProps> = ({ authenticatedUser }) => {
  const [authModalVisible, setauthModalVisible] = useState(false);
  const handleButtonClick = () => {
    setauthModalVisible(true);
  };
  return (
    <div className="border-b py-2 md:py-0 px-4 md:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Logo />
          <Search />
        </div>
        <div className="absolute right-1/2 translate-x-1/2 transform z-10">
          <Menu />
        </div>

        <div className="flex items-center text-sm space-x-6 cursor-pointer">
          {authenticatedUser ? (
            <>
            <Submit />
            <NotificationIcon />
              <Avatar authenticatedUser={authenticatedUser}/>
            </>
          ) : (
            <div
              onClick={handleButtonClick}
              className="flex items-center space-x-6 cursor-pointer text-sm"
            >
              <SignInButton />
              <SignUpButton />
            </div>
          )}
        </div>

        <Modal visible={authModalVisible} setVisible={setauthModalVisible}>
          <AuthContent />
        </Modal>
      </div>
    </div>
  );
};

export default Navbar;
