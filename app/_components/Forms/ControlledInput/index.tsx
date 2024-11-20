/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { cn } from '@/app/_utils/cn';
import React, { ForwardRefRenderFunction } from 'react';
import {
  FieldErrors,
  RegisterOptions,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import InputMask from 'react-input-mask';

import { Eye, EyeOff } from 'lucide-react';

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
  name: string;
  type?: string;
  icon?: React.ReactNode;
  onManualClick?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const ControlledInput: ForwardRefRenderFunction<
  HTMLInputElement,
  ControlledInputProps
> = (
  {
    register,
    errors,
    classes,
    onManualClick,
    override = false,
    rules,
    mask = '',
    label,
    required,
    icon,
    ...props
  },
  ref
) => {
  const [showPassword, setShowPassword] = React.useState(false);

  if (!props.name) throw new Error('ControlledInput must have a name prop');

  const { readOnly, ...rest } = props;

  return (
    <div className={classes?.root || ''}>
      {label && (
        <label
          htmlFor={props.name}
          className={cn('block text-sm font-light', classes?.label)}
        >
          {label}
          {label === 'Exterior Color' && (
            <span
              onClick={onManualClick}
              className='ml-1 cursor-pointer rounded bg-orange-300 p-1 text-xs text-orange-600'
            >
              Manual
            </span>
          )}
          {label === 'Interior Color' && (
            <span
              onClick={onManualClick}
              className='ml-1 cursor-pointer rounded bg-orange-300 p-1 text-xs text-orange-600'
            >
              Manual
            </span>
          )}
          {required && <span className='ml-1 text-red-500'>*</span>}
        </label>
      )}
      <div className='relative'>
        <InputMask
          mask={mask}
          readOnly={readOnly}
          value={props.value}
          onBlur={props.onBlur}
          disabled={props.disabled}
        >
          {(inputProps) => (
            <input
              {...inputProps} // Spread the inputProps here
              {...rest}
              {...(register ? register(props.name, rules) : {})}
              className={cn(
                override
                  ? ''
                  : 'focus:border-primary focus:ring-primary w-full rounded-md border border-gray-300 p-2 font-light focus:outline-none focus:ring-1',
                readOnly ? 'cursor-not-allowed select-none bg-gray-100' : '',
                classes?.input,
                props.type === 'password' && 'pr-10',
                icon && 'pr-14'
              )}
              type={
                props.type === 'password' && showPassword ? 'text' : props.type
              }
              ref={ref}
            />
          )}
        </InputMask>
      </div>

      {props.name &&
        errors &&
        errors[props.name] &&
        errors[props.name]?.message && (
          <span className={cn('text-xs text-red-500', classes?.error)}>
            {errors[props.name]?.message?.toString()}
          </span>
        )}
    </div>
  );
};

export default React.forwardRef(ControlledInput);
