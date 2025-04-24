import { Box, ButtonBase } from "@mui/material";

import { ExpenseCategory } from "@features/trip/types";

interface Props {
  onClick?: () => void;
  children: React.ReactNode;
  color: string;
  backgroundColor: string;
  borderColor?: string;
  category: ExpenseCategory;
  isSmallIcon?: boolean;
}

export default function ExpenseCategoryIcon({
  onClick,
  children,
  color,
  backgroundColor,
  borderColor,
  category,
  isSmallIcon,
}: Props) {
  return (
    <Box
      aria-label={`${category} icon`}
      component={onClick ? ButtonBase : Box}
      onClick={onClick}
      sx={{
        width: isSmallIcon ? 40 : 75,
        height: isSmallIcon ? 40 : 75,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: color,
        bgcolor: backgroundColor,
        borderRadius: isSmallIcon ? 1 : 2,
        border: onClick ? 3 : 0,
        borderColor: borderColor,
      }}
    >
      {children}
    </Box>
  );
}
