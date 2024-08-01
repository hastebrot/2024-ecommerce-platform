/** @jsx createElement */
import { icons } from "lucide-preact";
import { classNames, createElement } from "../../helper/jsx.ts";
import { Category } from "../../model.ts";

export type BreadcrumbsProps = {
  categoryPath: Category[];
};

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const lastIndex = Math.max(0, props.categoryPath.length - 1);

  return (
    <div class="breadcrumbs bg-[#fff] flex">
      <nav class="flex items-center justify-start flex-wrap m-[10px_0_0_15px] gap-x-[20px]">
        <BreadcrumbsLink text="Zurück" linkHref="?category=" isBackLink />
        {props.categoryPath.map((category, index) => {
          if (index < lastIndex) {
            return (
              <BreadcrumbsLink text={category.category} linkHref={`?category=${category.id}`} />
            );
          } else {
            return <BreadcrumbsItem text={category.category} />;
          }
        })}
      </nav>
    </div>
  );
};

export type BreadcrumbsLinkProps = {
  text: string;
  linkHref: string;
  isBackLink?: boolean;
};

export const BreadcrumbsLink = (props: BreadcrumbsLinkProps) => {
  // TODO(benjamin): in product details parent-links use text-[#4a4a4a].

  return (
    <a
      class={classNames(
        "breadcrumbs-link flex items-center text-[0.875rem] leading-[1.125rem] text-[#1c1c1c]",
        "hover:text-[#cc071e] cursor-pointer",
      )}
      href={props.linkHref}
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
    <div
      class={classNames(
        "breadcrumbs-item flex items-center text-[0.875rem] leading-[1.125rem] text-[#1c1c1c]",
      )}
    >
      {props.text}
    </div>
  );
};
