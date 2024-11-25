/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/app/_utils/cn";
import React, { ForwardRefRenderFunction } from "react";
import {
  FieldErrors,
  RegisterOptions,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

type Classes = {
  root?: string;
  textarea?: string;
  label?: string;
  error?: string;
};

type ControlledTextAreaProps = {
  register: UseFormRegister<any>;
  errors?: FieldErrors<any>;
  watch?: UseFormWatch<any>;
  classes?: Classes;
  override?: boolean;
  rules?: RegisterOptions<any>;
  rows?: number;
  label?: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLTextAreaElement>;

const ControlledTextArea: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  ControlledTextAreaProps
> = (
  {
    register,
    errors,

    classes,
    override = false,
    rules,
    label,
    required,
    ...props
  },
  ref
) => {
  if (!props.name) throw new Error("ControlledInput must have a name prop");
  return (
    <div className={classes?.root || ""}>
      {label && (
        <label
          htmlFor={props.name}
          className={cn("block text-sm font-light", classes?.label)}
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <textarea
        {...props}
        {...register(props.name, rules)}
        className={cn(
          override
            ? ""
            : "w-full rounded-md border border-gray-300 p-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary",
          classes?.textarea
        )}
        ref={ref}
        rows={props?.rows || 4}
      />
      {props.name &&
        errors &&
        errors[props.name] &&
        errors[props.name]?.message && (
          <span className={`text-xs font-light text-red-500 ${classes?.error}`}>
            {errors[props.name]?.message?.toString()}
          </span>
        )}
    </div>
  );
};

export default React.forwardRef(ControlledTextArea);
