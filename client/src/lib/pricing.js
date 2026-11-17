// Temporary storefront promotion rules.
// When the promotion ends, set PROMOTION_ENABLED to false here and in
// server/src/utils/pricing.js, then redeploy both frontend and backend.
export const PROMOTION_ENABLED = true;

const SPECIAL_PRICE = 6000;
const SPECIAL_DISCOUNT_PERCENT = 50;
const DEFAULT_DISCOUNT_PERCENT = 30;

function roundCurrency(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function getProductPricing(originalPrice) {
  const price = Number(originalPrice);

  if (!Number.isFinite(price) || price < 0) {
    return { originalPrice: 0, salePrice: 0, discountPercent: 0, isDiscounted: false };
  }

  const discountPercent =
    PROMOTION_ENABLED && price > 0
      ? price === SPECIAL_PRICE
        ? SPECIAL_DISCOUNT_PERCENT
        : DEFAULT_DISCOUNT_PERCENT
      : 0;

  const salePrice = roundCurrency(price * (1 - discountPercent / 100));

  return {
    originalPrice: price,
    salePrice,
    discountPercent,
    isDiscounted: discountPercent > 0 && salePrice < price,
  };
}
