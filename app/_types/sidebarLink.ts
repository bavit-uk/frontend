/* eslint-disable @typescript-eslint/no-explicit-any */
export type sidebarLink = {
  label: string;
  Icon: React.ReactElement<any, any>;
  link?: string;
  isShowing: boolean;
  links?: sidebarLink[];
};
