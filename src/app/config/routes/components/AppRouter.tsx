import { Route, Routes } from "react-router-dom";

import AuthLayout from "@features/ui/AuthLayout";
import AccountLayout from "@features/ui/layout/AccountLayout/AccountLayout";
import AddTripPage from "@pages/account/addTrips";
import DashboardPage from "@pages/account/dashboard";
import TripDetailsPage from "@pages/account/trips/trip-details";
import TripsPage from "@pages/account/trips/trips";
import HomePage from "@pages/home";
import LandingPage from "@pages/landing-page";
import LoginPage from "@pages/login";
import NotFoundPage from "@pages/not-found";
import SignUpPage from "@pages/sign-up";

import { AppRoutes } from "../AppRoutes";
import ProtectedRoute from "./ProtectedRoute";

function AppRouter() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path={AppRoutes.landingPage} element={<LandingPage />} />

      <Route path={AppRoutes.home} element={<HomePage />} />
      <Route element={<AuthLayout />}>
        <Route path={AppRoutes.signUp} element={<SignUpPage />} />
        <Route path={AppRoutes.login} element={<LoginPage />} />
      </Route>
      {/* Account Pages */}
      <Route
        element={
          <ProtectedRoute>
            <AccountLayout />
          </ProtectedRoute>
        }
      >
        <Route path={AppRoutes.dashboard} element={<DashboardPage />} />
        <Route path={AppRoutes.trips} element={<TripsPage />} />
        <Route
          path={`${AppRoutes.trips}/:tripId`}
          element={<TripDetailsPage />}
        />
        <Route path={AppRoutes.addTrip} element={<AddTripPage />} />
      </Route>
      {/* Not Found Page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
