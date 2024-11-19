"use client";

// import { cn } from "@utils/cn";
import React, { ForwardRefRenderFunction } from "react";
import { FieldErrors, RegisterOptions, UseFormRegister, UseFormWatch } from "react-hook-form";
// import InputMask from "react-input-mask";
import { Eye, EyeOff } from "lucide-react";

type Classes = {
  root?: string;
  input?: string;
  label?: string;
  error?: string;
  button?: string;
  icon?: string;
};

// type ControlledInputProps = {
//   register?: UseFormRegister;
//   errors?: FieldErrors<any>;
//   watch?: UseFormWatch<any>;
//   classes?: Classes;
//   override?: boolean;
//   rules?: RegisterOptions<any>;
//   mask?: string | (string | RegExp)[];
//   label?: string;
//   required?: boolean;
//   name: string;
//   type?: string;
//   icon?: React.ReactNode;
//   onManualClick?: () => void;
// } & React.InputHTMLAttributes<HTMLInputElement>;

const ControlledInput: ForwardRefRenderFunction<any> = (
  {
    register,
    errors,

    classes,
    onManualClick,
    override = false,
    rules,
    mask = "",
    label,
    required,
    icon,
    ...props
  },
  ref,
) => {
  const [showPassword, setShowPassword] = React.useState(false);

  if (!props.name) throw new Error("ControlledInput must have a name prop");

  const { readOnly, ...rest } = props;

  return (
    <div className={classes?.root || ""}>
      {label && (
        <label htmlFor={props.name} className={cn("block text-sm font-light", classes?.label)}>
          {label}
          {label === "Exterior Color" && (
            <span
              onClick={onManualClick}
              className="ml-1 cursor-pointer rounded bg-orange-300 p-1 text-xs text-orange-600"
            >
              Manual
            </span>
          )}
          {label === "Interior Color" && (
            <span
              onClick={onManualClick}
              className="ml-1 cursor-pointer rounded bg-orange-300 p-1 text-xs text-orange-600"
            >
              Manual
            </span>
          )}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <div className="relative">

          <input
            {...rest}
            {...(register ? register(props.name, rules) : {})}
            className={(

              classes?.input,
              props.type === "password" && "pr-10",
              icon && "pr-14",
            )}
            type={props.type === "password" && showPassword ? "text" : props.type}
            ref={ref}
          />

        {icon && <span className="absolute right-2 top-1/2 -translate-y-1/2 transform">{icon}</span>}
        {props.type === "password" && (
          <button
            type="button"
            className={cn("absolute right-2 top-1/2 -translate-y-1/2 transform focus:outline-none", classes?.button)}
          >
            {showPassword ? (
              <EyeOff className={cn("h-5 w-5 text-gray-500", classes?.icon)} onClick={() => setShowPassword(false)} />
            ) : (
              <Eye className={cn("h-5 w-5 text-gray-500", classes?.icon)} onClick={() => setShowPassword(true)} />
            )}
          </button>
        )}
      </div>
      {props.name && errors && errors[props.name] && errors[props.name]?.message && (
        <span className={cn("text-xs text-red-500", classes?.error)}>{errors[props.name]?.message?.toString()}</span>
      )}
    </div>
  );
};

export default React.forwardRef(ControlledInput);
