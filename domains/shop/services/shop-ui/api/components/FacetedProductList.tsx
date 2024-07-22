/** @jsx createElement */
import { icons, LucideIcon } from "lucide-preact";
import { classNames, ComponentChildren, createElement } from "../../helper/jsx.ts";

export const FacetedProductList = () => {
  return (
    <div class="flex px-[15px] bg-[#fff]">
      <FacetList />
      <PageableProductList />
    </div>
  );
};

export const FacetList = () => {
  return (
    <aside class="flex">
      <FacetGroupListContainer>
        <FacetGroupContainer title="Kategorien">
          <FacetGroupOption title="Obst & Gemüse" />
          <FacetGroupOption title="Brot, Cerealien & Aufstriche" />
          <FacetGroupOption title="Drogerie & Kosmetik" />
          <FacetGroupOption title="Fertiggerichte & Konserven" />
          <FacetGroupOption title="Fleisch & Fisch" />
          <FacetGroupOption title="Getränke & Genussmittel" />
          <FacetGroupOption title="Haus & Freizeit" />
          <FacetGroupOption title="Kaffee, Tee & Kakao" />
          <FacetGroupOption title="Kochen & Backen" />
          <FacetGroupOption title="Käse, Eier & Molkerei" />
          <FacetGroupOption title="Süßes & Salziges" />
          <FacetGroupOption title="Tiefkühlkost" />
          <FacetGroupOption title="Öle, Soßen & Gewürze" />
        </FacetGroupContainer>

        <FacetGroupContainer title="Eigenschaften">
          <FacetGroupOptionCheckbox title="Alkoholfrei" />
          <FacetGroupOptionCheckbox title="Angebote" />
          <FacetGroupOptionCheckbox title="Bio" />
          <FacetGroupOptionCheckbox title="Glutenfrei" />
          <FacetGroupOptionCheckbox title="Laktosefrei" />
          <FacetGroupOptionCheckbox title="Neu" />
          <FacetGroupOptionCheckbox title="Regional" />
          <FacetGroupOptionCheckbox title="Tiefpreis" />
          <FacetGroupOptionCheckbox title="Vegan" />
          <FacetGroupOptionCheckbox title="Vegetarisch" />
        </FacetGroupContainer>

        <FacetGroupContainer title="Marken" isCollapsed />
      </FacetGroupListContainer>
    </aside>
  );
};

export type FacetGroupListContainerProps = {
  children?: ComponentChildren;
};

export const FacetGroupListContainer = (props: FacetGroupListContainerProps) => {
  return (
    <ul class="facet-group-list-container overflow-visible mb-[24px] mr-0 w-[230px]">
      {props.children}
    </ul>
  );
};

export type FacetGroupContainerProps = {
  title: string;
  children?: ComponentChildren;
  isCollapsed?: boolean;
};

export const FacetGroupContainer = (props: FacetGroupContainerProps) => {
  return (
    <li
      class={classNames(
        "facet-group-container flex flex-col bg-[#fff] rounded-[2px] mb-[16px]",
        "[box-shadow:0_1px_6px_0_rgba(0,0,0,0.28)]"
      )}
    >
      <label
        class={classNames(
          "facet-group-title group peer flex flex-col justify-center text-[1.125rem] leading-[1.15] font-[500] text-[#1c1c1c] hover:text-[#cc071e]",
          "h-[58px] p-[0_8px_0_16px] border-b border-[#ccc] cursor-pointer"
        )}
      >
        <input class="hidden" type="checkbox" checked={!props.isCollapsed} />
        <span class="flex justify-between">
          {props.title}
          <span class="mr-[8px] flex items-center justify-center">
            <icons.ChevronUp class="w-[18px] h-[18px] group-[:has(input:checked)]:rotate-180" />
          </span>
        </span>
      </label>

      <section class="hidden peer-[:has(input:checked)]:block">
        <FacetGroup>{props.children}</FacetGroup>
      </section>
    </li>
  );
};

export type FacetGroupProps = {
  children?: ComponentChildren;
};

export const FacetGroup = (props: FacetGroupProps) => {
  return <ul class="facet-group">{props.children}</ul>;
};

export type FacetGroupOptionProps = {
  title: string;
};

