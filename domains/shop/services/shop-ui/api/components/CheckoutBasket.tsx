/** @jsx createElement */
import { icons, LucideIcon } from "lucide-preact";
import { classNames, ComponentChildren, createElement } from "../../helper/jsx.ts";
import { HeaderHomepage } from "./Header.tsx";
import { ProductRecommendations } from "./ProductDetails.tsx";
import { ShoppingSearch } from "./ShoppingHeader.tsx";

export const CheckoutHeader = () => {
  return (
    <header class="bg-[#fff] border-b border-[#ccc] grid [&>*]:[grid-area:1/1]">
      <div class="flex justify-start">
        <HeaderHomepage />
      </div>
      <div class="flex justify-end lg:justify-center">
        <CheckoutProgressBar />
      </div>
    </header>
  );
};

export const CheckoutProgressBar = () => {
  return (
    <div
      class={classNames(
        "checkout-progress-bar flex flex-row items-center justify-around",
        "pt-[12px] px-[35px] min-w-[504px] max-w-[540px]"
      )}
    >
      <CheckoutProgressBarStep step="1" text="Warenkorb" isCurrent />
      <CheckoutProgressBarLine />
      <CheckoutProgressBarStep step="2" text="Abholzeit" />
      <CheckoutProgressBarLine />
      <CheckoutProgressBarStep step="3" text="Zahlungsart" />
      <CheckoutProgressBarLine />
      <CheckoutProgressBarStep step="4" text="Abschließen" />
    </div>
  );
};

export const CheckoutProgressBarLine = () => {
  return <div class="h-[2px] w-[300px] bg-[#ccc] my-[15px] mx-[-9px] self-start"></div>;
};

export type CheckoutProgressBarStepProps = {
  text: string;
  step: string;
  isCurrent?: boolean;
};

export const CheckoutProgressBarStep = (props: CheckoutProgressBarStepProps) => {
  return (
    <div class="flex flex-col w-[50px] items-center justify-between">
      <div
        class={classNames(
          "flex items-center justify-center h-[32px] w-[32px] mx-[8px]",
          "text-[16px] leading-[1.71] border-2 rounded-[50%]",
          props.isCurrent && "bg-[#4c4c4c] border-[#4c4c4c] text-[#fff]",
          !props.isCurrent && "border-[#ccc] text-[#ccc]"
        )}
      >
        <span>{props.step}</span>
      </div>
      <span
        class={classNames(
          "block text-center font-[500] text-[14px] leading-[2.5]",
          props.isCurrent && "text-[#4c4c4c]",
          !props.isCurrent && "text-[#ccc]"
        )}
      >
        {props.text}
      </span>
    </div>
  );
};

export const CheckoutFooter = () => {
  return (
    <footer class="flex min-h-[48px] px-[12px] leading-[38px] text-[#4a4a4a]">
      <div class="flex flex-row flex-wrap m-auto justify-center self-end">
        <CheckoutFooterLink />
        <CheckoutFooterLink />
        <CheckoutFooterLink />
        <CheckoutFooterLink />
        <CheckoutFooterLink />
      </div>
    </footer>
  );
};

export const CheckoutFooterLink = () => {
  return <a class="font-[500] text-[14px] leading-[38px] text-[#1c1c1c] mx-[20px]">Footer Link</a>;
};

export const CheckoutPageContent = () => {
  return (
    <section class="checkout-page-content flex flex-col bg-[#fff] pb-[50px]">
      <h1 class="checkout-title text-[#4a4a4a] text-center my-[36px] font-[700] text-[40px] leading-[48px]">
        Warenkorb
      </h1>
      <CheckoutSearchContainer />
      <BasketOverview />
      <ProductRecommendations />
    </section>
  );
};

export const CheckoutSearchContainer = () => {
  return (
    <div class="m-auto w-[640px]">
      <span class="block text-center font-[400] text-[16px] leading-[22px] text-[#4c4c4c] pb-[12px]">
        Noch etwas vergessen? Suche nach Produkten und lege sie in den Warenkorb.
      </span>
      <ShoppingSearch />
    </div>
  );
};

