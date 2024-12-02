/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { cn } from "../../../_utils/cn";
import { FieldErrors, RegisterOptions, UseFormRegister, UseFormWatch } from "react-hook-form";
import InputMask from "@mona-health/react-input-mask";
import { Eye, EyeOff } from "lucide-react";

type Classes = {
  root?: string;
  input?: string;
  label?: string;
  error?: string;
  button?: string;
  icon?: string;
};

type ControlledInputProps = {
  register?: UseFormRegister<any>;
  errors?: FieldErrors<any>;
  watch?: UseFormWatch<any>;
  classes?: Classes;
  override?: boolean;
  rules?: RegisterOptions<any>;
  mask?: string | (string | RegExp)[];
  label?: string;
  required?: boolean;
  type?: string;
  icon?: React.ReactNode;
  onManualClick?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const ControlledInput: React.FC<ControlledInputProps> = (
  { register, errors, classes, onManualClick, override = false, rules, mask = "", label, icon, ...props }
) => {
  const [showPassword, setShowPassword] = useState(false);

  if (!props.name || !register) {
    throw new Error("ControlledInput must have a name prop");
  }

  const { readOnly, ...rest } = props;

  const { name, onBlur, onChange, ref, disabled, max, maxLength, min, minLength, pattern, required } = register(
    props.name,
    rules
  );

  return (
    <div className={classes?.root || ""}>
      {label && (
        <label htmlFor={props.name} className={cn("block text-sm font-light", classes?.label)}>
          {label}
          {label === "Exterior Color" || label === "Interior Color" ? (
            <span
              onClick={onManualClick}
              className="ml-1 cursor-pointer rounded bg-orange-300 p-1 text-xs text-orange-600"
            >
              Manual
            </span>
          ) : null}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <InputMask
          mask={mask}
          readOnly={readOnly}
          value={props.value}
          onBlur={onBlur}
          disabled={disabled}
          onChange={onChange}
          ref={ref}
        >
          <input
            name={name}
            max={max}
            min={min}
            maxLength={maxLength}
            minLength={minLength}
            pattern={pattern}
            required={required}
            {...rest}
            className={cn(
              override
                ? ""
                : "focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 p-2 font-light focus:outline-none focus:ring-1",
              readOnly ? "cursor-not-allowed select-none bg-gray-100" : "",
              classes?.input,
              props.type === "password" && "pr-10",
              icon && "pr-14"
            )}
            type={props.type === "password" && showPassword ? "text" : props.type}
          />
        </InputMask>
        {props.type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Toggle password visibility"
          >
            {showPassword ? <EyeOff size="24" /> : <Eye size="24" />}
          </button>
        )}
      </div>
      {props.name && errors && errors[props.name] && (
        <span className={cn("text-xs text-red-500", classes?.error)}>
          {errors[props.name]?.message?.toString()}
        </span>
      )}
    </div>
  );
};

export default ControlledInput;
