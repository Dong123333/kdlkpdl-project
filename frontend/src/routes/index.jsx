import USDJPYPage from "../Page/USDJPY.jsx";
import USDGBPPage from "../Page/USDGBP.jsx";
import USDEURPage from "../Page/USDEUR.jsx";

export const routes = [
    {path: '/', component: USDJPYPage},
    {path: '/USD-JPY', component: USDJPYPage},
    {path: '/USD-GBP', component: USDGBPPage},
    {path: '/USD-EUR', component: USDEURPage},
]