export const BasketOverview = () => {
  return (
    <div
      class={classNames(
        "grid grid-flow-row grid-cols-[auto_352px] grid-rows-[auto_auto_auto] items-start",
        "px-[16px] gap-x-[24px] gap-y-[32px] mt-[72px] mb-[50px]"
      )}
    >
      <BasketButton type="secondary" iconBefore={icons.ArrowLeft}>
        Zurück
      </BasketButton>
      <BasketButton type="primary" iconAfter={icons.ArrowRight}>
        Zur Kasse
      </BasketButton>

      <BasketOverviewList />
      <BasketSummaryContainer />

      <BasketButton type="secondary" iconBefore={icons.ArrowLeft}>
        Zurück
      </BasketButton>
      <BasketButton type="primary" iconAfter={icons.ArrowRight}>
        Zur Kasse
      </BasketButton>
    </div>
  );
};

export const BasketOverviewList = () => {
  return (
    <section class="border border-[#ccc] rounded-[24px]">
      <header class="py-[20px] px-[24px] border-b border-[#ccc]">
        <h3 class="font-[700] text-[32px] leading-[40px] text-[#1c1c1c]">Abholservice</h3>
        <div
          class={classNames(
            "flex flex-row flex-wrap items-start justify-start self-stretch content-start",
            "mt-[12px] gap-x-[12px]"
          )}
        >
          <BasketInformationItem icon={icons.MapPin} text="11011 Berlin" />
          <BasketInformationItem icon={icons.CalendarDays} text="Abholtermin noch nicht gewählt" />
        </div>
      </header>

      <div>
        <BasketNotificationContainer>
          <BasketNotificationInfo />
        </BasketNotificationContainer>

        <BasketNotificationLineItems>
          <BasketLineItem
            productTitle="Pfanner Multivitamin ACE 1,5l"
            productOfferDuration="noch 2 Tage"
            hasNotAvailableText
          />
          <BasketLineItem
            productTitle="Pfanner Multivitamin ACE 1,5l"
            productOfferDuration="noch 2 Tage"
            depositLabel="(EINWEG)"
            hasNotAvailableText
          />
        </BasketNotificationLineItems>
      </div>

      <div class="p-[24px]">
        <div>
          <BasketLineItemListHeader title="Getränke & Genussmittel" amount={1} />
          <BasketLineItemListHeader amount={1} />
          <BasketLineItem
            productTitle="Rotkäppchen Sekt trocken 0,75l"
            productPrice="3,29 €"
            totalPrice="3,29 €"
            amount={1}
            isProductOffer
            productOfferDuration="noch 2 Tage"
            hasAgeVerificationText
          />
        </div>
        <div>
          <BasketLineItemListHeader title="Obst & Gemüse" amount={2} />
          <BasketLineItem
            productTitle="Heidelbeeren 500g"
            productPrice="4,99 €"
            totalPrice="4,99 €"
            amount={1}
          />
          <BasketLineItem
            productTitle="Kirschen süß ca. 100g"
            productPrice="0,79 €"
            totalPrice="1,58 €"
            amount={2}
          />
        </div>
      </div>
    </section>
  );
};

type BasketNotificationContainerProps = {
  children?: ComponentChildren;
};

const BasketNotificationContainer = (props: BasketNotificationContainerProps) => {
  return <div class="pt-[16px] px-[24px] flex flex-col gap-[16px]">{props.children}</div>;
};

const BasketNotificationInfo = () => {
  return (
    <div class="flex items-center bg-[#e7eff8] text-[#2a63c4] p-[16px] rounded-[16px] gap-[8px]">
      <span class="flex items-center justify-center w-[24px] h-[24px] shrink-0">
        <icons.Info class="w-[20px] h-[20px] shrink-0 [stroke-width:calc(2px*24/20)]" />
      </span>
      <span class="font-[500] text-[16px] leading-[24px]">
        In deinem Warenkorb haben sich Verfügbarkeiten verändert.
      </span>
    </div>
  );
};

type BasketNotificationLineItemsProps = {
  children?: ComponentChildren;
};

