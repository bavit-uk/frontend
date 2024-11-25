/* eslint-disable @typescript-eslint/no-unused-vars */
namespace FormTypes {
  namespace FormElements {
    type Input = {
      name: string;
      type: string;
      placeholder: string;
      label: string;
      required?: boolean;
    };

    type Select = {
      name: string;
      label: string;
      options: SelectOption[];
    };
  }

  namespace FormValues {
    type SelectOption = {
      label: string;
      value: string;
      disabled?: boolean;
    };
  }
}
