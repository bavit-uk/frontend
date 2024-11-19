"use client";
import { Star } from "lucide-react";
import { useState } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
type Classes = {
  root?: string;
  label?: string;
  checkbox?: string;
  labelCheckboxContainer?: string;
};

type StateControlCheckbox = {
  isFormControlled: false;
  value: boolean;
  setValue?: React.Dispatch<React.SetStateAction<boolean>>;
  readOnly?: boolean;
  classes?: Classes;
  label: string;
};

type FormControlledCheckbox = {
  isFormControlled: true;
  setValue?: UseFormSetValue<any>;
  readOnly?: boolean;
  classes?: Classes;
  watch: UseFormWatch<any>;
  name: string;
  label: string;
};

type CheckboxProps = StateControlCheckbox | FormControlledCheckbox;

const ControlledCheckbox: React.FC<CheckboxProps> = ({ readOnly = false, ...props }) => {
  if (props.isFormControlled === true) {
    const { name, classes, setValue, watch, label } = props;
    return (
      <>
        <div className={`form-control ${classes?.root}`}>
          <label
            className={`label flex cursor-pointer flex-row justify-start gap-2 ${classes?.labelCheckboxContainer}`}
          >
            <input
              type="checkbox"
              className={`toggle toggle-success  ${classes?.checkbox}`}
              checked={watch(name)}
              disabled={readOnly}
              onChange={(e) => setValue && setValue(name, e?.target?.checked)}
            />
            <span className={`label-text ${classes?.label}`}>{label}</span>
          </label>
        </div>
      </>
    );
  }
  const { value, label, classes, setValue } = props;
  return (
    <>
      <div className={`form-control ${classes?.root}`}>
        <label className={`label flex cursor-pointer flex-row justify-start gap-2 ${classes?.labelCheckboxContainer}`}>
          <input
            type="checkbox"
            className={`toggle toggle-success ${classes?.checkbox}`}
            checked={value}
            disabled={readOnly}
            onChange={(e) => {
              setValue && setValue(e?.target?.checked);
            }}
          />
          <span className={`label-text ${classes?.label}`}>{label}</span>
        </label>
      </div>
    </>
  );
};

export default ControlledCheckbox;
