/** @jsx createElement */
import { icons } from "lucide-preact";
import { classNames, createElement } from "../../helper/jsx.ts";
import { ProductActions } from "./FacetedProductList.tsx";

export const ShoppingHeader = () => {
  return (
    <div class="border-b border-[#ccc] bg-[#fff] h-[5rem] px-[1rem] flex items-center justify-between">
      <ShoppingSearch isHeaderSearch />
      <ShoppingNavigation />
    </div>
  );
};

export type ShoppingSearchProps = {
  isHeaderSearch?: boolean;
};

export const ShoppingSearch = (props: ShoppingSearchProps) => {
  return (
    <div class={classNames("relative group", props.isHeaderSearch ? "w-[440px]" : "w-[640px]")}>
      <input
        class={classNames(
          "peer rounded-[2px] p-[10px] h-[48px] w-full [outline:0]",
          "[box-shadow:0_0_0_1px_#676767] text-[#1c1c1c] placeholder:text-[#858585]",
          "hover:[box-shadow:0_0_0_2px_#1c1c1c] hover:bg-[#f1f1f1]",
          "focus:[box-shadow:0_0_0_2px_#1c1c1c] focus:bg-[#fff]",
        )}
        placeholder="Suche"
      />
      <button
        class={classNames(
          "absolute right-0 inset-y-0 flex items-center justify-center",
          "w-[48px] h-[48px] rounded-r-[2px]",
          "peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-[#1c1c1c]",
          "peer-placeholder-shown:pointer-events-none",
          "bg-[#cc071e] hover:bg-[#9e0012] text-[#fff]",
        )}
        type="submit"
      >
        <icons.Search class="w-[24px] h-[24px] shrink-0" />
      </button>
      <div
        class={classNames(
          "hidden group-focus-within:block peer-placeholder-shown:hidden",
          "absolute top-[calc(48px+1px)] left-[-2px] w-[calc(640px+4px)] z-50",
        )}
        tabIndex={-1}
      >
        <ShoppingSearchSuggestions />
      </div>
    </div>
  );
};

export const ShoppingSearchSuggestions = () => {
  return (
    <section
      class={classNames(
        "shopping-search-suggestions bg-[#fff] border border-[#ccc]",
        "flex flex-col",
        "[box-shadow:0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)]",
      )}
    >
      <ul>
        <ShoppingSearchProduct
          productTitle="Pfanner Multivitamin ACE 1,5l (EINWEG)"
          productGrammage="1,50l (1 l = 1,26 €) zzgl. 0,25 € Pfand"
          amount={0}
        />
        <ShoppingSearchProduct
          productTitle="Beckers Bester Frühstücksvitamine ACE 1l (MEHRWEG)"
          productGrammage="1l zzgl. 0,15 € Pfand"
          amount={1}
        />
        <ShoppingSearchProduct
          productTitle="Valensina Frühstücks-ACE 1l (EINWEG)"
          productGrammage="1l zzgl. 0,25 € Pfand"
          amount={2}
        />
      </ul>

      <div class="w-full bg-[#f1f1f1] p-[16px]">
        <a
          class={classNames(
            "font-[400] text-[16px] leading-[1.5] flex items-center justify-center",
            "h-[48px] w-full max-w-[288px] rounded-[2px] bg-[#cc071e] text-[#fff] m-auto",
            "hover:bg-[#9e0012] cursor-pointer",
          )}
        >
          Alle Suchergebnisse anzeigen
        </a>
      </div>
    </section>
  );
};

export type ShoppingSearchSuggestionProps = {
  productTitle: string;
  productGrammage: string;
  amount: number;
};

export const ShoppingSearchProduct = (props: ShoppingSearchSuggestionProps) => {
  return (
    <li class="flex border-b border-[#ccc]">
      <div class="w-[120px] h-[120px]">
        <a class="my-[16px]">
          <span class="flex items-center justify-center w-full h-full">
            <icons.Image class="w-[72px] h-[72px] text-[#949494] [stroke-width:calc(2px*24/72)]" />
          </span>
        </a>
      </div>
      <div class="w-[calc(100%-120px-200px)] flex flex-col pr-[16px]">
        <a class="font-[500] text-[#1c1c1c] text-[18px] leading-[1.3] mt-[16px] mb-[8px]">
          {props.productTitle}
        </a>
        <div class="font-[400] text-[#1c1c1c] text-[14px]">{props.productGrammage}</div>
      </div>
      <div class="w-[200px] m-[16px] ml-0 flex flex-col justify-between">
        <div class="font-[500] text-[18px] text-[#1c1c1c] whitespace-nowrap text-right mb-[8px]">
          0,00 €
        </div>
        <div class="w-full">
          <ProductActions amount={props.amount} />
        </div>
      </div>
    </li>
  );
};

export const ShoppingNavigation = () => {
  return (
    <div class="flex items-center ml-[1rem] gap-[1rem]">
      <ShoppingNavigationItemFavorites />
      <ShoppingNavigationItemBasket price="0,00 €" />
      {/* <ShoppingNavigationItemBasket price="12,34 €" amount={2} isFilled /> */}
    </div>
  );
};

export const ShoppingNavigationItemFavorites = () => {
  return (
    <button
      class={classNames(
        "flex h-[3rem] min-w-[8.5625rem] rounded-[0.125rem] text-[#1c1c1c] bg-[#fff] px-[0.5rem] border border-[#ccc] items-center justify-start",
        "hover:bg-[#f1f1f1] hover:border-[#1c1c1c] hover:[box-shadow:inset_0_0_0_1px_#1c1c1c]",
      )}
    >
      <span class="w-[2rem] h-[2rem] mr-[0.5rem] flex items-center justify-center">
        <icons.Heart />
      </span>
      <span class="text-[0.875rem] text-[#1c1c1c] font-[500] text-left">Favoriten</span>
    </button>
  );
};

export type ShoppingNavigationItemBasketProps = {
  price: string;
  amount?: number;
  isFilled?: boolean;
};

export const ShoppingNavigationItemBasket = (props: ShoppingNavigationItemBasketProps) => {
  return (
    <button
      class={classNames(
        "group flex h-[3rem] min-w-[8.5625rem] rounded-[0.125rem] text-[#1c1c1c] bg-[#fff] px-[0.5rem] border border-[#ccc] items-center justify-start",
        !props.isFilled &&
          "hover:bg-[#f1f1f1] hover:border-[#1c1c1c] hover:[box-shadow:inset_0_0_0_1px_#1c1c1c]",
        props.isFilled && [
          "!bg-[#007d3e] !border-[#007d3e] !text-[#fff]",
          "hover:!bg-[#005c2e] hover:!border-[#005c2e]",
        ],
      )}
    >
      <span class="relative">
        <span class="w-[2rem] h-[2rem] mr-[0.5rem] flex items-center justify-center">
          <icons.ShoppingCart />
        </span>
        {props.amount && (
          <span
            class={classNames(
              "absolute top-[-4px] right-[-1px]",
              "flex items-center justify-center",
              "text-[14px] leading-[1] font-[500] bg-[#fff] text-[#007d3e]",
              "rounded-[13px] border-2 border-[#007d3e]",
              "p-[3px_4px] h-[24px] min-w-[24px] max-w-[30px]",
              "group-hover:!text-[#005c2e] group-hover:!border-[#005c2e]",
            )}
          >
            {props.amount}
          </span>
        )}
      </span>
      <span
        class={classNames("text-[0.875rem] font-[500] text-left", props.isFilled && "ml-[0.5rem]")}
      >
        {props.price}
      </span>
    </button>
  );
};
