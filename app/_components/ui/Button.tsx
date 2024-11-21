/* eslint-disable @typescript-eslint/no-explicit-any */

import { cn } from "../../_utils/cn";
import { LucideIcon } from "lucide-react";
import React from "react";
type ButtonProps = {
  label: string;
  onClick?: (value: any) => void;
  variant?: "filled" | "outlined";
  className?: string;
  Icon?: LucideIcon;
  IconClassName?: string;
  isDisabled?: boolean;
  type?: "button" | "reset" | "submit";
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "filled",
  className,
  Icon,
  IconClassName,
  isDisabled = false,
  type = "button",
}) => {
  let buttonStyles = "rounded-md border hover:shadow-md flex items-center gap-2 px-2 py-2 text-center ";
  if (variant === "filled") {
    if (isDisabled) {
      buttonStyles += " bg-slate-300 text-slate-500 hover:shadow-none";
    } else {
      buttonStyles += " text-primaryBg bg-primary";
    }
  } else {
    if (isDisabled) {
      buttonStyles += " text-slate-300 hover:shadow-none";
    } else {
      buttonStyles += " text-primary";
    }
  }

  return (
    <button
      className={cn(`${buttonStyles} ${className}`)}
      onClick={onClick}
      disabled={isDisabled}
      type={type || "button"}
    >
      {Icon && <Icon className={` ${IconClassName}`} />}
      <span className="flex-1 text-center text-inherit">{label}</span>
    </button>
  );
};

export default Button;
