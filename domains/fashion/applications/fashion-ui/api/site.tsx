/** @jsx createElement */
import { classNames, ComponentChildren, createElement, renderToString } from "../helper/jsx.ts";
import { Context } from "../model.ts";

// deno-lint-ignore require-await
export const handleSite = async (_ctx: Context, _req: Request): Promise<Response> => {
  const html = renderToString(
    <div class="bg-[#FBFAF9]">
      <HeaderContent />
      <ShoppingInteractions />
    </div>
  );

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
};

const HeaderContent = () => {
  return (
    <header
      class={classNames(
        "bg-[#f1f1f1]",
        "[box-shadow:inset_0px_-0.0625rem_0px_0px_#ccc,inset_0px_-0.3125rem_0px_0px_rgba(0,0,0,0.05)]"
      )}
    >
      <HeaderNavigation></HeaderNavigation>
    </header>
  );
};

const HeaderNavigation = () => {
  return <Header></Header>;
};

const Header = () => {
  return (
    <div class="flex">
      <a
        class={classNames(
          "flex items-center justify-center w-[10rem] h-[5rem]",
          "bg-[#cc071e] text-[#fffffe] text-[2rem] font-black uppercase cursor-pointer"
        )}
      >
        shop
      </a>
      <nav class="flex items-end">
        <FunnelNavigationTabs>
          <FunnelNavigationTab>Märkte & Angebote</FunnelNavigationTab>
          <FunnelNavigationTab isActive>Abholservice</FunnelNavigationTab>
          <FunnelNavigationTab>Rezepte & Ernährung</FunnelNavigationTab>
        </FunnelNavigationTabs>
      </nav>
    </div>
  );
};

type FunnelNavigationTabsProps = {
  children?: ComponentChildren;
};

const FunnelNavigationTabs = (props: FunnelNavigationTabsProps) => {
  return <ul class="flex items-end justify-stretch pl-[0.5rem] gap-[0.5rem]">{props.children}</ul>;
};

type FunnelNavigationTabProps = {
  children?: ComponentChildren;
  isActive?: boolean;
};

const FunnelNavigationTab = (props: FunnelNavigationTabProps) => {
  return (
    <li
      class={classNames(
        "relative z-0 flex h-[3rem] [box-shadow:0.25rem_0_0_0_rgba(0,0,0,0.05)]",
        "border-[0.0625rem] border-[#ccc] rounded-t-[0.125rem]",
        "cursor-pointer",
        "after:absolute after:inset-0 after:mb-[0.25rem] after:bg-[#fff] after:z-[-10]",
        props.isActive && "after:!mb-0 !h-[3.25rem] border-b-[#fff]",
        "hover:h-[3.25rem]"
      )}
    >
      <a
        class={classNames(
          "flex items-center justify-center text-[#1c1c1c] px-[1rem] text-[1.25rem] font-[500] whitespace-nowrap",
          props.isActive && "text-[#BB2929]",
          "hover:text-[#BB2929]"
        )}
      >
        {props.children}
      </a>
    </li>
  );
};

const ShoppingInteractions = () => {
  return (
    <div class="border-b border-[#ccc] bg-[#fff] h-[5rem] px-[1rem] flex items-center">suche</div>
  );
};
