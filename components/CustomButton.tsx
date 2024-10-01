"use client";
import { CustomButtonProps } from "@/types";
import Image from "next/image";

// CustomButton is a reusable components for button

const CustomButton = ({
  title,
  containerStyles,
  handleClick,
  btnType,
  textStyles,
  rightIcon,
}: CustomButtonProps) => {
  return (
    <button
      type={btnType || "button"}
      disabled={false}
      className={`custom-btn ${containerStyles}`}
      onClick={handleClick}
    >
      <span className={`flex-1 ${textStyles}`}>{title}</span>
      {
        // if rightIcon is true, the expression on the right side will be executed
        rightIcon && (
          <div className="relative w-6 h-6">
            <Image src={rightIcon} alt="right icon" fill className="object-contain"/>
          </div>
        )
      }
    </button>
  );
};

export default CustomButton;
