import {cart, addToCart, getCartNum} from "../../data/cart.js";
import { renderHeader } from "../components/header.js";

export function renderProductGrid(products) {

    let html = "";

    // <a href="product.html#${product.id}"> product.html#${product.id}讓每個商品的網址都會產生相對應的商品ID在網址後面，這樣在product.js就可以透過產生的id來獲取商品詳細資訊
    products.forEach( product => {
        html += `
            <div class="product-block">
                <a href="product.html#${product.id}">
                    <div class="product-image-row">
                        <img class="product-image" src="${product.img}">
                        <p class="product-discount">
                            ${product.discount ? product.discount + "折" : ""} 
                        </p>
                    </div>
                    <div class="product-information">
                        <div class="product-text">
                            <p class="product-name">${product.name}</p>
                            <div class="add-success hidden-element js-add-success-${product.id}">
                                <img class="check-icon" src="images/icons/check.png">
                                <p class="add-success-p">加入購物車</p>
                            </div>
                            <div class="product-price-row">
                                <div class="product-price">
                                    <p class="discount-price">$${product.discountPrice}</p>
                                    <p class="origin-price">
                                        ${product.originPrice ? "$" + product.originPrice : ""}
                                    </p>
                                </div>
                                <img 
                                    data-product-id=${product.id} 
                                    class="add-to-cart" 
                                    src="images/icons/cart.png">
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        `;
    });

    // 取得購物頁面的div標籤並把products.js的商品陣列透過forEach函式逐個寫入html後，最後透過innerHTML寫成html格式的標籤內容，形成商品主畫面
    document.querySelector(".product-grid").innerHTML = html;

    // 
    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault(); //阻止預設事件進行
            const productId = button.dataset.productId;     //透過data開頭的data-product-id會形成一個dataset的物件類型資料，找到其productId設定成商品的獨有id
            addToCart(productId); //呼叫cart.js的addToCart函式，把選擇的商品新增到購物車裡面

            //呼叫定義購物車的商品總數量函數
            const cartNum = getCartNum();
            document.querySelector(".cart-num").innerHTML = cartNum; //home.html裡顯示購物車商品總數的標籤
            console.log(cartNum);
            console.log(cart);
            renderHeader();
            showAddSucces(productId);
        });
    });


    function showAddSucces(productId) {
        const successElement = document.querySelector(`.js-add-success-${productId}`)
        if (successElement.classList.contains("hidden-element")) {
            successElement.classList.remove('hidden-element');
            successElement.classList.add('visible-element');

            setTimeout(() => {
                successElement.classList.remove('visible-element');
                successElement.classList.add('hidden-element');
            },2000);
        };
    }
}