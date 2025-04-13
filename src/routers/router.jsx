import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AdminLogin from "../components/AdminLogin";
import CategoryList from "../components/CategoryList";
import Login from "../components/Login";
import Register from "../components/Register";
import About from '../pages/about/About';
import BookDetails from '../pages/books/BookDetails';
import Books from '../pages/books/Books';
import CartPage from "../pages/books/CartPage";
import CategoryBooksList from '../pages/books/CategoryBooksList';
import CheckoutPage from "../pages/books/CheckoutPage";
import OrderPage from "../pages/books/OrderPage";
import CategoryPage from "../pages/CategoryPage";
import AddBook from "../pages/dashboard/addBook/AddBook";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import UpdateBook from "../pages/dashboard/EditBook/UpdateBook";
import AccountManagement from "../pages/dashboard/Folders/AccountManagement";
import ManageBooks from "../pages/dashboard/manageBooks/ManageBooks";
import ManageCategories from "../pages/dashboard/manageCategories/ManageCategories";
import ManageOrders from "../pages/dashboard/manageOrders/ManageOrders";
import ManageUsers from '../pages/dashboard/manageUsers/ManageUsers';
import UserDashboard from "../pages/dashboard/users/UserDashboard";
import Home from "../pages/home/Home";
import UserProfile from '../pages/profile/UserProfile';
import Services from '../pages/services/Services';
import Contact from '../pages/contact/Contact';
import Privacy from '../pages/legal/Privacy';
import Terms from '../pages/legal/Terms';
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "/categories",
            element: <CategoryList/>
        },
        {
            path: "/category/:slug",
            element: <CategoryPage/>
        },
        {
            path: "/orders",
            element: <PrivateRoute><OrderPage/></PrivateRoute>
        },
        {
            path: "/about",
            element: <About />
        },
        {
            path: "/services",
            element: <Services />
        },
        {
            path: "/contact",
            element: <Contact />
        },
        {
            path: "/privacy",
            element: <Privacy />
        },
        {
            path: "/terms",
            element: <Terms />
        },
        {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/register",
          element: <Register/>
        },
        {
          path: "/cart",
          element: <CartPage/>
        },
        {
          path: "/checkout",
          element: <PrivateRoute><CheckoutPage/></PrivateRoute>
        },
        {
          path: "/books/:id",
          element: <BookDetails/>
        },
        {
          path: "/user-dashboard",
          element: <PrivateRoute><UserDashboard/></PrivateRoute>
        },
        {
          path: "books",
          element: <Books />
        },
        {
          path: "books/:id",
          element: <BookDetails />
        },
        {
          path: "profile",
          element: <UserProfile />
        },
        {
          path: "categories/:id",
          element: <CategoryBooksList />
        }
      ]
    },
    {
      path: "/admin",
      element: <AdminLogin/>
    },
    {
      path: "/dashboard",
      element: <AdminRoute>
        <DashboardLayout/>
      </AdminRoute>,
      children:[
        {
          path: "",
          element: <AdminRoute><Dashboard/></AdminRoute>
        },
        {
          path: "add-new-book",
          element: <AdminRoute>
            <AddBook/>
          </AdminRoute>
        },
        {
          path: "edit-book/:id",
          element: <AdminRoute>
            <UpdateBook/>
          </AdminRoute>
        },
        {
          path: "manage-books",
          element: <AdminRoute>
            <ManageBooks/>
          </AdminRoute>
        },
        {
          path: "manage-categories",
          element: <AdminRoute>
            <ManageCategories/>
          </AdminRoute>
        },
        {
          path: "manage-orders",
          element: <AdminRoute>
            <ManageOrders/>
          </AdminRoute>
        },
        {
          path: "account-management",
          element: <AdminRoute><AccountManagement /></AdminRoute>,
        },
        {
          path: "manage-users",
          element: <AdminRoute>
            <ManageUsers/>
          </AdminRoute>
        }
      ]
    }
  ]);

  export default router;