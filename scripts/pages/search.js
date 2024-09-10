import { searchProduct } from "../../data/totalProducts.js";
import { renderProductGrid } from "../components/productGrid.js";
import { renderHeader } from "../components/header.js";


renderHeader();
// 創建網址參數的物件，透過網址做解析
const params = new URLSearchParams(location.search);
console.log(params.get("input"));

const products = searchProduct(params.get("input"));
renderProductGrid(products);
