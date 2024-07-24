/** @jsx createElement */
import { icons } from "lucide-preact";
import { classNames, ComponentChildren, createElement } from "../../helper/jsx.ts";
import { ProductActions } from "./FacetedProductList.tsx";

export const ProductDetails = () => {
  return (
    <div class="flex flex-col bg-[#fff]">
      <section class="m-[2.5rem_auto_5rem] text-[#4c4c4c] flex flex-wrap max-w-[60rem] w-full">
        <div class="flex-[0_0_50%] max-w-[50%]">
          <ProductMedia />
        </div>
        <div class="flex-[0_0_50%] pb-[5rem]">
          <ProductInformation
            productTitle="Heidelbeeren 500g"
            productPrice="4,99 €"
            productGrammage="500g (1 kg = 9,98 €)"
          />
        </div>
        <div class="flex-[0_0_100%] px-[0.5rem]">
          <ProductContent />
        </div>
      </section>
    </div>
  );
};

export const ProductMedia = () => {
  return (
    <div class="flex items-center justify-center">
      <div class="w-[420px] h-[420px]">
        <span class="flex items-center justify-center w-full h-full">
          <icons.Image class="w-[336px] h-[336px] text-[#949494] [stroke-width:calc(2px*24/336)]" />
        </span>
      </div>
    </div>
  );
};

export type ProductInformationProps = {
  productTitle: string;
  productPrice: string;
  productGrammage: string;
};

export const ProductInformation = (props: ProductInformationProps) => {
  return (
    <div class="mr-[0.5rem] ml-[1.25rem]">
      <h1 class="font-[700] text-[2rem] leading-[2.5rem] text-[#4c4c4c]">{props.productTitle}</h1>
      <div class="mt-[2.5rem]">
        <div>
          <mark class="font-[700] bg-transparent text-[#4c4c4c] text-[2rem] leading-[2.5rem]">
            {props.productPrice}
          </mark>
        </div>
        <div class="font-[400] text-[#8c8c8c] text-[1rem] leading-[1.5rem] mt-[0.25rem]">
          {props.productGrammage}
        </div>
        <div class="mt-[1rem]">
          <div class="w-[11rem]">
            <ProductActions amount={0} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductContent = () => {
  return (
    <div class="px-[0.5rem]">
      <h2 class="font-[700] text-[1.25rem] leading-[2.5rem] mb-[0.5rem] text-[#4c4c4c]">
        Produktbeschreibung
      </h2>
      <div class="font-[400] text-[1rem] leading-[1.5rem] mb-[1rem] text-[#8c8c8c]">
        Artikelnummer 8003309
      </div>
      <pre></pre>
    </div>
  );
};

export const ProductRecommendations = () => {
  return (
    <div class="flex flex-col bg-[#fff]">
      <span
        class={classNames(
          "flex items-center justify-center pt-[20px] pb-[26px] w-full h-[26px]",
          "text-[16px] text-[#1c1c1c]"
        )}
      >
        Hast du auch an alles gedacht? Noch mehr passende Produkte für dich:
        {/* Für diese Produkte interessierten sich auch andere Kunden. */}
      </span>

      <div class="relative mx-[60px] flex">
        <div class="absolute inset-0 mx-[-60px] flex justify-between pointer-events-none">
          <div class="flex items-center justify-center w-[50px]">
            <span class="fill-[#ccc] rotate-180">
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.396.45C6.625-.33 6-.07 6 1.029v21.939c0 1.1.627 1.357 1.396.58L17.419 13.41c.771-.78.77-2.046 0-2.823L7.396.45z"></path>
              </svg>
            </span>
          </div>

          <div class="flex items-center justify-center w-[50px]">
            <span class="fill-[#4a4a4a]">
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.396.45C6.625-.33 6-.07 6 1.029v21.939c0 1.1.627 1.357 1.396.58L17.419 13.41c.771-.78.77-2.046 0-2.823L7.396.45z"></path>
              </svg>
            </span>
          </div>
        </div>

        <RecommendationsCarousel>
          <RecommendationsProductTile
            productTitle="Tafeltrauben blau kernlos 500g"
            productGrammage="500g (1 kg = 4,38 €)"
            productPrice="2,19 €"
            amount={0}
          />
          <RecommendationsProductTile
            productTitle="Pfirsiche platt 500g"
            productGrammage="500g (1 kg = 2,38 €)"
            productPrice="1,19 €"
            amount={0}
          />
          <RecommendationsProductTile
            productTitle="Speisezwiebeln 1kg im Netz"
            productGrammage="1kg"
            productPrice="1,59 €"
            amount={0}
          />
        </RecommendationsCarousel>
      </div>
    </div>
  );
};

export type RecommendationsCarouselProps = {
  children?: ComponentChildren;
};

export const RecommendationsCarousel = (props: RecommendationsCarouselProps) => {
  return (
    <div class="recommendations-carousel w-full grid grid-flow-col auto-cols-fr">
      {props.children}
    </div>
  );
};

export type RecommendationsProductTileProps = {
  productTitle: string;
  productGrammage: string;
  productPrice: string;
  amount: number;
};

export const RecommendationsProductTile = (props: RecommendationsProductTileProps) => {
  const productImage = (
    <div class="product-image h-full w-full">
      <span class="flex items-center justify-center w-[88px] h-[88px]">
        <icons.Image class="w-[72px] h-[72px] text-[#949494] [stroke-width:calc(2px*24/72)]" />
      </span>
    </div>
  );
  const productDetails = (
    <div class="product-details h-full w-full flex flex-col">
      <div class="flex-1 flex flex-col">
        <div class="font-[400] text-[1.125rem] leading-[1.25rem] text-[#4c4c4c]">
          {props.productTitle}
        </div>
        <div class="font-[400] text-[0.875rem] leading-[1rem] text-[#4c4c4c]">
          {props.productGrammage}
        </div>
      </div>

      <div class="flex flex-col">
        <mark class="font-[400] bg-transparent text-[#4c4c4c] text-[1.125rem] leading-[1.5rem] text-right">
          {props.productPrice}
        </mark>
      </div>
    </div>
  );

  return (
    <div class="recommendations-product-tile pr-[10px] last:pr-0 inline-block">
      <div
        class={classNames(
          "border border-[#ccc] hover:border-[#8c8c8c] rounded-[0.125rem] bg-[#fff] font-[16px]",
          "flex flex-col p-[1rem] h-[14.9375rem]"
        )}
      >
        <div class="flex-1 flex flex-row">
          <div class="pr-[1rem]">{productImage}</div>
          <div class="flex-1">{productDetails}</div>
        </div>

        <div class="mt-[0.5rem]">
          <ProductActions amount={props.amount} />
        </div>
      </div>
    </div>
  );
};

export const FooterNewsletter = () => {
  return <div class="footer-newsletter bg-[#fff] flex pt-[24px] py-[96px]"></div>;
};
