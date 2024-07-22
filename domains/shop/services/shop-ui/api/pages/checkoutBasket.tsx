/** @jsx createElement */
import { classNames, createElement, renderToString } from "../../helper/jsx.ts";
import { Context } from "../../model.ts";
import { Footer } from "../components/Footer.tsx";
import { HeaderHomepage } from "../components/Header.tsx";

// deno-lint-ignore require-await
export const handleCheckoutBasket = async (_ctx: Context, _req: Request): Promise<Response> => {
  const html = renderToString(
    <div class="bg-[#fbfaf9] [font-stretch:95%]">
      {/* header. */}
      <CheckoutHeader />

      {/* page content. */}
      <CheckoutPageContent />

      {/* footer. */}
      <Footer />
    </div>
  );

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
};

const CheckoutHeader = () => {
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

const CheckoutProgressBar = () => {
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

const CheckoutProgressBarLine = () => {
  return <div class="h-[2px] w-[300px] bg-[#ccc] my-[15px] mx-[-9px] self-start"></div>;
};

type CheckoutProgressBarStepProps = {
  text: string;
  step: string;
  isCurrent?: boolean;
};

const CheckoutProgressBarStep = (props: CheckoutProgressBarStepProps) => {
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

const CheckoutPageContent = () => {
  return (
    <section class="checkout-page-content flex flex-col">
      <h1 class="checkout-title text-[#4a4a4a] text-center my-[36px] font-[700] text-[40px] leading-[48px]">
        Warenkorb
      </h1>
    </section>
  );
};
