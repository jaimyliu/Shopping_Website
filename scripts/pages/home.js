import {cart, addToCart, getCartNum} from "../../data/cart.js";
import {products} from "../../data/totalProducts.js";
import { renderHeader } from "../components/header.js";
import { renderProductGrid } from "../components/productGrid.js";

renderHeader();
renderProductGrid(products);

