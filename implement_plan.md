Transition E-Commerce Platform from Multi-Vendor to Single-Vendor with BDT Currency and Cash on Delivery Only
This plan outlines the steps required to transition the frontend components, API endpoints, hooks, and dependencies of the e-commerce codebase from a multi-vendor structure to a single-vendor structure, enforcing BDT currency (৳) everywhere, and removing all Stripe payment systems (keeping Cash on Delivery only).

User Review Required
WARNING

This transition affects both API routes and frontend components:

All routes and pages related to vendors (/become-seller, /vendors, /stores) will be completely deleted.
Stripe integration will be completely removed, including packages (stripe and @stripe/stripe-js) and environment variable requirements for Stripe.
The checkout page will only support Cash on Delivery (COD).
All currency symbols ($) across the UI, emails, and products seed data will be changed to ৳.
Open Questions
IMPORTANT

Since we are removing Stripe completely, should we clean up the unused Stripe environment variables (like STRIPE_SECRET_KEY) from .env? (We will do so if present or simply ignore them in the code).
For BDT prices in the seed data (products.json), should we scale the existing USD-based numeric prices (e.g., multiplying by 100 or a conversion rate) to make them look like realistic BDT amounts, or keep the numbers as-is and just change the currency symbol? (Scaling them by ~100x will make them look much more realistic for BDT).
Proposed Changes
1. API Endpoints and Server Logic
[DELETE] 
verify/route.ts
Delete this endpoint completely as Stripe payment verification is no longer needed.
[DELETE] 
vendors API route
Delete the entire /api/vendors folder including:
app/api/vendors/route.ts
app/api/vendors/[id]/route.ts
app/api/vendors/[id]/products/route.ts
app/api/vendors/request/route.ts
[MODIFY] 
route.ts
Remove Stripe import and initialization.
Update payment method validation to restrict checks to COD only (disallow STRIPE).
Remove Stripe session creation logic (lines 483-567) entirely.
Clean up unused vendorId assignments in order items.
[MODIFY] 
route.ts
Remove import of SubOrder.
Modify the return value to read from the main order's items field and wrap them in a mock subOrders array to ensure backward-compatibility with the tracking UI.
[MODIFY] 
route.ts
Replace SubOrder.findOne check with an Order.findOne check (matching user and items.product and status "delivered") to verify the user actually purchased the product before reviewing.
Remove the SubOrder import.
[MODIFY] 
route.ts
Remove the import of Vendor model.
Remove the check determining if the user is a vendor of the product (lines 124-126).
Set isVendor to false always.
[MODIFY] 
route.ts
Remove the SubOrder query.
Directly map order.items to the formatted list of products expected by the client.
[MODIFY] 
route.ts
Remove the SubOrder query.
Directly map order.items to the formatted list of products expected by the client.
[MODIFY] 
search.ts
Remove the import of Vendor.
Remove vendor searching and suggestions logic.
Change SearchResult signature to exclude stores.
2. UI Pages and Frontend Components
[DELETE] 
become-seller
Delete the folder/page completely to remove the become-seller registration UI.
[DELETE] 
vendors
Delete the folder/page completely to remove the stores directory UI.
[DELETE] 
featured-store.tsx
Delete the component completely since vendor showcases are no longer needed.
[MODIFY] 
navbar.tsx
Remove the "Become a Seller" link.
[MODIFY] 
footer.tsx
Remove the "Become Seller" link.
[MODIFY] 
search-bar.tsx
Remove the "Stores" display section from suggestions dropdown.
[MODIFY] 
filter-sidebar.tsx
Replace all literal $ characters with ৳ in price labels/inputs.
[MODIFY] 
cart-sheet.tsx
Replace all literal $ characters with ৳.
[MODIFY] 
page.tsx
Replace all literal $ characters with ৳.
[MODIFY] 
page.tsx
Change default payment method state to "cod".
Remove the "Online Payment" selector UI.
Remove online payment check and redirection logic.
Replace all literal $ characters with ৳.
[MODIFY] 
page.tsx
Simplify success content to assume COD order is placed immediately; remove verifyStripeSession logic and loading states related to verification.
[MODIFY] 
page.tsx
Remove <FeaturedStore /> import and rendering.
Remove vendor details links and store attributes display from the page.
[MODIFY] 
page.tsx
Remove the "Store" feature comparison row.
[MODIFY] 
page.tsx
Replace all literal $ characters with ৳.
[MODIFY] 
page.tsx
Replace all literal $ characters with ৳.
[MODIFY] 
page.tsx
Replace all literal $ characters with ৳.
Remove Stripe condition for payment method description.
3. Shared Helpers, Models, and Configurations
[DELETE] 
vendors.ts
Delete the vendor queries/hooks file since it is no longer used.
[MODIFY] 
index.ts
Remove the export line for vendors.
[MODIFY] 
currency.ts
Force getCurrencySymbol to always return '৳' regardless of input.
[MODIFY] 
mail.ts
Change currency prefix in order confirmation emails from $ to ৳.
Simplify payment method display to always say "Cash on Delivery".
[MODIFY] 
Order.ts
Remove stripeSessionId field.
Restrict paymentMethod enum to ["COD"].
[MODIFY] 
products.json
Replace all instances of "currency": "USD" with "currency": "BDT".
Scale prices by a factor of 10x to 15x (e.g. $17.29 becomes 250.00 BDT) to represent realistic BDT store values.
[MODIFY] 
package.json
Remove "stripe" and "@stripe/stripe-js" from dependencies.
Verification Plan
Automated Verification
Run npm run build to ensure the Next.js compilation succeeds and there are no TypeScript compile-time errors or broken imports.
Manual Verification
Verify the home page, shop page, wishlist page, cart drawer, checkout page, order confirmation, and track-order pages render correctly with ৳ currency symbols.
Place a test order on the checkout page (which will automatically default to Cash on Delivery) and verify it successfully routes to /checkout/success and clears the cart.
Verify tracking page displays the ordered items under the mock sub-orders wrapper correctly.