export default async function fetchProducts() {
  try {
    const res = await fetch("/__mock__.products.json");
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}
