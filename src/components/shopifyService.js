import axios from 'axios';

const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
const SHOPIFY_API_URL = import.meta.env.VITE_SHOPIFY_API_URL;

const fetchProducts = async () => {
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN,
      },
      data: JSON.stringify({ query }),
    });

    // Log the entire response to check its structure
    console.log("API Response:", response.data);

    // Ensure the response has the expected structure
    if (response.data?.data?.products?.edges) {
      return response.data.data.products.edges.map(productEdge => {
        const product = productEdge.node;
        return {
          id: product.id,
          title: product.title,
          image: product.images.edges[0]?.node.src || '',  // Handle missing image
          price: product.variants.edges[0]?.node.price.amount || '0',  // Handle missing price
          currency: product.variants.edges[0]?.node.price.currencyCode || 'USD',  // Handle missing currency
        };
      });
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Rethrow for handling in the component
  }
};

export default fetchProducts;