const BasketNotificationLineItems = (props: BasketNotificationLineItemsProps) => {
  return (
    <div class="pt-[48px] px-[24px]">
      <div class="p-[16px] rounded-[16px] bg-[#f1f1f1] text-[#1c1c1c]">
        <div class="flex items-center justify-between">
          <h4 class="font-[700] text-[24px] leading-[32px] text-[#1c1c1c]">
            Nicht verfügbare Produkte
          </h4>
          <div class="inline-flex">
            <BasketButton type="secondary" iconBefore={icons.Trash2}>
              Alle löschen
            </BasketButton>
          </div>
        </div>

        <div>{props.children}</div>
      </div>
    </div>
  );
};

export type BasketInformationItemProps = {
  text: string;
  icon: LucideIcon;
};

export const BasketInformationItem = (props: BasketInformationItemProps) => {
  return (
    <div class="flex pr-[16px] gap-[8px] border-r border-[#ccc] last:border-0 text-[#1c1c1c]">
      <span class="flex items-center justify-center w-[24px] h-[24px] shrink-0">
        <props.icon class="w-[20px] h-[20px] shrink-0 [stroke-width:calc(2px*24/20)]" />
      </span>
      <span class="font-[400] text-[16px] leading-[24px]">{props.text}</span>
    </div>
  );
};

export type BasketLineItemListHeaderProps = {
  title?: string;
  amount: number;
};

export const BasketLineItemListHeader = (props: BasketLineItemListHeaderProps) => {
  return (
    <div class="grid grid-cols-[auto_94px_94px] items-center">
      {props.title && (
        <h4 class="font-[700] text-[24px] leading-[32px] text-[#1c1c1c]">{props.title}</h4>
      )}
      {!props.title && (
        <span class="text-left font-[400] text-[14px] leading-[20px] text-[#676767]">
          Deine Produkte ({props.amount})
        </span>
      )}
      <span class="text-right font-[400] text-[14px] leading-[20px] text-[#676767]">
        Einzelpreis
      </span>
      <span class="text-right font-[400] text-[14px] leading-[20px] text-[#676767]">Gesamt</span>
    </div>
  );
};

export type BasketLineItemProps = {
  productTitle: string;
  productPrice?: string;
  totalPrice?: string;
  amount?: number;
  depositLabel?: string;
  isProductOffer?: boolean;
  productOfferDuration?: string;
  hasNotAvailableText?: boolean;
  hasAgeVerificationText?: boolean;
};

export const BasketLineItem = (props: BasketLineItemProps) => (
  <article
    class={classNames(
      "min-h-[108px] w-full py-[16px] grid grid-cols-[auto_94px_94px] items-center",
      "border-t border-[#ccc] first-of-type:border-none"
    )}
  >
    <div class="flex items-center">
      <BasketLineItemImage />

      <div class="basket-line-item-description flex flex-col mx-[16px]">
        <a class="font-[500] text-[16px] leading-[24px] text-[#1c1c1c] truncate">
          {props.productTitle}
        </a>

        <div>
          {props.depositLabel && (
            <span class="font-[400] text-[16px] leading-[1.15] text-[#1c1c1c] inline-block pr-[8px]">
              {props.depositLabel}
            </span>
          )}

          {props.productOfferDuration && (
            <span class="font-[500] text-[14px] leading-[20px] text-[#cc071e]">
              {props.productOfferDuration}
            </span>
          )}
        </div>

        {props.hasNotAvailableText && (
          <div>
            <span class="font-[500] text-[14px] leading-[20px] text-[#0065cb]">
              Das Produkt ist nicht mehr verfügbar.
            </span>
          </div>
        )}

        {props.hasAgeVerificationText && (
          <div class="pt-[8px]">
            <BasketAgeVerificationInformation />
          </div>
        )}
      </div>

      {props.amount && (
        <div class="flex-1 text-end">
          <BasketLineItemAmount amount={props.amount} />
        </div>
      )}
    </div>

    <span
      class={classNames(
        "text-right font-[500] text-[16px] leading-[24px] text-[#1c1c1c]",
        props.isProductOffer && "text-[#cc071e]"
      )}
    >
      {props.productPrice}
    </span>

    <span
      class={classNames(
        "text-right font-[500] text-[16px] leading-[24px] text-[#1c1c1c]",
        props.isProductOffer && "text-[#cc071e]"
      )}
    >
      {props.totalPrice}
    </span>
  </article>
);

