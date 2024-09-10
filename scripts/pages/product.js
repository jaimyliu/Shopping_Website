import { renderHeader } from "../components/header.js";
import { getProduct } from "../../data/totalProducts.js";
import { addToCart } from "../../data/cart.js"; 

renderHeader();

// 取得商品網址#後面的商品ID，再根據商品ID取得商品的詳細資訊
const productId = location.hash.substring(1);
const product = getProduct(productId);
console.log(product);

const productHtml = `
    <div class="product-block">
        <img class="product-image" src="${product.img}" />
        <div class="product-information">
            <h1 class="product-name">${product.name}</h1>
            <div class="product-rating">
                <p class="rating-count">${product.stars}</p>
                <img class="rating-stars" src="images/ratings/rating_${Math.round(product.stars/0.5)*5}.png">
                <p class="comment-num">${product.commentNum} 則評論</p>
            </div>
            <div class="sell-information">
                ${product.discount ? 
                '<p class="product-discount">' +
                product.discount + '折</p>'  : ""}
                <p class="sell-num">已出售 ${product.sellNum}</p>
            </div>
            <div class="product-price">
                ${product.originPrice ? 
                '<p class="origin-price">' + '$' +
                product.originPrice + '</p>'  : ""}
                <p class="discount-price">$${product.discountPrice}</p>
            </div>
            
            <div class="buy-num-row">
                <p class="num-p">數量</p>
                <select class="buy-num">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>
            <button class="add-to-cart">加入購物車</button>
            <div class="add-success hidden-element">
                <img class="check-icon" src="images/icons/check.png">
                <p class="add-success-p">加入購物車</p>
            </div>
        </div>
    </div>
    <div class="description-block">
        <p class="description-p">商品描述</p>
        <p class="product-description">
            ${product.description}
        </p>
    </div>
`;

document.querySelector(".js-product-info").innerHTML = productHtml;


// 新增購物車成功動畫提示，若有hidden-element(會隱藏標籤內容)的class則把該class刪除並新增visible-element的class，最後設定settimeout函數，預設讓動畫只顯示兩秒鐘就會把class改回預設值(隱藏狀態)
export function showAddSucces() {
    const successElement = document.querySelector(".add-success")
    if (successElement.classList.contains("hidden-element")) {
        successElement.classList.remove('hidden-element');
        successElement.classList.add('visible-element');

        setTimeout(() => {
            successElement.classList.remove('visible-element');
            successElement.classList.add('hidden-element');
        },2000);
    };
}

// 增加加入購物車的事件監聽器
document.querySelector(".add-to-cart").addEventListener('click', () => {
    const buyNum = Number(document.querySelector(".buy-num").value);
    addToCart(productId,buyNum); 
    renderHeader();
    showAddSucces();
});