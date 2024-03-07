import ShoppingList from "./components/ShoppingList";
import PageNotFound from "./components/PageNotFound";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./components/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
export default App;

function App() {
  const store = createStore({
    authName: "_auth",
    authType: "cookie",
    cookieDomain: window.location.hostname,
    cookieSecure: false,
  });
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <ShoppingList />,
      errorElement: <PageNotFound />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <AuthProvider store={store}>
      <ChakraProvider>
        <RouterProvider router={browserRouter} />
      </ChakraProvider>
    </AuthProvider>
  );
}
