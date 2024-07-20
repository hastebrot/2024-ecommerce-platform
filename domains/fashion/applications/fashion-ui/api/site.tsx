/** @jsx createElement */
import { icons, LucideIcon } from "lucide-preact";
import { classNames, ComponentChildren, createElement, renderToString } from "../helper/jsx.ts";
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
      <Footer />
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
    <div class="w-[440px] relative group">
      <input
        class={classNames(
          "peer rounded-[2px] p-[10px] h-[48px] w-full [outline:0]",
          "[box-shadow:0_0_0_1px_#676767] text-[#1c1c1c] placeholder:text-[#858585]",
          "hover:[box-shadow:0_0_0_2px_#1c1c1c] hover:bg-[#f1f1f1]",
          "focus:[box-shadow:0_0_0_2px_#1c1c1c] focus:bg-[#fff]"
        )}
        placeholder="Suche"
      />
      <button
        class={classNames(
          "absolute right-0 inset-y-0 flex items-center justify-center",
          "w-[48px] h-[48px] rounded-r-[2px]",
          "peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-[#1c1c1c]",
          "peer-placeholder-shown:pointer-events-none",
          "bg-[#cc071e] hover:bg-[#9e0012] text-[#fff]"
        )}
        type="submit"
      >
        <icons.Search class="w-[24px] h-[24px] shrink-0" />
      </button>
      <div
        class={classNames(
          "hidden group-focus-within:block peer-placeholder-shown:hidden",
          "absolute top-[calc(48px+1px)] left-0 w-[40rem] z-50"
        )}
        tabIndex={-1}
      >
        <ShoppingSearchSuggestions />
      </div>
    </div>
  );
};

const ShoppingSearchSuggestions = () => {
  return (
    <section
      class={classNames(
        "shopping-search-suggestions bg-[#fff] border border-[#ccc]",
        "flex flex-col",
        "[box-shadow:0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)]"
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
            "hover:bg-[#9e0012] cursor-pointer"
          )}
        >
          Alle Suchergebnisse anzeigen
        </a>
      </div>
    </section>
  );
};

type ShoppingSearchSuggestionProps = {
  productTitle: string;
  productGrammage: string;
  amount: number;
};

