/** @jsx createElement */
import { icons } from "lucide-preact";
import { classNames, createElement } from "../../helper/jsx.ts";
import * as model from "../../model.ts";

export type DisplayOptionsProps = {
  products: model.Product[];
  isSearchResult?: boolean;
};

export const DisplayOptions = (props: DisplayOptionsProps) => {
  const productsCount = props.products.length;

  return (
    <div class="display-options bg-[#fff] py-[16px] px-[15px] flex items-center justify-between">
      <div>
        {!props.isSearchResult && (
          <DisplayOptionsResultsText
            headlineText="Frisches Obst"
            countText={`${productsCount} Artikel`}
          />
        )}
        {props.isSearchResult && (
          <DisplayOptionsSearchResultsText text={`${productsCount} Artikel`} />
        )}
      </div>
      <div>
        <DisplayOptionsResultsPerPageSelect />
        <DisplayOptionsResultsSortingSelect />
      </div>
    </div>
  );
};

export type DisplayOptionsResultsTextProps = {
  headlineText?: string;
  countText: string;
};

export const DisplayOptionsResultsText = (props: DisplayOptionsResultsTextProps) => {
  return (
    <div class="results-text inline-block text-[#676767] text-[0.875rem] leading-[1.6] font-[400]">
      {props.headlineText && (
        <h1 class="inline-block text-[#1c1c1c] text-[1.125rem] leading-[1.125rem] pr-[12px] font-[700]">
          {props.headlineText}
        </h1>
      )}
      {props.countText}
    </div>
  );
};

export type DisplayOptionsSearchResultsTextProps = {
  text: string;
};

export const DisplayOptionsSearchResultsText = (props: DisplayOptionsSearchResultsTextProps) => {
  return (
    <h1 class="results-text inline-block text-[#1c1c1c] text-[1rem] leading-[1.125rem] font-[400]">
      {props.text}
    </h1>
  );
};

export const DisplayOptionsResultsPerPageSelect = () => {
  return (
    <span>
      <label class="text-[#1c1c1c] ml-[20px] mr-[8px] text-[16px]">Artikel pro Seite</label>
      <button
        class={classNames(
          "relative [box-shadow:0_0_0_1px_#676767] text-[#1c1c1c]",
          "rounded-[2px] p-[0_40px_0_8px] h-[40px] text-[18px]",
          "hover:[box-shadow:0_0_0_2px_#1c1c1c] hover:cursor-pointer",
        )}
      >
        40
        <div class="absolute h-full top-0 right-[8px] flex items-center justify-center">
          <icons.ChevronsUpDown class="h-[24px] w-[24px] text-[#1c1c1c]" />
        </div>
      </button>
    </span>
  );
};

export const DisplayOptionsResultsSortingSelect = () => {
  return (
    <span>
      <label class="text-[#1c1c1c] ml-[20px] mr-[8px] text-[16px]">Sortieren</label>
      <button
        class={classNames(
          "relative [box-shadow:0_0_0_1px_#676767] text-[#1c1c1c]",
          "rounded-[2px] p-[0_40px_0_8px] h-[40px] text-[18px] text-left",
          "hover:[box-shadow:0_0_0_2px_#1c1c1c] hover:cursor-pointer",
        )}
      >
        Relevanz
        <span class="block h-0 w-full overflow-hidden">Preis aufsteigend</span>
        <div class="absolute h-full top-0 right-[8px] flex items-center justify-center">
          <icons.ChevronsUpDown class="h-[24px] w-[24px] text-[#1c1c1c]" />
        </div>
      </button>
    </span>
  );
};