export const FacetGroupOption = (props: FacetGroupOptionProps) => {
  return (
    <li class="facet-group-option flex flex-col text-[16px] leading-[1.5] font-[400]">
      <button class="text-left text-[#1c1c1c] hover:bg-[#f1f1f1] p-[8px]">
        <div class="flex items-start gap-x-[8px]">
          <div class="inline-flex items-center justify-center w-[24px] h-[24px] shrink-0">
            <icons.Tag class="w-[20px] h-[20px] shrink-0 [stroke-width:calc(1.5px*24/20)]" />
          </div>
          <span>{props.title}</span>
        </div>
      </button>
    </li>
  );
};

export const FacetGroupOptionCheckbox = (props: FacetGroupOptionProps) => {
  return (
    <li class="facet-group-option flex flex-col text-[16px] leading-[1.5] font-[400]">
      <button class="text-left text-[#1c1c1c] hover:bg-[#f1f1f1] p-[8px]">
        <div class="flex items-start gap-x-[8px]">
          <div class="inline-flex items-center justify-center w-[24px] h-[24px] shrink-0">
            <icons.Square class="w-[20px] h-[20px] shrink-0 [stroke-width:calc(1.5px*24/20)]" />
          </div>
          <span>{props.title}</span>
        </div>
      </button>
    </li>
  );
};

export const PageableProductList = () => {
  return (
    <div class="w-full flex flex-col">
      <QuickFacetChips />
      <ProductList>
        <ProductTiles>
          <Product
            productTitle="Bio Banane ca. 200g"
            productGrammage="1 Stück"
            productPrice="0,00 €"
            amount={0}
          />
          <Product
            productTitle="Heidelbeeren 500g"
            productGrammage="1 Stück"
            productPrice="0,00 €"
            badge="sponsored"
            amount={1}
          />
          <Product
            productTitle="Bio Joghurt mild 3,8% 500g"
            productGrammage="1 Stück"
            productOfferDuration="bis 01.02.2023"
            productOfferPrice="0,00 €"
            badge="sponsored"
            amount={2}
          />
          <Product
            productTitle="Eisbergsalat 1 Stück"
            productGrammage="1 Stück"
            productPrice="0,00 €"
            amount={0}
          />
          <Product
            productTitle="Honigmelone 1 Stück"
            productGrammage="1 Stück"
            productPrice="0,00 €"
            badge="lowestPrice"
            amount={0}
          />
          <Product
            productTitle="Bio Erdbeeren 300g"
            productGrammage="1 Stück"
            productPrice="0,00 €"
            badge="regional"
            amount={0}
          />
        </ProductTiles>
      </ProductList>
    </div>
  );
};

export const QuickFacetChips = () => {
  return (
    <div class="flex overflow-x-scroll p-[2px_0_16px_16px] w-full [scrollbar-width:none]">
      <QuickFacetChip label="Angebote" count={123} isSelected />
      <QuickFacetChip label="Bio" icon={icons.Tag} count={940} />
      <QuickFacetChip label="Vegan" icon={icons.Tag} count={800} />
      <QuickFacetChip label="Neu" icon={icons.Tag} count={50} />
      <QuickFacetChip label="Alkoholfrei" icon={icons.Tag} count={85} />
    </div>
  );
};

export type QuickFacetChipProps = {
  label: string;
  count: number;
  icon?: LucideIcon;
  isSelected?: boolean;
};

export const QuickFacetChip = (props: QuickFacetChipProps) => {
  return (
    <button>
      <div
        class={classNames(
          "inline-flex items-center h-[40px] mr-[8px] px-[12px]",
          "rounded-full border border-[#949494] cursor-pointer hover:bg-[#f1f1f1]",
          props.isSelected && "bg-[#f1f1f1] hover:!bg-[#fff] !border-2 !border-[#1c1c1c]"
        )}
      >
        {props.icon && (
          <span class="mr-[4px] inline-flex items-center justify-center w-[24px] h-[24px] shrink-0">
            <props.icon class="w-[20px] h-[20px] shrink-0 [stroke-width:calc(1.5px*24/20)]" />
          </span>
        )}
        <span class="mx-[4px] text-[16px] font-[400] text-[#1c1c1c] whitespace-nowrap">
          {props.label}
        </span>
        {!props.isSelected && (
          <span class="text-[16px] font-[400] text-[#676767] mx-[4px]">{props.count}</span>
        )}
        {props.isSelected && (
          <span class="w-[20px] h-[20px] ml-[4px] flex items-center justify-center text-[#1c1c1c]">
            <icons.CircleX class="w-[20px] h-[20px] shrink-0 [stroke-width:calc(1.5px*24/20)]" />
          </span>
        )}
      </div>
    </button>
  );
};

