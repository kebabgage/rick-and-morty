import { Box, Typography } from "@mui/material";

interface AttributeValueProps {
  /**
   * The label of the attribute
   */
  attribute: string;

  /**
   * The value of the attribute
   */
  value?: string;
}

/**
 * Used to display information in the format of a label and a corresponding value.
 */
export const AttributeValue = ({ attribute, value }: AttributeValueProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", paddingBottom: 1 }}>
      <Typography
        sx={{ fontWeight: "bold", paddingRight: 1 }}
        data-testid={attribute.toLowerCase() + "-attribute"}
      >
        {attribute}
      </Typography>
      <Typography data-testid={attribute.toLowerCase() + "-value"}>
        {value ?? "-"}
      </Typography>
    </Box>
  );
};