export const BasketLineItemImage = () => {
  return (
    <span class="flex items-center justify-start w-[88px] h-[88px] shrink-0">
      <icons.Image
        style="--width: 24; --inner-width: 18;"
        class={classNames(
          "w-[72px] h-[72px] shrink-0 text-[#949494] [stroke-width:calc(2px*18/72)]",
          "origin-center scale-[calc(24/18)]"
        )}
      />
    </span>
  );
};

export type BasketLineItemAmountProps = {
  amount: number; // quantity.
};

export const BasketLineItemAmount = (props: BasketLineItemAmountProps) => {
  const iconTrash = (
    <span class="flex items-center justify-center w-[40px] h-[40px]">
      <icons.Trash2 class="w-[20px] h-[20px] shrink-0 [stroke-width:calc(2px*24/20)]" />
    </span>
  );
  const iconMinus = (
    <span class="flex items-center justify-center w-[40px] h-[40px]">
      <icons.Minus class="w-[20px] h-[20px] shrink-0 [stroke-width:calc(2px*24/20)]" />
    </span>
  );
  const iconPlus = (
    <span class="flex items-center justify-center w-[40px] h-[40px]">
      <icons.Plus class="w-[20px] h-[20px] shrink-0 [stroke-width:calc(2px*24/20)]" />
    </span>
  );

  return (
    <div class="inline-flex w-[120px] text-[#1c1c1c]">
      <button
        class={classNames(
          "w-[40px] h-[40px] border-[0.633333px] border-[#949494] rounded-l-[8px]",
          "outline-2 outline-offset-[-2px] outline-[#1c1c1c]",
          "hover:bg-[#f1f1f1] hover:outline hover:z-10"
        )}
      >
        {props.amount > 1 ? iconMinus : iconTrash}
      </button>

      <input
        class={classNames(
          "w-[40px] h-[40px] border-y-[0.633333px] border-[#949494] p-[8px] bg-inherit",
          "font-[500] text-[16px] leading-[1.1] text-center",
          "outline-2 outline-offset-[-2px] outline-[#1c1c1c]",
          "hover:bg-[#f1f1f1] hover:outline hover:z-10",
          "focus:bg-[#f1f1f1] focus:outline focus:z-10"
        )}
        value={props.amount}
        pattern="[0-9]*"
        maxlength={2}
        autocomplete="off"
      />

      <button
        class={classNames(
          "w-[40px] h-[40px] border-[0.633333px] border-[#949494] rounded-r-[8px]",
          "outline-2 outline-offset-[-2px] outline-[#1c1c1c]",
          "hover:bg-[#f1f1f1] hover:outline hover:z-10"
        )}
      >
        {iconPlus}
      </button>
    </div>
  );
};

const BasketAgeVerificationInformation = () => {
  return (
    <div class="age-verification-information">
      {/* text. */}
      <div class="font-[500] text-[16px] leading-[24px] text-[#cc071e]">
        Bestellung ab 18 Jahren.
      </div>

      {/* subtext. */}
      <div class="mt-[4px] font-[400] text-[14px] leading-[20px] text-[#676767]">
        Für dieses Produkt gilt das{" "}
        <a class="font-[500] text-[#676767] hover:text-[#1c1c1c] underline cursor-pointer">
          Jugendschutzgesetz
        </a>
      </div>
    </div>
  );
};

export const BasketSummaryContainer = () => {
  return (
    <div class="sticky top-[32px]">
      <BasketSummary />
      <BasketInfobox linkText="Mehr zu Ersatzartikeln">
        Ist ein Produkt nicht mehr vorrätig, bieten wir dir ein ähnliches als Ersatzartikel an.
      </BasketInfobox>
      <BasketInfobox linkText="Mehr zu Transportboxen">
        <span class="hyphens-manual">
          Wir bieten dir Pfand-Transport&shy;boxen für deine Einkäufe an.
        </span>
      </BasketInfobox>
    </div>
  );
};