export type ProductListProps = {
  children?: ComponentChildren;
};

export const ProductList = (props: ProductListProps) => {
  return <div class="w-full flex flex-col">{props.children}</div>;
};

export type ProductTilesProps = {
  children?: ComponentChildren;
};

export const ProductTiles = (props: ProductTilesProps) => {
  return <div class="mx-[8px] flex flex-wrap w-full justify-start">{props.children}</div>;
};

export type ProductProps = {
  productTitle: string;
  productGrammage: string;
  productPrice?: string;
  productOfferDuration?: string;
  productOfferPrice?: string;
  badge?: "sponsored" | "lowestPrice" | "regional";
  amount: number;
};

export const Product = (props: ProductProps) => {
  return (
    <div
      class={classNames(
        "product h-[416px] m-[0_8px_16px]",
        "w-[calc(33.3333%-16px)] xl:w-[calc(25%-16px)]",
        "border border-[#ccc] hover:border-[#1c1c1c] rounded-[2px] cursor-pointer",
        props.badge === "sponsored" && "!border-[#1c1c1c] hover:[outline:1px_solid_#1c1c1c]"
      )}
    >
      <a class="product-details-link relative">
        {props.badge === "sponsored" && <BadgeSponsored />}
        {props.badge === "lowestPrice" && <BadgeLowestPrice />}
        {props.badge === "regional" && <BadgeRegional />}
        <ProductPicture />
        <ProductDetails
          productTitle={props.productTitle}
          productGrammage={props.productGrammage}
          productPrice={props.productPrice}
          productOfferDuration={props.productOfferDuration}
          productOfferPrice={props.productOfferPrice}
        />
      </a>
      <div class="m-[8px_16px_16px]">
        <ProductActions amount={props.amount} />
      </div>
    </div>
  );
};

export const BadgeSponsored = () => {
  return (
    <div
      class={classNames(
        "absolute top-0 left-0 px-[8px] [border-bottom-right-radius:4px]",
        "bg-[#1c1c1c] text-[#fff] text-[0.875rem] leading-[1.5rem] font-[400]"
      )}
    >
      Gesponsert
    </div>
  );
};

export const BadgeRegional = () => {
  return (
    <div
      class={classNames(
        "absolute top-0 left-0 px-[8px] [border-bottom-right-radius:4px]",
        "bg-[#fdc300] text-[#1c1c1c] text-[1rem] font-[500]"
      )}
    >
      Regional
    </div>
  );
};

export const BadgeLowestPrice = () => {
  return (
    <div
      class={classNames(
        "absolute top-0 left-0 px-[8px] [border-bottom-right-radius:4px]",
        "bg-[#164193] text-[#fff] text-[1rem] font-[500]"
      )}
    >
      Tiefpreis
    </div>
  );
};

export const ProductPicture = () => {
  return (
    <div class="product-picture h-[152px] mt-[16px] mb-[8px]">
      <span class="flex items-center justify-center w-full h-full">
        <icons.Image class="w-[96px] h-[96px] text-[#949494] [stroke-width:calc(2px*24/96)]" />
      </span>
    </div>
  );
};

export type ProductDetailsProps = {
  productTitle: string;
  productGrammage: string;
  productPrice?: string;
  productOfferDuration?: string;
  productOfferPrice?: string;
};

