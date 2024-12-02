import axios from "axios";

const SHOPIFY_API_URL = import.meta.env.VITE_SHOPIFY_API_URL;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

// Fetch products (if not already in your service)
export const fetchProducts = async () => {
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            images(first: 1) {
              edges {
                node {
                  src
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await axios({
      url: SHOPIFY_API_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": ACCESS_TOKEN,
      },
      data: JSON.stringify({ query }),
    });

    return response.data.data.products.edges.map((edge) => {
      const product = edge.node;
      return {
        id: product.variants.edges[0].node.id, // Use variant ID for transactions
        title: product.title,
        image: product.images.edges[0]?.node.src || "",
        price: product.variants.edges[0]?.node.price.amount || "0",
        currency: product.variants.edges[0]?.node.price.currencyCode || "USD",
      };
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Create a checkout session
export const createCheckout = async (cart) => {
  const lineItems = cart.map((item) => ({
    variantId: item.id,
    quantity: item.quantity,
  }));

  const query = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = { input: { lineItems } };

  try {
    const response = await axios({
      url: SHOPIFY_API_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": ACCESS_TOKEN,
      },
      data: JSON.stringify({ query, variables }),
    });

    const { checkout, userErrors } = response.data.data.checkoutCreate;
    if (userErrors.length > 0) {
      throw new Error(userErrors[0].message);
    }

    return checkout.webUrl; // Return Shopify checkout URL
  } catch (error) {
    console.error("Error creating checkout:", error);
    throw error;
  }
};


export default fetchProducts;