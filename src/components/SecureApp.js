import ShoppingListApp from "./ShoppingListApp";
import RequireAuth from "@auth-kit/react-router/RequireAuth";

function SecureApp() {
  return (
    <RequireAuth fallbackPath={"/login"}>
      <ShoppingListApp />
    </RequireAuth>
  );
}

export default SecureApp;
