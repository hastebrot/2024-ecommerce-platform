/** @jsx createElement */
import { icons } from "lucide-preact";
import { classNames, ComponentChildren, createElement } from "../../helper/jsx.ts";

export const CategoriesNavigation = () => {
  return (
    <nav class="pt-[1rem] border-b border-[#ccc]">
      <ul class="flex">
        <CategoriesNavigationItem>
          <span class="flex justify-between">
            Sortiment
            <span class="h-[1.5rem] w-[1.5rem] ml-[1rem] flex items-center justify-center">
              <icons.ChevronDown class="w-[24px] h-[24px]" />
            </span>
          </span>
        </CategoriesNavigationItem>
        <CategoriesNavigationItem>Deine Produkte</CategoriesNavigationItem>
        <CategoriesNavigationItem isActive>Bio</CategoriesNavigationItem>
        <CategoriesNavigationItem>Regional</CategoriesNavigationItem>
        <CategoriesNavigationItem>Neu</CategoriesNavigationItem>
        <CategoriesNavigationItem>Weinfreunde</CategoriesNavigationItem>
      </ul>
    </nav>
  );
};

export type CategoriesNavigationItemProps = {
  children?: ComponentChildren;
  isActive?: boolean;
};

export const CategoriesNavigationItem = (props: CategoriesNavigationItemProps) => {
  return (
    <li
      class={classNames(
        "relative bg-[#fff] text-[#4c4c4c] box-border border-t border-l last:border-r border-[#ccc]",
        "p-[0.75rem_1rem_0.875rem] cursor-pointer text-[#1c1c1c]",
        props.isActive && "text-[#cc071e]",
        "hover:text-[#cc071e]",
        props.isActive && "after:absolute after:inset-0 after:h-[0.25rem] after:bg-[#cc071e]"
      )}
    >
      {props.children}
    </li>
  );
};
