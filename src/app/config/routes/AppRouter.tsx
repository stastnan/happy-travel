import { Route, Routes } from "react-router-dom";

import AuthLayout from "@features/ui/AuthLayout";
import Home from "@pages/home";
import Login from "@pages/login";
import NotFoundPage from "@pages/not-found";
import SignUp from "@pages/sign-up";

import { AppRoutes } from "./AppRoutes";

function AppRouter() {
  return (
    <Routes>
      <Route path={AppRoutes.home} element={<Home />} />
      <Route element={<AuthLayout />}>
        <Route path={AppRoutes.signUp} element={<SignUp />} />
        <Route path={AppRoutes.login} element={<Login />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
