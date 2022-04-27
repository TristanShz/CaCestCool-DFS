import RegisterPage from "../pages/registerPage";
import LoginPage from "../pages/loginPage"
import HomePage from "../pages/homePage"
export default [
    {
        path: "/",
        component: RegisterPage,
    },
    {
        path:"/login",
        component: LoginPage,
    },
    {
        path:"/home",
        component: HomePage,
    }
]