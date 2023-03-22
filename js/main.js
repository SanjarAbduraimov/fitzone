const config = {
  defaultImage:
    "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=webp&v=1530129081",
};
const currencyEnum = {
  usd: "$",
  uzs: "uzs",
};
document.addEventListener("DOMContentLoaded", () => {
  const productListDom = document.querySelector(
    ".product__list .swiper-wrapper"
  );
  const navbar = document.querySelector(".navbar");
  const menuOpenBtn = document.querySelector(".nav__menu--btn");
  const navMenu = document.querySelector(".nav__menu");
  menuOpenBtn.addEventListener("click", () => {
    navMenu.classList.add("show");
    document.body.style = "overflow:hidden";
  });
  navbar.addEventListener("click", (e) => {
    const isExists =
      e.target.classList.contains("fa-xmark") ||
      e.target.classList.contains("nav__menu-overlay");
    if (isExists) {
      navMenu.classList.remove("show");
      document.body.style = "overflow:auto";
    }
  });
  fetchProducts().then((products) => {
    let productsCollection = "";
    products.forEach((product) => {
      productsCollection += productComponent(product);
    });
    productListDom.innerHTML = productsCollection;
  });
});

async function fetchProducts() {
  try {
    const res = await fetch("__mock__/products.json");
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

function menuHandler() {
  document.addEventListener("click", () => {});
}

function productComponent(product) {
  const { id, name, status, rate, price, img, currency } = product;
  return `<article class="card swiper-slide">
  <div class="card__img--wrapper">
    <a href="/products/${id}">
      <img loading="lazy" class="card__img" src="${
        img || config.defaultImage
      }" alt="${name}">
    <div class="card__overlay--content">
      <div class="product__status">${status}</div>
    </div>
  </a>
  </div>
  <div class="card__body">
  <a href="/products/${id}">
    <h4 class="card__title">${name}</h4>
  </a>
    ${renderStars(rate)}
    <p class="product__price">${currencyEnum[currency] || ""}${price}</p>
  </div>
</article>`;
}

function renderStars(rating) {
  const maxRating = 5;
  const fullStar = `<svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z" fill="#C2A578" /></svg>`;
  const emptyStar = `<svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 1.61803L9.32058 5.68237L9.43284 6.02786H9.79611H14.0696L10.6123 8.53976L10.3184 8.75329L10.4306 9.09878L11.7512 13.1631L8.29389 10.6512L8 10.4377L7.70611 10.6512L4.24877 13.1631L5.56936 9.09878L5.68162 8.75329L5.38772 8.53976L1.93039 6.02786H6.20389H6.56716L6.67942 5.68237L8 1.61803Z" stroke="#C2A578"/></svg>`;
  const fullStarCount = Math.floor(rating);
  const emptyStarCount = maxRating - fullStarCount;

  const fullStars = Array(fullStarCount)
    .fill(`<span class="full-star">${fullStar}</span>`)
    .join("");
  const emptyStars = Array(emptyStarCount)
    .fill(`<span class="empty-star">${emptyStar}</span>`)
    .join("");

  return `<p class="product__rate">${fullStars}${emptyStars}</p>`;
}