export const ProductDetails = (props: ProductDetailsProps) => {
  return (
    <div class="product-details h-[172px] mx-[16px] flex flex-col">
      <div class="h-[24px] w-full"></div>
      <h4 class="min-h-[20px] max-h-[64px] font-[500] text-[1.125rem] leading-[1.11] text-[#1c1c1c]">
        {props.productTitle}
      </h4>
      <span class="h-[32px] font-[400] text-[0.875rem] leading-[1.15] text-[#1c1c1c] mt-[2px]">
        {props.productGrammage}
      </span>
      <span class="flex-1"></span>
      {props.productOfferDuration && props.productOfferPrice && (
        <div class="flex flex-col">
          <span class="h-[16px] font-[500] text-[0.875rem] leading-[1.15] text-[#cc071e]">
            {props.productOfferDuration}
          </span>
          <span class="h-[24px] font-[500] text-[1.125rem] leading-[1.33] text-[#cc071e] text-right">
            {props.productOfferPrice}
          </span>
        </div>
      )}
      {props.productPrice && (
        <span class="h-[24px] font-[500] text-[1.125rem] leading-[1.33] text-[#1c1c1c] text-right mt-auto">
          {props.productPrice}
        </span>
      )}
    </div>
  );
};

export type ProductActionsProps = {
  amount: number;
};

export const ProductActions = (props: ProductActionsProps) => {
  return (
    <div class="product-actions h-[40px] flex flex-nowrap items-start content-stretch justify-between">
      <div>
        <ProductFavoriteButton />
      </div>
      <div>
        <ProductBasketButton amount={props.amount} />
      </div>
    </div>
  );
};

export const ProductFavoriteButton = () => {
  return (
    <button
      class={classNames(
        "bg-[#fff] text-[#4c4c4c] border border-[#8c8c8c] rounded-[2px]",
        "hover:bg-[#f1f1f1] hover:border-hidden hover:border-transparent hover:[box-shadow:0_0_0_2px_#4c4c4c,0_0_0_2px_#4c4c4c]"
      )}
    >
      <span class="h-[40px] w-[40px] flex items-center justify-center">
        <icons.Heart class="h-[24px] w-[24px] shrink-0" />
      </span>
    </button>
  );
};

export type ProductBasketButtonProps = {
  amount: number;
};

export const ProductBasketButton = (props: ProductBasketButtonProps) => {
  return (
    <div>
      {props.amount === 0 && (
        <button
          class={classNames(
            "bg-[#bb2929] text-[#fff] rounded-[2px]",
            "hover:bg-[#911c1c] hover:[box-shadow:0_0_0_1px_#911c1c,0_0_0_1px_#911c1c]"
          )}
        >
          <span class="h-[40px] w-[80px] gap-[2px] flex items-center justify-center">
            <icons.ShoppingCart class="text-[#fff] h-[24px] w-[24px] shrink-0" />
            <icons.Plus class="h-[24px] w-[24px] shrink-0" />
          </span>
        </button>
      )}
      {props.amount > 0 && (
        <div class="flex">
          <button
            class={classNames(
              "bg-[#fff] text-[#4c4c4c] border border-[#8c8c8c] rounded-l-[2px] z-10",
              "hover:bg-[#f1f1f1] hover:rounded-[2px] hover:border-hidden hover:border-transparent hover:[box-shadow:0_0_0_2px_#4c4c4c,0_0_0_2px_#4c4c4c]"
            )}
          >
            <span class="h-[40px] w-[40px] gap-[2px] flex items-center justify-center">
              {props.amount === 1 && <icons.Trash2 class="h-[24px] w-[24px] shrink-0" />}
              {props.amount > 1 && <icons.Minus class="h-[24px] w-[24px] shrink-0" />}
            </span>
          </button>
          <input
            class={classNames(
              "w-[40px] bg-[#fff] hover:bg-[#f1f1f1;] text-[#1c1c1c] border-y border-[#676767]",
              "text-[1.125rem] leading-[1.1rem] [outline:0] text-center overflow-clip"
            )}
            type="text"
            pattern="[0-9]*"
            autocomplete="off"
            value={props.amount}
          />
          <button
            class={classNames(
              "bg-[#367b45] text-[#fff] rounded-r-[2px] z-10",
              "hover:bg-[#265B33] hover:rounded-[2px] hover:[box-shadow:0_0_0_1px_#265B33,0_0_0_1px_#265B33]"
            )}
          >
            <span class="h-[40px] w-[40px] gap-[2px] flex items-center justify-center">
              <icons.Plus class="h-[24px] w-[24px] shrink-0" />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
