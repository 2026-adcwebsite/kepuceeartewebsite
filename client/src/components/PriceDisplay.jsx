import { formatPrice } from "../lib/format";
import { getProductPricing } from "../lib/pricing";

/**
 * Shows the original price crossed out and the promotional price below it.
 * For saved orders, pass salePrice and discountPercent so historical order
 * pricing is displayed exactly as it was when the order was placed.
 */
export default function PriceDisplay({
  price,
  salePrice,
  discountPercent,
  quantity = 1,
  lang = "sq",
  align = "start",
  className = "",
}) {
  const calculated = getProductPricing(price);
  const original = Number(price ?? calculated.originalPrice);
  const finalPrice =
    salePrice === undefined ? calculated.salePrice : Number(salePrice);
  const discount =
    discountPercent === undefined
      ? calculated.discountPercent
      : Number(discountPercent);
  const showDiscount =
    discount > 0 && Number.isFinite(original) && finalPrice < original;
  const alignment = align === "end" ? "items-end text-right" : "items-start text-left";

  return (
    <div className={`flex flex-col leading-tight ${alignment} ${className}`}>
      {showDiscount && (
        <span className="font-mono text-xs text-stone line-through">
          {formatPrice(original * quantity, lang)}
        </span>
      )}
      <span className={`font-mono ${showDiscount ? "text-oxblood font-semibold" : "text-stone"}`}>
        {formatPrice(finalPrice * quantity, lang)}
      </span>
      {showDiscount && (
        <span className="mt-1 inline-flex items-center bg-oxblood/10 px-1.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wide text-oxblood">
          -{discount}%
        </span>
      )}
    </div>
  );
}
