import { VFC, SVGProps } from "react";

export interface IPriorityOptions {
  label: string;
  value: string;
  img: VFC<SVGProps<SVGSVGElement>>;
}
export interface ICategoryOptions {
  label: string;
  value: string;
  img: string;
}