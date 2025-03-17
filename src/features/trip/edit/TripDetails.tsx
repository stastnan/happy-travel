import { useParams } from "react-router-dom";

import { CircularProgress, Stack } from "@mui/material";

import { useGetTripByIdQuery } from "../store/tripsApi";

export default function TripDetails() {
  const { tripId } = useParams();

  const {
    data: trip,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetTripByIdQuery(tripId);

  if (isLoading) {
    return (
      <Stack justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  } else if (isSuccess) {
    return <>{trip?.name}</>;
  } else if (isError) {
    throw error;
  } else {
    return null;
  }
}
