"use client";

import { Fragment, useState } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import { Check, ChevronUp } from "lucide-react";
import { cn } from "@/app/_utils/cn";

type Props = {
  size: String;
  classes?: {
    wrapper?: String[];
    input?: String[];
    options?: String[];
    option?: String[];
  };
  data: FormTypes.FormValues.SelectOption[];
  value: FormTypes.FormValues.SelectOption;
  onChange: (value: FormTypes.FormValues.SelectOption) => void;
  placeholder?: string;
};

const SearchableSelect = ({ size, classes = {}, data = [], value, onChange, placeholder }: Props) => {
  const [query, setQuery] = useState("");

  const filteredData =
    query === ""
      ? data
      : data.filter((item) =>
          item.label.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, "")),
        );

  return (
    <Combobox
      value={value}
      onChange={(e: FormTypes.FormValues.SelectOption) => {
        onChange(e);
      }}
    >
      <div className="relative h-full">
        <div
          className={cn(
            "relative h-full w-full cursor-default overflow-hidden rounded-lg bg-white text-left  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-300 sm:text-sm",
            classes.wrapper?.length && classes.wrapper.join(" "),
          )}
        >
          <ComboboxInput
            className={cn(
              "h-full w-full border-none py-2 pl-3 pr-10 font-light leading-5 text-gray-900 focus-within:outline-0 focus:ring-0 active:outline-0",
              size === "lg" && "text-lg",
              size === "sm" && "text-sm",
              size === "xs" && "text-xs",
              size === "md" && "text-base",
              size === "xl" && "text-xl",
              classes.input?.length && classes.input?.join(" "),
            )}
            displayValue={(dataItem: FormTypes.FormValues.SelectOption) => dataItem?.label}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
          />

          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
            {({ open }) => (
              <ChevronUp
                className={cn(
                  "h-5 w-5 text-gray-400 transition-transform duration-200 ease-in-out",
                  open && "rotate-180",
                )}
                aria-hidden="true"
              />
            )}
          </ComboboxButton>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {filteredData.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">Nothing found.</div>
            ) : (
              filteredData.map((dataItem) => (
                <ComboboxOption
                  key={dataItem?.value}
                  className={({ active }) =>
                    cn(
                      "relative cursor-default select-none py-4 pl-4 pr-4 text-gray-900",
                      active && "bg-primary text-white",
                      size === "lg" && "text-base",
                      size === "sm" && "text-xs",
                      size === "xs" && "text-[10px]",
                      size === "md" && "text-sm",
                      size === "xl" && "text-lg",
                      classes.options?.length && classes.options.join(" "),
                      dataItem?.disabled && "cursor-not-allowed  text-gray-400",
                    )
                  }
                  value={dataItem}
                  disabled={dataItem?.disabled}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={cn(
                          "block truncate font-light",
                          selected && "bg-primary font-medium text-white",
                          classes.option?.length && classes.option.join(" "),
                        )}
                      >
                        {dataItem?.label}
                      </span>
                    </>
                  )}
                </ComboboxOption>
              ))
            )}
          </ComboboxOptions>
        </Transition>
      </div>
    </Combobox>
  );
};

export default SearchableSelect;