const ShoppingSearchProduct = (props: ShoppingSearchSuggestionProps) => {
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

const ShoppingNavigation = () => {
  return (
    <div class="flex items-center gap-[1rem]">
      <ShoppingNavigationItemFavorites />
      <ShoppingNavigationItemBasket price="0,00 €" />
      <ShoppingNavigationItemBasket price="12,34 €" amount={2} isFilled />
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

type ShoppingNavigationItemBasketProps = {
  price: string;
  amount?: number;
  isFilled?: boolean;
};

const ShoppingNavigationItemBasket = (props: ShoppingNavigationItemBasketProps) => {
  return (
    <button
      class={classNames(
        "group flex h-[3rem] min-w-[8.5625rem] rounded-[0.125rem] text-[#1c1c1c] bg-[#fff] px-[0.5rem] border border-[#ccc] items-center justify-start",
        !props.isFilled &&
          "hover:bg-[#f1f1f1] hover:border-[#1c1c1c] hover:[box-shadow:inset_0_0_0_1px_#1c1c1c]",
        props.isFilled && "!bg-[#007d3e] !border-[#007d3e] !text-[#fff]",
        props.isFilled && "hover:!bg-[#005c2e] hover:!border-[#005c2e]"
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
              "group-hover:!text-[#005c2e] group-hover:!border-[#005c2e]"
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
      <nav class="flex items-center justify-start flex-wrap m-[10px_0_0_15px] gap-x-[20px]">
        <BreadcrumbsLink text="Zurück" isBackLink />
        <BreadcrumbsLink text="Obst & Gemüse" />
        <BreadcrumbsItem text="Frisches Obst" />
      </nav>
    </div>
  );
};

type BreadcrumbsLinkProps = {
  text: string;
  isBackLink?: boolean;
};

const BreadcrumbsLink = (props: BreadcrumbsLinkProps) => {
  return (
    <a
      class={classNames(
        "flex items-center text-[0.875rem] leading-[1.125rem] text-[#1c1c1c]",
        "hover:text-[#cc071e] cursor-pointer"
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

type BreadcrumbsItemProps = {
  text: string;
};

const BreadcrumbsItem = (props: BreadcrumbsItemProps) => {
  return (
    <div class={classNames("flex items-center text-[0.875rem] leading-[1.125rem] text-[#1c1c1c]")}>
      {props.text}
    </div>
  );
};

const DisplayOptions = () => {
  const isSearchResult = false;

  return (
    <div class="bg-[#fff] py-[16px] px-[15px] flex items-center justify-between">
      <div>
        <DisplayOptionsResultsText headlineText="Frisches Obst" text="108 Artikel" />
        {isSearchResult && <DisplayOptionsResultsSearchHeadlineText text="1008 Artikel" />}
      </div>
      <div>
        <DisplayOptionsResultsPerPageSelect />
        <DisplayOptionsResultsSortingSelect />
      </div>
    </div>
  );
};

type DisplayOptionsResultsTextProps = {
  headlineText?: string;
  text: string;
};

const DisplayOptionsResultsText = (props: DisplayOptionsResultsTextProps) => {
  return (
    <span class="inline-block text-[#676767] text-[0.875rem] leading-[1.6] font-[400]">
      {props.headlineText && (
        <h1 class="inline-block text-[#1c1c1c] text-[1.125rem] leading-[1.125rem] pr-[12px] font-[700]">
          {props.headlineText}
        </h1>
      )}
      {props.text}
    </span>
  );
};

type DisplayOptionsResultsTextSearchHeadlineProps = {
  text: string;
};

const DisplayOptionsResultsSearchHeadlineText = (
  props: DisplayOptionsResultsTextSearchHeadlineProps
) => {
  return (
    <h1 class="inline-block text-[#1c1c1c] text-[1rem] leading-[1.125rem] font-[400]">
      {props.text}
    </h1>
  );
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
  isCollapsed?: boolean;
};

const FacetGroupContainer = (props: FacetGroupContainerProps) => {
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

const FacetGroupOptionCheckbox = (props: FacetGroupOptionProps) => {
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

const QuickFacetChips = () => {
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

type QuickFacetChipProps = {
  label: string;
  count: number;
  icon?: LucideIcon;
  isSelected?: boolean;
};

const QuickFacetChip = (props: QuickFacetChipProps) => {
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
  productPrice?: string;
  productOfferDuration?: string;
  productOfferPrice?: string;
  badge?: "sponsored" | "lowestPrice" | "regional";
  amount: number;
};

const Product = (props: ProductProps) => {
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

const BadgeSponsored = () => {
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

const BadgeRegional = () => {
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

const BadgeLowestPrice = () => {
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
  productPrice?: string;
  productOfferDuration?: string;
  productOfferPrice?: string;
};

const ProductDetails = (props: ProductDetailsProps) => {
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

type ProductActionsProps = {
  amount: number;
};

const ProductActions = (props: ProductActionsProps) => {
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

const ProductFavoriteButton = () => {
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

type ProductBasketButtonProps = {
  amount: number;
};

const ProductBasketButton = (props: ProductBasketButtonProps) => {
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

const Footer = () => {
  return (
    <footer class="text-[#4c4c4c] bg-[#f1f1f1] p-[40px_32px] leading-[1.5] [box-shadow:inset_0_1px_0_0_#ccc]">
      <div class="flex flex-col">
        <div class="grid grid-flow-col grid-rows-[auto] grid-cols-[auto] gap-[28px_30px]">
          <div>
            <FooterSectionHeading>Section Heading</FooterSectionHeading>
            <FooterSectionLinks>
              <a>Section Link</a>
              <a>Section Link</a>
              <a>Section Link</a>
              <a>Section Link</a>
              <a>Section Link</a>
            </FooterSectionLinks>
          </div>

          <div>
            <FooterSectionHeading>Section Heading</FooterSectionHeading>
            <FooterSectionLinks>
              <a>Section Link</a>
              <a>Section Link</a>
              <a>Section Link</a>
              <a>Section Link</a>
            </FooterSectionLinks>
          </div>

          <div>
            <FooterSectionHeading>Section Heading</FooterSectionHeading>
            <FooterSectionLinks>
              <a>Section Link</a>
              <a>Section Link</a>
              <a>Section Link</a>
              <a>Section Link</a>
            </FooterSectionLinks>
          </div>

          <div>
            <FooterSectionHeading>Section Heading</FooterSectionHeading>
            <FooterSectionLinks>
              <a>Section Link</a>
              <a>Section Link</a>
              <a>Section Link</a>
              <a>Section Link</a>
            </FooterSectionLinks>
          </div>
        </div>
      </div>
    </footer>
  );
};

type FooterSectionHeadingProps = {
  children?: ComponentChildren;
};

const FooterSectionHeading = (props: FooterSectionHeadingProps) => {
  return <h3 class="font-[500] text-[18px] leading-[24px] m-[0_0_20px]">{props.children}</h3>;
};

type FooterSectionLinksProps = {
  children?: ComponentChildren;
};

const FooterSectionLinks = (props: FooterSectionLinksProps) => {
  return (
    <div
      class={classNames(
        "flex flex-col gap-y-[12px] font-[400] text-[16px]",
        "[&_a]:hover:text-[#cc071e] [&_a]:hover:underline [&_a]:hover:cursor-pointer"
      )}
    >
      {props.children}
    </div>
  );
};
