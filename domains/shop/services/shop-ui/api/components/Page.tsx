/** @jsx createElement */
import { ComponentChildren, createElement } from "../../helper/jsx.ts";

export type PageProps = {
  children?: ComponentChildren;
};

export const Page = (props: PageProps) => {
  return <div class="bg-[#fbfaf9] [font-stretch:95%]">{props.children}</div>;
};
