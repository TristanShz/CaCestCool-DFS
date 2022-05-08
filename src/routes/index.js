import RegisterPage from "../pages/registerPage";
import LoginPage from "../pages/loginPage"
import HomePage from "../pages/homePage"
import MyAccount from "@/pages/myAccount";
import MessagesPage from "@/pages/messagesPage";
import ModifyPassword from "@/pages/modifyPassword";
import EditPostPage from "@/pages/editPostPage";

export default [
    {
        path: "/",
        component: RegisterPage,
    },
    {
        path: "/login",
        component: LoginPage,
    },
    {
        path: "/home",
        component: HomePage,
    },
    {
        path: "/account",
        component: MyAccount
    },
    {
        path: "/messages",
        component: MessagesPage
    },
    {
        path: "/password",
        component: ModifyPassword
    },
    {
        path: "/edit/:id",
        component: EditPostPage,
        name: "editPostPage",
    }
]