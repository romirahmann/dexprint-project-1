import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes/Routes";
import { AlertProvider } from "./store/AlertContext";

function App() {
  return (
    <>
      <AlertProvider>
        <RouterProvider router={router} />
      </AlertProvider>
    </>
  );
}

export default App;
