import {cart, delteFromCart, updateCart} from "../../data/cart.js";
import { products,getProduct } from "../../data/totalProducts.js";
import { deliveryOptions } from "../../data/delivery.js";
import { renderCheckoutPrice } from "./checkoutPrice.js";
import { renderHeader } from "./header.js";

export function renderCheckoutOrder() {

// 生成運送方式的html程式碼
    function generateDeliveryOptions (productId,deliveryId) {
        let html = '';
        deliveryOptions.forEach((option) => {
            html +=`
                <div class="delivery-option">
                    <input 
                        ${option.id === deliveryId ? "checked" : ""}
                        type="radio"  class="delivery-option-input" name="delivery-option-${productId}"       
                        data-product-id=${productId}
                        data-delivery-id=${option.id}
                    >
                    <p class="delivery-option-name">${option.name}</p>
                    <p class="delivery-option-price">$${option.price}</p>
                </div>
                `
        });
        return html;
    }

    // 生成購物車介面的HTML程式碼
    let checkoutHtml = '';
    cart.forEach((item) => {
        const productId = item.id;
        let cartItem = getProduct(productId);
        // console.log(cartItem);
        checkoutHtml += `
        <div class="product-row js-product-row-${cartItem.id}">
            <img class="product-image" src="${cartItem.img}" />
            <div class="product-information">
                <p class="product-name">${cartItem.name}</p>
                <div class="product-detail">
                    <div class="product-detail-left">
                        <div class="product-price">
                        ${cartItem.originPrice ? 
                            '<p class="origin-price">$' + cartItem.originPrice + '</p>' : ""}
                            <p class="discount-price">$${cartItem.discountPrice}</p>
                        </div>
                        <div class="buy-num-row">
                            <p class="num-p">數量</p>
                            <input 
                                data-product-id=${cartItem.id}
                                class="buy-num" value="${item.num}">
                        </div>
                    </div>
                    <div class="product-detail-right">
                        <button 
                        data-product-id=${cartItem.id}
                        class="delete-from-cart">刪除</button>
                    </div>
                </div>
                <hr class="product-information-hr">
                <div class="delivery-options">
                    <p class="delivery-option-p">運送方式</p>
                    ${generateDeliveryOptions(cartItem.id, item.deliveryId)}
                </div>             
            </div>
        </div>
    `;
    });

    document.querySelector('.checkout-left').innerHTML = checkoutHtml;

    // 更新刪除商品
    document.querySelectorAll('.delete-from-cart').forEach((button) => {
        button.addEventListener("click", () => {
            const productId = button.dataset.productId;
            delteFromCart(productId);
            document.querySelector(`.js-product-row-${productId}`).remove();
            console.log(cart);
            renderCheckoutPrice();
            renderHeader();
        });
    });

    // 更新運送方式，找到每一個關於運送方式的input標籤裡，設定事件監聽器，只要按按鈕就會觸發
    document.querySelectorAll(".delivery-option-input").forEach((input) => {
        input.addEventListener('click', () => {
            const productId = input.dataset.productId;
            const deliveryId = input.dataset.deliveryId;
            updateCart(productId, deliveryId, false);
            renderCheckoutPrice();
        });
    });


    // 更新購買數量，找到每一個關於購買數量的input標籤裡，設定事件監聽器，只要修改數量就會觸發
    document.querySelectorAll(".buy-num").forEach((input) => {
        input.addEventListener('change', () => {
            const productId = input.dataset.productId;
            const buyNum = Number(input.value);
            updateCart(productId,  false, buyNum);
            renderCheckoutPrice();
            renderHeader();
        });
    });
}