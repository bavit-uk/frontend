"use client";

import { cn } from "@utils/cn";
import React, { ForwardRefRenderFunction } from "react";
import { FieldErrors, RegisterOptions, UseFormRegister, UseFormWatch } from "react-hook-form";
import { LucideIcon } from "lucide-react";

type Classes = {
  root?: string;
  select?: string;
  label?: string;
  error?: string;
  state?: string;
  icon?: string;
};

type CommonProps = {
  classes?: Classes;
  options: { value: string | number; label: string; state?: string }[];
} & React.InputHTMLAttributes<HTMLSelectElement>;

type FormControlledSelect = {
  register: UseFormRegister<any>;
  errors?: FieldErrors<any>;
  rules?: RegisterOptions<any>;
  watch?: UseFormWatch<any>;
  override?: boolean;
  label?: string;
  required?: boolean;
  onManualClick?: () => void;
} & CommonProps;

type ControlledSelectProps = {
  register: undefined;
  state: string | number; 
  setState: React.Dispatch<React.SetStateAction<string | number>>; 
  Icon?: LucideIcon;
  placeholder?: string; 
} & CommonProps;

type SelectProps = FormControlledSelect | ControlledSelectProps;

const ControlledSelect: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { classes, options, placeholder, ...props },
  ref,
) => {
  if (!props.register) {
    return (
      <select value={props.state} onChange={(e) => props.setState(e.target.value)} className={cn(classes?.select)}>
        <option value="" disabled selected>
          {placeholder || "Select an option"}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
  const { register, errors, watch, override = false, rules, label, required, onManualClick } = props;

  if (!props.name) throw new Error("ControlledInput must have a name prop");

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

      <select
        {...props}
        {...register(props.name, rules)}
        className={cn(
          override
            ? ""
            : "w-full rounded-md border border-gray-300 p-2 font-light focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary",
          classes?.select,
        )}
        ref={ref}
      >
        <option value="" disabled selected>
          {placeholder || "Select an option"}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {props.name && errors && errors[props.name] && errors[props.name]?.message && (
        <span className={cn("text-xs text-red-500", classes?.error)}>{errors[props.name]?.message?.toString()}</span>
      )}
    </div>
  );
};

export default React.forwardRef(ControlledSelect);
