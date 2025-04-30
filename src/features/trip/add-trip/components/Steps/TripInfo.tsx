import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import {
  Box,
  ButtonBase,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Colors } from "@config/styles";
import DateSelectInput from "@features/ui/form/DateSelectInput";
import { useBreakpoints } from "@hooks/useBreakpoints";
import useDialog from "@hooks/useDialog";
import { useAppDispatch, useAppSelector } from "@store/index";

import PreviewImageDialog from "../../../components/PreviewImageDialog";
import { usePreviewImageSrc } from "../../../hooks/usePreviewImageSrc";
import type { Trip } from "../../../types";
import {
  nextStep,
  selectWizardTrip,
  setPreviewImage,
  setTravelInformation,
} from "../../store/tripWizardSlice";
import Pagination from "../Navigation/Pagination";

interface FormInput {
  previewImage: Trip["previewImage"];
  name: Trip["name"];
  description: Trip["description"];
  startDate: Trip["startDate"];
  endDate: Trip["endDate"];
}

export default function TripInfo() {
  const { isOpen, open, close } = useDialog();
  const {
    handleSubmit,
    control,
    onSubmit,
    formValues,
    register,
    onPreviewImageSave,
    errors,
    previewImageSrc,
    onPreviewImageChange,
    tripId,
  } = useTripInfoForm({ closePreviewImageDialog: close });

  const { md } = useBreakpoints();

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ width: "100%" }}
      gap={3}
    >
      <Stack direction={{ xs: "column", md: "row" }} gap={3}>
        <Stack>
          <ButtonBase
            onClick={open}
            sx={{
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 0.5,
              height: 152,
              minWidth: { xs: "100%", md: 152 },
              border: 1,
              borderColor: "text.secondary",
            }}
          >
            {previewImageSrc ? (
              <Box
                component="img"
                sx={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 4,
                  objectFit: "cover",
                  aspectRatio: "1/1",
                }}
                src={previewImageSrc}
                alt="Trip preview"
              />
            ) : (
              <>
                <ImageSearchIcon sx={{ color: Colors.disabled }} />
                <Typography variant="subtitle1" color={Colors.disabled}>
                  Preview image
                </Typography>
              </>
            )}
          </ButtonBase>
          {errors.previewImage && (
            <FormHelperText error sx={{ maxWidth: 152 }}>
              {errors.previewImage.message}
            </FormHelperText>
          )}
          <input
            type="hidden"
            {...register("previewImage", {
              required: "Please select a preview image",
            })}
          />
        </Stack>

        <Stack sx={{ width: "100%" }} gap={3}>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Please specify your trip name" }}
            render={({ field: { ref, ...field }, fieldState }) => (
              <TextField
                inputRef={ref}
                variant="standard"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Trip Name"
                autoFocus={md}
                helperText={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                {...field}
              />
            )}
          />
          <Stack direction="row" gap={2}>
            <DateSelectInput
              control={control}
              name="startDate"
              label="Start date"
              requiredErrorText="Please specify your start date"
              maxDate={formValues.endDate}
              validate={{
                startDate: (startDate) =>
                  !startDate ||
                  (startDate &&
                    formValues.endDate &&
                    startDate < formValues.endDate)
                    ? true
                    : "Start date should be before the End date",
              }}
              fullWidth
            />
            <DateSelectInput
              name="endDate"
              control={control}
              requiredErrorText="Please specify your end date"
              label="End date"
              minDate={formValues.startDate}
              fullWidth
              validate={{
                endDate: (endDate) =>
                  !endDate ||
                  (endDate &&
                    formValues.startDate &&
                    endDate > formValues.startDate)
                    ? true
                    : "End date should be after the Start date",
              }}
            />
          </Stack>
        </Stack>
      </Stack>

      <Controller
        name="description"
        control={control}
        render={({ field: { ref, ...field }, fieldState }) => (
          <TextField
            inputRef={ref}
            variant="standard"
            margin="normal"
            fullWidth
            id="description"
            label="Description"
            multiline
            maxRows={6}
            inputProps={{ maxLength: 200 }}
            helperText={
              fieldState.error?.message ?? `${field.value.length}/200`
            }
            error={Boolean(fieldState.error)}
            {...field}
          />
        )}
      />
      <Pagination />
      <PreviewImageDialog
        key={previewImageSrc}
        tripId={tripId}
        isOpen={isOpen}
        onClose={close}
        onSave={onPreviewImageSave}
        defaultPreviewImage={formValues.previewImage}
        defaultPreviewImageSrc={previewImageSrc}
        onChange={onPreviewImageChange}
      />
    </Stack>
  );
}

function useTripInfoForm({
  closePreviewImageDialog,
}: {
  closePreviewImageDialog: () => void;
}) {
  const trip = useAppSelector(selectWizardTrip);
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    watch,
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      name: trip.name,
      description: trip.description,
      startDate: trip.startDate,
      endDate: trip.endDate,
      previewImage: trip.previewImage,
    },
  });
  const formValues = watch();
  const previewImageSrc = usePreviewImageSrc(formValues.previewImage);

  const onPreviewImageSave = (previewImage: Trip["previewImage"]) => {
    closePreviewImageDialog();
    dispatch(setPreviewImage(previewImage));
    setValue("previewImage", previewImage);
    trigger("previewImage");
  };

  const onPreviewImageChange = (previewImage: Trip["previewImage"]) => {
    dispatch(setPreviewImage(previewImage));
    setValue("previewImage", previewImage);
  };

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    dispatch(nextStep());
    dispatch(setTravelInformation(data));
  };

  return {
    handleSubmit,
    control,
    onSubmit,
    formValues,
    register,
    errors,
    previewImageSrc,
    onPreviewImageSave,
    onPreviewImageChange,
    tripId: trip.id,
  };
}
