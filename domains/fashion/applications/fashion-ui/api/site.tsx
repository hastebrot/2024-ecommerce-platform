/** @jsx createElement */
import { icons, LucideIcon } from "lucide-preact";
import {
  classNames,
  ComponentChild,
  ComponentChildren,
  createElement,
  renderToString,
} from "../helper/jsx.ts";
import { Context } from "../model.ts";

// deno-lint-ignore require-await
export const handleSite = async (_ctx: Context, _req: Request): Promise<Response> => {
  const html = renderToString(
    <div class="bg-[#FBFAF9] [font-stretch:95%]">
      <HeaderContent />
      <ShoppingInteractions />
      <CategoriesNavigation />
      <Breadcrumbs />
      <DisplayOptions />
      <FacetedProductList />
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

const UserNavigation = () => {
  return (
    <ul class="flex">
      <UserNavigationItem icon={icons.House} text="shop.de" />
      <UserNavigationItem icon={icons.User} text="Anmelden" />
      <UserNavigationItem icon={icons.MapPin} text="11011 Berlin" />
    </ul>
  );
};

type UserNavigationItemProps = {
  text: string;
  icon: LucideIcon;
};

const UserNavigationItem = (props: UserNavigationItemProps) => {
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

const ShoppingInteractions = () => {
  return (
    <div class="border-b border-[#ccc] bg-[#fff] h-[5rem] px-[1rem] flex items-center justify-between">
      <ShoppingSearch />
      <ShoppingNavigation />
    </div>
  );
};

const ShoppingSearch = () => {
  return (
    <div class="w-[440px] relative">
      <input
        class={classNames(
          "rounded-[2px] p-[10px] h-[48px] w-full [outline:0]",
          "[box-shadow:0_0_0_1px_#676767] text-[#1c1c1c] placeholder:text-[#858585]",
          "hover:[box-shadow:0_0_0_2px_#1c1c1c] hover:bg-[#f1f1f1]",
          "focus:[box-shadow:0_0_0_2px_#1c1c1c] focus:bg-[#fff]"
        )}
        placeholder="Suche"
      />
      <button
        class="absolute right-0 inset-y-0 flex items-center justify-center text-[#1c1c1c] w-[48px] h-[48px] pointer-events-none"
        type="submit"
      >
        <icons.Search class="w-[24px] h-[24px]" />
      </button>
    </div>
  );
};

const ShoppingNavigation = () => {
  return (
    <div class="flex items-center gap-[1rem]">
      <ShoppingNavigationItemFavorites />
      <ShoppingNavigationItemBasket />
    </div>
  );
};

const ShoppingNavigationItemFavorites = () => {
  return (
    <button
      class={classNames(
        "flex h-[3rem] min-w-[8.5625rem] rounded-[0.125rem] text-[#1c1c1c] bg-[#fff] px-[0.5rem] border border-[#ccc] items-center justify-start",
        "hover:bg-[#f1f1f1] hover:border-[#1c1c1c] hover:[box-shadow:inset_0_0_0_1px_#1c1c1c]"
      )}
    >
      <span class="w-[2rem] h-[2rem] mr-[0.5rem] flex items-center justify-center">
        <icons.Heart />
      </span>
      <span class="text-[0.875rem] text-[#1c1c1c] font-[500] text-left">Favoriten</span>
    </button>
  );
};

const ShoppingNavigationItemBasket = () => {
  return (
    <button
      class={classNames(
        "flex h-[3rem] min-w-[8.5625rem] rounded-[0.125rem] text-[#1c1c1c] bg-[#fff] px-[0.5rem] border border-[#ccc] items-center justify-start",
        "hover:bg-[#f1f1f1] hover:border-[#1c1c1c] hover:[box-shadow:inset_0_0_0_1px_#1c1c1c]"
      )}
    >
      <span class="w-[2rem] h-[2rem] mr-[0.5rem] flex items-center justify-center">
        <icons.ShoppingCart />
      </span>
      <span class="text-[0.875rem] text-[#1c1c1c] font-[500] text-left">0,00 &euro;</span>
    </button>
  );
};

const CategoriesNavigation = () => {
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

type CategoriesNavigationItemProps = {
  children?: ComponentChildren;
  isActive?: boolean;
};

const CategoriesNavigationItem = (props: CategoriesNavigationItemProps) => {
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

const Breadcrumbs = () => {
  return (
    <div class="bg-[#fff] flex">
      <nav class="flex items-center justify-start flex-wrap m-[10px_0_0_15px]">
        <a class="flex text-[#1c1c1c] hover:text-[#cc071e] cursor-pointer text-[0.875rem] leading-[1.125rem]">
          <div class="mr-[3px] flex items-center">
            <icons.ChevronLeft class="h-[10px] w-[10px]" />
          </div>
          Zurück
        </a>
      </nav>
    </div>
  );
};

const DisplayOptions = () => {
  return (
    <div class="bg-[#fff] py-[16px] px-[15px] flex items-center justify-between">
      <div>
        <DisplayOptionsResultsText />
      </div>
      <div>
        <DisplayOptionsResultsPerPageSelect />
        <DisplayOptionsResultsSortingSelect />
      </div>
    </div>
  );
};

const DisplayOptionsResultsText = () => {
  return <span class="text-[#676767]">1008 Artikel</span>;
};

const DisplayOptionsResultsPerPageSelect = () => {
  return (
    <span>
      <label class="text-[#1c1c1c] ml-[20px] mr-[8px] text-[16px]">Artikel pro Seite</label>
      <button
        class={classNames(
          "relative [box-shadow:0_0_0_1px_#676767] text-[#1c1c1c]",
          "rounded-[2px] p-[0_40px_0_8px] h-[40px] text-[18px]",
          "hover:[box-shadow:0_0_0_2px_#1c1c1c] hover:cursor-pointer"
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

const DisplayOptionsResultsSortingSelect = () => {
  return (
    <span>
      <label class="text-[#1c1c1c] ml-[20px] mr-[8px] text-[16px]">Sortieren</label>
      <button
        class={classNames(
          "relative [box-shadow:0_0_0_1px_#676767] text-[#1c1c1c]",
          "rounded-[2px] p-[0_40px_0_8px] h-[40px] text-[18px] text-left",
          "hover:[box-shadow:0_0_0_2px_#1c1c1c] hover:cursor-pointer"
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

const FacetedProductList = () => {
  return (
    <div class="flex px-[15px] bg-[#fff]">
      <FacetList />
      <PageableProductList />
    </div>
  );
};

const FacetList = () => {
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
          <FacetGroupOption title="Alkoholfrei" />
          <FacetGroupOption title="Angebote" />
          <FacetGroupOption title="Bio" />
          <FacetGroupOption title="Glutenfrei" />
          <FacetGroupOption title="Laktosefrei" />
          <FacetGroupOption title="Neu" />
          <FacetGroupOption title="Regional" />
          <FacetGroupOption title="Tiefpreis" />
          <FacetGroupOption title="Vegan" />
          <FacetGroupOption title="Vegetarisch" />
        </FacetGroupContainer>

        <FacetGroupContainer title="Marken" />
      </FacetGroupListContainer>
    </aside>
  );
};

type FacetGroupListContainerProps = {
  children?: ComponentChildren;
};

const FacetGroupListContainer = (props: FacetGroupListContainerProps) => {
  return (
    <ul class="facet-group-list-container overflow-visible mb-[24px] mr-0 w-[230px]">
      {props.children}
    </ul>
  );
};

type FacetGroupContainerProps = {
  title: string;
  children?: ComponentChildren;
};

const FacetGroupContainer = (props: FacetGroupContainerProps) => {
  return (
    <li class="facet-group-container flex flex-col bg-[#fff] rounded-[2px] [box-shadow:0_1px_6px_0_rgba(0,0,0,0.28)] mb-[16px]">
      <button
        class={classNames(
          "facet-group-title text-left text-[1.125rem] leading-[1.15] font-[500] text-[#1c1c1c] hover:text-[#cc071e]",
          "h-[58px] p-[0_8px_0_16px] border-b border-[#ccc] cursor-pointer"
        )}
      >
        <span class="flex justify-between">
          {props.title}
          <span class="mr-[8px] flex items-center justify-center">
            <icons.ChevronDown class="w-[18px] h-[18px]" />
          </span>
        </span>
      </button>

      <FacetGroup>{props.children}</FacetGroup>
    </li>
  );
};

type FacetGroupProps = {
  children?: ComponentChildren;
};

const FacetGroup = (props: FacetGroupProps) => {
  return <ul class="facet-group">{props.children}</ul>;
};

type FacetGroupOptionProps = {
  title: string;
};

const FacetGroupOption = (props: FacetGroupOptionProps) => {
  return (
    <li class="facet-group-option flex flex-col text-[16px] font-[400]">
      <button class="text-left text-[#1c1c1c] hover:bg-[#f1f1f1] p-[8px_8px_8px_16px]">
        {props.title}
      </button>
    </li>
  );
};

const PageableProductList = () => {
  return (
    <div class="w-full flex flex-col">
      <QuickFacetChips />
      <ProductList>
        <ProductTiles>
          <Product
            productTitle="Bio Banane ca. 200g"
            productGrammage="1 Stück"
            productPrice="0,00 €"
          />
          <Product
            productTitle="Heidelbeeren 500g"
            productGrammage="1 Stück"
            productPrice="0,00 €"
          />
          <Product
            productTitle="Bio Joghurt mild 3,8% 500g"
            productGrammage="1 Stück"
            productPrice="0,00 €"
          />
          <Product
            productTitle="Eisbergsalat 1 Stück"
            productGrammage="1 Stück"
            productPrice="0,00 €"
          />
          <Product
            productTitle="Honigmelone 1 Stück"
            productGrammage="1 Stück"
            productPrice="0,00 €"
          />
          <Product
            productTitle="Bio Erdbeeren 300g"
            productGrammage="1 Stück"
            productPrice="0,00 €"
          />
        </ProductTiles>
      </ProductList>
    </div>
  );
};

const QuickFacetChips = () => {
  return (
    <div class="flex overflow-x-scroll p-[2px_0_16px_16px] w-full [scrollbar-width:none]">
      <QuickFacetChip label="Angebote" count={123} />
      <QuickFacetChip label="Bio" count={940} />
      <QuickFacetChip label="Vegan" count={800} />
      <QuickFacetChip label="Neu" count={50} />
      <QuickFacetChip label="Alkoholfrei" count={85} />
    </div>
  );
};

type QuickFacetChipProps = {
  label: string;
  count: number;
  iconSlot?: ComponentChild;
};

const QuickFacetChip = (props: QuickFacetChipProps) => {
  return (
    <button>
      <div class="inline-flex items-center h-[40px] mr-[8px] px-[12px] rounded-full border border-[#949494] cursor-pointer hover:bg-[#f1f1f1]">
        {props.iconSlot && <span>{props.iconSlot}</span>}
        <span class="mx-[4px] text-[16px] font-[400] text-[#1c1c1c] whitespace-nowrap">
          {props.label}
        </span>
        <span class="text-[16px] font-[400] text-[#676767] mx-[4px]">{props.count}</span>
      </div>
    </button>
  );
};

type ProductListProps = {
  children?: ComponentChildren;
};

const ProductList = (props: ProductListProps) => {
  return <div class="w-full flex flex-col">{props.children}</div>;
};

type ProductTilesProps = {
  children?: ComponentChildren;
};

const ProductTiles = (props: ProductTilesProps) => {
  return <div class="mx-[8px] flex flex-wrap w-full justify-start">{props.children}</div>;
};

type ProductProps = {
  productTitle: string;
  productGrammage: string;
  productPrice: string;
};

const Product = (props: ProductProps) => {
  return (
    <div
      class={classNames(
        "product h-[416px] w-[calc(33.3333%-16px)] m-[0_8px_16px]",
        "border border-[#ccc] hover:border-[#1c1c1c] rounded-[2px] cursor-pointer"
      )}
    >
      <a class="product-details-link">
        <ProductPicture />
        <ProductDetails
          productTitle={props.productTitle}
          productGrammage={props.productGrammage}
          productPrice={props.productPrice}
        />
      </a>
      <ProductActions />
    </div>
  );
};

const ProductPicture = () => {
  return (
    <div class="product-picture h-[152px] mt-[16px] mb-[8px]">
      <span class="flex items-center justify-center w-full h-full">
        <icons.Image class="w-[96px] h-[96px] text-[#949494] [stroke-width:calc(2px*24/96)]" />
      </span>
    </div>
  );
};

type ProductDetailsProps = {
  productTitle: string;
  productGrammage: string;
  productPrice: string;
};

const ProductDetails = (props: ProductDetailsProps) => {
  return (
    <div class="product-details h-[172px] mx-[16px] flex flex-col">
      <div class="h-[24px] w-full"></div>
      <span class="text-[#1c1c1c] text-[1.125rem] leading-[1.11] font-[500]">
        {props.productTitle}
      </span>
      <span class="text-[#1c1c1c] text-[0.875rem] h-[32px] font-[400]">
        {props.productGrammage}
      </span>
      <span class="flex-1"></span>
      <span class="text-right font-[500] leading-[1.33] text-[#1c1c1c] mt-auto">
        {props.productPrice}
      </span>
    </div>
  );
};

const ProductActions = () => {
  return (
    <div class="product-actions h-[40px] m-[8px_16px_16px]">
      <div class="flex flex-nowrap items-start content-stretch justify-between">
        <div>
          <ProductFavoriteButton />
        </div>
        <div>
          <ProductBasketButton />
        </div>
      </div>
    </div>
  );
};

const ProductFavoriteButton = () => {
  return (
    <button
      class={classNames(
        "bg-[#fff] text-[#1c1c1c] border border-[#8c8c8c] rounded-[2px]",
        "hover:bg-[#f1f1f1] hover:border-hidden hover:border-transparent hover:[box-shadow:0_0_0_2px_#4c4c4c,0_0_0_2px_#4c4c4c]"
      )}
    >
      <span class="h-[40px] w-[40px] flex items-center justify-center">
        <icons.Heart class="text-[#4c4c4c] h-[24px] w-[24px] shrink-0" />
      </span>
    </button>
  );
};

const ProductBasketButton = () => {
  return (
    <button
      class={classNames(
        "bg-[#bb2929] text-[#fff] rounded-[2px]",
        "hover:bg-[#911c1c] hover:[box-shadow:0_0_0_1px_#911c1c,0_0_0_1px_#911c1c]"
      )}
    >
      <span class="h-[40px] w-[80px] gap-[2px] flex items-center justify-center">
        <icons.ShoppingCart class="text-[#fff] h-[24px] w-[24px] shrink-0" />
        <icons.Plus class="text-[#fff] h-[24px] w-[24px] shrink-0" />
      </span>
    </button>
  );
};
