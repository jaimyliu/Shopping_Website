export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
    cart = [];
} 

function updateStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
};

// 購物車數量函數
export function addToCart(productId, buyNum=1) {
    let cartItem; //定義購物車商品，假入cart陣列裡的id=productId，則cartItem = item
    cart.forEach((item) => {
        if (item.id === productId) {
            cartItem = item;
        } 
    });
    // // 如果cartItem在cart的array裡存在某個商品，則購物車該商品cartItem的總數num+1，若購物車原先不存在該商品，則新增一個商品到購物車的陣列裡，且設定數量為1
    if (cartItem) {
        cartItem.num += buyNum;
    } else {
        cart.push({
            id: productId,
            num: 1,
            deliveryId: "1"
        });
    }
    updateStorage();
}

export function getCartNum() {
    let cartNum = 0; //設定變數 購物車總數一開始為0
    cart.forEach((item) => {
        cartNum += item.num;
    }); //購物車cart裡面的每件商品num數字總和=購物車總數
    return cartNum;
};

// 結帳介面按了刪除扭，把刪除的商品移出cart的陣列裡，並創建新的變數newCart來代表刪除後的購物車
export function delteFromCart(productId) {
    const newCart = [];
    cart.forEach((item) => {
        if (item.id !== productId) {
            newCart.push(item);
        } //假如被刪除商品的productId != 原先購物車裡的商品ID，則代表該商品並非是刪除的商品，並把留下的商品都新增到新購物車newCart裡面
    });
    cart = newCart;
    updateStorage();
};

// 更新購物車的運送方式與購買數量
export function updateCart(productId,deliveryId, buyNum) {
    cart.forEach((item) => {
        if (item.id === productId) {
            if (deliveryId) {
            item.deliveryId = deliveryId;
            }

            if (buyNum) {
                item.num = buyNum;
            }
        }
    });
    updateStorage();
};