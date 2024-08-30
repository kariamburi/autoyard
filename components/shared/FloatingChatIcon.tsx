// components/FloatingChatIcon.js

import React from "react";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
interface FloatingChatIconProps {
  onClick: () => void;
  isOpen: boolean;
}
const FloatingChatIcon: React.FC<FloatingChatIconProps> = ({
  onClick,
  isOpen,
}) => {
  return (
    <div
      className="fixed bottom-10 right-5 bg-[#000000] w-16 h-16 flex justify-center items-center rounded-full cursor-pointer z-10"
      onClick={onClick}
    >
      <div className="w-8 h-8 flex text-[#000000] items-center justify-center rounded-full bg-white tooltip tooltip-bottom hover:cursor-pointer">
        {isOpen === true ? (
          <>
            <KeyboardArrowDownOutlinedIcon />
          </>
        ) : (
          <>
            <SupportAgentOutlinedIcon />
          </>
        )}
      </div>
    </div>
  );
};

export default FloatingChatIcon;
