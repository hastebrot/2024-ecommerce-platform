/** @jsx createElement */
import { icons, LucideIcon } from "lucide-preact";
import { classNames, ComponentChildren, createElement } from "../../helper/jsx.ts";

export const HeaderContent = () => {
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

export const HeaderNavigation = () => {
  return <Header></Header>;
};

export const Header = () => {
  return (
    <div class="flex">
      <a
        class={classNames(
          "flex items-center justify-center w-[10rem] h-[5rem]",
          "bg-[#cc071e] text-[#fffffe] text-[2rem] font-black uppercase cursor-pointer"
        )}
      >
        SHOP
      </a>
      <div class="header-navigation relative flex items-end w-full">
        <nav>
          <FunnelNavigationTabs>
            <FunnelNavigationTab>Märkte & Angebote</FunnelNavigationTab>
            <FunnelNavigationTab isActive>Abholservice</FunnelNavigationTab>
            <FunnelNavigationTab>Rezepte & Ernährung</FunnelNavigationTab>
          </FunnelNavigationTabs>
        </nav>
        <div class="absolute right-[1rem] top-[0.25rem]">
          <UserNavigation />
        </div>
      </div>
    </div>
  );
};

export type FunnelNavigationTabsProps = {
  children?: ComponentChildren;
};

export const FunnelNavigationTabs = (props: FunnelNavigationTabsProps) => {
  return <ul class="flex items-end justify-stretch pl-[0.5rem] gap-[0.5rem]">{props.children}</ul>;
};

export type FunnelNavigationTabProps = {
  children?: ComponentChildren;
  isActive?: boolean;
};

export const FunnelNavigationTab = (props: FunnelNavigationTabProps) => {
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

export const UserNavigation = () => {
  return (
    <ul class="flex">
      <UserNavigationItem icon={icons.House} text="shop.de" />
      <UserNavigationItem icon={icons.User} text="Anmelden" />
      <UserNavigationItem icon={icons.MapPin} text="11011 Berlin" />
    </ul>
  );
};

export type UserNavigationItemProps = {
  text: string;
  icon: LucideIcon;
};

export const UserNavigationItem = (props: UserNavigationItemProps) => {
  return (
    <li class="flex items-center ml-[1rem]">
      <a class="flex items-center text-[14px] leading-[18px] text-[#1c1c1c] hover:text-[#cc071e] cursor-pointer">
        <span class="w-[1.5rem] h-[1.5rem] flex items-center justify-center">
          <props.icon class="w-[1rem] h-[1rem] shrink-0" />
        </span>
        <span class="pl-[0.5rem] h-auto border-l border-[#ccc] ml-[4px]">{props.text}</span>
      </a>
    </li>
  );
};
