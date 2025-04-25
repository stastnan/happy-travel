import { useNavigate, useParams } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import {
  Breadcrumbs,
  CircularProgress,
  Link,
  Stack,
  Typography,
} from "@mui/material";

import { AppRoutes } from "@config/routes";
import { Colors } from "@config/styles";
import AppButton from "@features/ui/AppButton";
import AppDialog from "@features/ui/AppDialog";
import useDialog from "@hooks/useDialog";
import useToast from "@hooks/useToast";

import {
  useDeleteTripMutation,
  useGetTripByIdQuery,
  useUpdateTripMutation,
} from "../store/tripsApi";
import type { Trip } from "../types";
import Hero from "./Hero/Hero";
import TripTabs from "./Tabs/TripTabs";

export default function TripDetails() {
  const navigate = useNavigate();
  const { tripId } = useParams();

  const {
    data: trip,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetTripByIdQuery(tripId);

  const { isOpen, close, open } = useDialog();
  const { showSuccessMessage } = useToast();

  const [updateTrip] = useUpdateTripMutation();
  const [deleteTrip] = useDeleteTripMutation();

  const onDeleteTrip = async () => {
    close();
    navigate(AppRoutes.trips);
    await deleteTrip(tripId!);
    showSuccessMessage("Trip was successfully deleted");
  };

  const onTripUpdate = (data: Partial<Trip>) => {
    updateTrip({ id: trip!.id, data });
  };

  if (isLoading) {
    return (
      <Stack justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  } else if (isSuccess) {
    return (
      <Stack>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction="row"
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href={AppRoutes.trips}>
              Trips
            </Link>
            <Typography variant="subtitle2" color={Colors.secondaryBlue}>
              {trip.name}
            </Typography>
          </Breadcrumbs>
          <AppButton
            isSmall
            color="error"
            endIcon={<DeleteIcon />}
            onClick={open}
          >
            Delete
          </AppButton>
        </Stack>
        <Hero trip={trip} onUpdate={onTripUpdate} />
        <TripTabs trip={trip} onUpdate={onTripUpdate} />
        <AppDialog
          title="Are you sure that you want to delete this trip?"
          primaryButtonText="Yes"
          secondaryButtonText="No"
          isOpen={isOpen}
          onPrimaryButtonClick={onDeleteTrip}
          onSecondaryButtonClick={close}
          onClose={close}
          maxWidth={460}
          disableBottomTitlePadding
          hideCloseButton
        />
      </Stack>
    );
  } else if (isError) {
    throw error;
  } else {
    return null;
  }
}
