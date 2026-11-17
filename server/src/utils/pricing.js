// Temporary promotion rules. Keep PROMOTION_ENABLED in sync with
// client/src/lib/pricing.js. Set both values to false to end the campaign.
const PROMOTION_ENABLED = true;

const SPECIAL_PRICE = 6000;
const SPECIAL_DISCOUNT_PERCENT = 50;
const DEFAULT_DISCOUNT_PERCENT = 30;

function roundCurrency(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function getProductPricing(originalPrice) {
  const price = Number(originalPrice);

  if (!Number.isFinite(price) || price < 0) {
    throw new Error("Invalid product price");
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
  };
}

module.exports = { getProductPricing };
