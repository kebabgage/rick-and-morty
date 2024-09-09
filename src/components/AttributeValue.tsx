import { Box, Typography } from "@mui/material";

interface AttributeValueProps {
  attribute: string;
  value?: string;
}
export const AttributeValue = ({ attribute, value }: AttributeValueProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", paddingBottom: 1 }}>
      <Typography sx={{ fontWeight: "bold", paddingRight: 1 }}>
        {attribute}
      </Typography>
      <Typography>{value ?? "-"}</Typography>
    </Box>
  );
};
