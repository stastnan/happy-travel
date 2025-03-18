import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { MobileStepper } from "@mui/material";

import AppButton from "@features/ui/AppButton";
import { useBreakpoints } from "@hooks/useBreakpoints";
import { useAppDispatch, useAppSelector } from "@store/index";

import { WIZARD_STEPS } from "../../data";
import { previousStep, selectCurrentStep } from "../../store/tripWizardSlice";

interface Props {
  isLoading?: boolean;
}

export default function Pagination({ isLoading }: Props) {
  const dispatch = useAppDispatch();
  const { md, lg } = useBreakpoints();
  const currentStep = useAppSelector(selectCurrentStep);
  const onBackButtonClick = () => dispatch(previousStep());

  return (
    <MobileStepper
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        p: { xs: 2, md: 3 },
        borderRadius: 4,
        ".MuiMobileStepper-dots": {
          visibility: "hidden",
        },
        display: "flex",
        whiteSpace: "nowrap",
        gap: 2,
      }}
      variant={lg ? "dots" : "text"}
      steps={WIZARD_STEPS.length}
      position="static"
      activeStep={currentStep}
      nextButton={
        <AppButton
          type="submit"
          endIcon={<ArrowForwardIcon />}
          fullWidth={!md}
          loading={isLoading}
        >
          Next
        </AppButton>
      }
      backButton={
        <AppButton
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          fullWidth={!md}
          sx={{ visibility: currentStep === 0 ? "hidden" : "visible" }}
          onClick={onBackButtonClick}
        >
          Back
        </AppButton>
      }
    />
  );
}
