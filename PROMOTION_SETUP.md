# Kepucaearte temporary product promotion

## Current rule
- Products whose original stored price is exactly 6,000 ALL receive 50% off.
- Every other product with a price greater than zero receives 30% off.
- The original product price in MongoDB is never modified.
- New orders store the original unit price, discount percentage, and discounted unit price. The order total uses the discounted price.
- Existing orders are not recalculated; their historical amounts remain unchanged.

## Where the rule is configured
- Frontend display/cart calculations: `client/src/lib/pricing.js`
- Backend authoritative order calculation: `server/src/utils/pricing.js`

Both files currently have `PROMOTION_ENABLED = true`. To end the promotion, set it to `false` in **both** files, then rebuild/redeploy the frontend and redeploy/restart the backend. Do not change product prices in MongoDB.

## Important deployment note
This ZIP contains both the frontend and backend source changes. The frontend must be built and published from the `client` directory. The backend must be deployed separately from the `server` directory as a Node.js application.
