/** @jsx createElement */
import { icons } from "lucide-preact";
import { classNames, createElement } from "../../helper/jsx.ts";

export const Breadcrumbs = () => {
  return (
    <div class="bg-[#fff] flex">
      <nav class="flex items-center justify-start flex-wrap m-[10px_0_0_15px] gap-x-[20px]">
        <BreadcrumbsLink text="Zurück" isBackLink />
        <BreadcrumbsLink text="Obst & Gemüse" />
        <BreadcrumbsItem text="Frisches Obst" />
      </nav>
    </div>
  );
};

export type BreadcrumbsLinkProps = {
  text: string;
  isBackLink?: boolean;
};

export const BreadcrumbsLink = (props: BreadcrumbsLinkProps) => {
  // TODO(benjamin): in product details parent-links use text-[#4a4a4a].

  return (
    <a
      class={classNames(
        "flex items-center text-[0.875rem] leading-[1.125rem] text-[#1c1c1c]",
        "hover:text-[#cc071e] cursor-pointer",
      )}
    >
      <div class="mr-[3px] flex items-center">
        {props.isBackLink && (
          <icons.ChevronLeft class="h-[10px] w-[10px] shrink-0 [stroke-width:calc(2px*24/10)]" />
        )}
        {!props.isBackLink && (
          <icons.ChevronRight class="h-[10px] w-[10px] shrink-0 [stroke-width:calc(2px*24/10)]" />
        )}
      </div>
      {props.text}
    </a>
  );
};

export type BreadcrumbsItemProps = {
  text: string;
};

export const BreadcrumbsItem = (props: BreadcrumbsItemProps) => {
  // TODO(benjamin): in product details leaf-link uses text-[#bb2929].

  return (
    <div class={classNames("flex items-center text-[0.875rem] leading-[1.125rem] text-[#1c1c1c]")}>
      {props.text}
    </div>
  );
};
