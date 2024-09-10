import { getCartNum } from "../../data/cart.js";


export function renderHeader() {
    const headerhtml = `
    <div class="header-container">
        <div class="header-left">
            <a href="home.html">
                <p class="logo-text">小智購物網</p>
            </a>
        </div>
        
        <div class="header-right">
            <div class="search">
                <input class="search-input" placeholder="搜尋">
                <button class="search-button">
                    <img class="search-icon" src="images/icons/search.svg">
                </button>
            </div>
            <div class="cart">
                <a href="checkout.html">
                    <img class="cart-icon" src="images/icons/cart.png">
                </a>
                <p class="cart-num">${getCartNum()}</p>
            </div>
        </div>
    </div>
`;
    document.querySelector(".header").innerHTML = headerhtml;
    
    document.querySelector(".search-button").addEventListener("click", ()=> {
        const searchText = document.querySelector(".search-input").value;
        location.href = `/search.html?input=${searchText}`;
    });
}