export const BasketSummary = () => {
  return (
    <div class="border border-[#ccc] rounded-[24px] overflow-hidden mb-[16px]">
      <header class="bg-[#f1f1f1] pt-[12px] p-[16px]">
        <div class="flex items-center justify-between">
          <div class="font-[700] text-[24px] leading-[32px] text-[#1c1c1c]">Gesamtsumme</div>
          <div class="text-right font-[700] text-[24px] leading-[32px] text-[#1c1c1c]">8,71 €</div>
        </div>
        <div class="font-[400] text-[14px] leading-[20px] text-[#676767]">Preise inkl. MwSt.</div>
      </header>
      <div class="pt-[12px] p-[16px] grid grid-cols-[auto_auto] text-[#1c1c1c] items-baseline gap-x-[8px]">
        <div class="font-[500] text-[16px] leading-[24px]">Produkte (3)</div>
        <div class="text-right font-[400] text-[16px] leading-[24px] tabular-nums">8,46 €</div>
        <div class="font-[500] text-[16px] leading-[24px]">Pfand</div>
        <div class="text-right font-[400] text-[16px] leading-[24px] tabular-nums">0,25 €</div>
        <div class="font-[500] text-[16px] leading-[24px]">Servicegebühr</div>
        <div class="text-right font-[400] text-[14px] leading-[20px] ">
          Abholtermin noch nicht gewählt
        </div>
      </div>
    </div>
  );
};

export type BasketInfoboxProps = {
  children?: ComponentChildren;
  linkText: string;
};

export const BasketInfobox = (props: BasketInfoboxProps) => {
  return (
    <div class="bg-[#eaeef3] rounded-[16px] p-[16px] mb-[16px] flex gap-[8px]">
      <span class="flex items-start justify-start shrink-0 w-[48px] h-[48px]">
        <icons.Image class="w-[40px] h-[40px] shrink-0 [stroke-width:calc(2px*24/40)]" />
      </span>
      <div>
        <div class="font-[400] text-[16px] leading-[24px] text-[#1c1c1c]">{props.children}</div>
        <a class="mt-[8px] flex items-center gap-[8px] cursor-pointer text-[#1c1c1c] hover:text-[#cc071e]">
          <span class="flex items-center justify-center w-[24px] h-[24px] shrink-0">
            <icons.ArrowRight class="w-[24px] h-[24px] shrink-0 [stroke-width:calc(2px*24/24)]" />
          </span>
          <span class="font-[500] text-[16px] leading-[24px] underline">{props.linkText}</span>
        </a>
      </div>
    </div>
  );
};

export type BasketButtonProps = {
  children?: ComponentChildren;
  type?: "primary" | "secondary";
  iconBefore?: LucideIcon;
  iconAfter?: LucideIcon;
};

export const BasketButton = (props: BasketButtonProps) => {
  return (
    <button
      class={classNames(
        "max-w-[22.5rem] w-full py-[12px] px-[24px] gap-[8px]",
        "inline-flex items-center justify-center",
        "rounded-[8px] cursor-pointer whitespace-nowrap",
        props.type === "primary" && "bg-[#cc071e] text-[#fff] hover:bg-[#9e0012]",
        props.type === "secondary" && [
          "bg-[#fff] text-[#1c1c1c] [box-shadow:inset_0_0_0_2px_#1c1c1c]",
          "hover:bg-[rgba(0,0,0,0.07)]",
        ]
      )}
    >
      {props.iconBefore && (
        <div class="flex items-center justify-center">
          <props.iconBefore class="w-[20px] h-[20px] shrink-0 [stroke-width:1.5px*24/20]" />
        </div>
      )}
      <span class="font-[500] text-[16px] leading-[24px]">{props.children}</span>
      {props.iconAfter && (
        <div class="flex items-center justify-center">
          <props.iconAfter class="w-[20px] h-[20px] shrink-0 [stroke-width:1.5px*24/20]" />
        </div>
      )}
    </button>
  );
};
