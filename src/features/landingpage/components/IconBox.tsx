import { Stack } from "@mui/material";

import { Colors } from "@config/styles";

interface Props {
  icon: React.ReactNode;
  isSocialMedia?: boolean;
}

function IconBox({ icon, isSocialMedia }: Props) {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        gap: { xs: 2, md: 0 },
        bgcolor: !isSocialMedia ? Colors.primaryBlue : Colors.secondaryGreen,
        width: !isSocialMedia ? "64px" : "32px",
        height: !isSocialMedia ? "64px" : "32px",
        aspectRatio: 1 / 1,
        borderRadius: !isSocialMedia ? 2 : 1,
        p: 2,
        mb: { xs: isSocialMedia ? 0 : 2, md: 4 },
        WebkitBoxShadow: !isSocialMedia
          ? `10px 10px 16px 0px ${Colors.shadowGrey}`
          : "none",
        MozBoxShadow: !isSocialMedia
          ? `10px 10px 16px 0px ${Colors.shadowGrey}`
          : "none",
        boxShadow: !isSocialMedia
          ? `10px 10px 16px 0px ${Colors.shadowGrey}`
          : "none",
      }}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          maxHeight: !isSocialMedia ? "auto" : "19.5",
          color: !isSocialMedia
            ? Colors.white
            : (theme) => theme.palette.primary.main,
        }}
      >
        {icon}
      </Stack>
    </Stack>
  );
}

export default IconBox;
