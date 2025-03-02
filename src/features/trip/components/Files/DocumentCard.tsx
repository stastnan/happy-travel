import CloseIcon from "@mui/icons-material/Close";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import {
  Box,
  CircularProgress,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  name: string;
  url?: string | null;
  onRemoveClick: () => void;
  uploadProgress: number | undefined;
  isRemoving: boolean;
}

export default function DocumentCard({
  name,
  url,
  onRemoveClick,
  uploadProgress,
  isRemoving,
}: Props) {
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 4,
        border: 1,
        borderColor: "grey.200",
        width: 200,
        height: "100%",
      }}
    >
      {uploadProgress != undefined && (
        <CircularProgress
          variant="determinate"
          value={uploadProgress}
          sx={{
            position: "absolute",
            top: "calc(50% - 1.25rem)",
            left: "calc(50% - 1.25rem)",
          }}
        />
      )}
      <IconButton
        aria-label="close"
        onClick={onRemoveClick}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          width: "fit-content",
          opacity: uploadProgress ? 0.2 : 1,
        }}
        disabled={isRemoving}
      >
        {isRemoving ? (
          <CircularProgress size={24} />
        ) : (
          <CloseIcon sx={{ color: "text.primary" }} />
        )}
      </IconButton>
      <Stack
        href={isRemoving ? "" : url ?? "#"}
        component={Link}
        target={isRemoving ? "_self" : "_blank"}
        rel="noopener noreferrer"
        sx={{
          gap: 2,
          width: "100%",
          height: "100%",
          p: 2,
          pt: 6,
          textDecoration: "none",
          opacity: uploadProgress ? 0.2 : 1,
        }}
      >
        <Stack gap={2}>
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              width: "100%",
              height: 133,
              bgcolor: "grey.100",
              borderRadius: 4,
            }}
          >
            <InsertDriveFileIcon sx={{ color: "text.secondary" }} />
          </Stack>
          <Typography
            color="text.primary"
            noWrap
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              maxWidth: "100%",
            }}
          >
            {name}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
