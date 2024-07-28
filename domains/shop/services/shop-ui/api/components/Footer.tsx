/** @jsx createElement */
import { classNames, ComponentChildren, createElement } from "../../helper/jsx.ts";

export const Footer = () => {
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

export type FooterSectionHeadingProps = {
  children?: ComponentChildren;
};

export const FooterSectionHeading = (props: FooterSectionHeadingProps) => {
  return <h3 class="font-[500] text-[18px] leading-[24px] m-[0_0_20px]">{props.children}</h3>;
};

export type FooterSectionLinksProps = {
  children?: ComponentChildren;
};

export const FooterSectionLinks = (props: FooterSectionLinksProps) => {
  return (
    <div
      class={classNames(
        "flex flex-col gap-y-[12px] font-[400] text-[16px]",
        "[&_a]:hover:text-[#cc071e] [&_a]:hover:underline [&_a]:hover:cursor-pointer",
      )}
    >
      {props.children}
    </div>
  );
};
