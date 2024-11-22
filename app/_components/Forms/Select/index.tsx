"use select";

import { Fragment } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/app/_utils/cn";

type Props = {
  size?: string;
  classes?: {
    input?: string | string[];
    options?: string | string[];
    option?: string | string[];
    wrapper?: string | string[];
  };
  data: FormTypes.FormValues.SelectOption[];
  value: FormTypes.FormValues.SelectOption;
  onChange: (value: FormTypes.FormValues.SelectOption) => void;
};

export default function Select({ classes, data, value, onChange }: Props) {
  return (
    <div className="w-full">
      <Listbox
        value={value}
        onChange={(value) => {
          onChange(value);
        }}
      >
        <div className={cn("relative border", classes?.wrapper)}>
          <ListboxButton
            className={cn(
              "relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-300 sm:text-sm",
              classes?.input
            )}
          >
            <span className="block truncate w-full">{value?.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions
              className={cn(
                "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm ",
                classes?.options
              )}
            >
              {data.map((item, personIdx) => (
                <ListboxOption
                  key={personIdx}
                  className={({ active }) =>
                    cn(
                      "relative cursor-pointer select-none py-2 pl-10 pr-4 text-gray-900 ",
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900",
                      classes?.option,
                      item.disabled && "text-gray-400"
                    )
                  }
                  disabled={item.disabled || false}
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-light"
                        }`}
                      >
                        {item.label}
                      </span>
                      {selected && !item.disabled ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <Check className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
