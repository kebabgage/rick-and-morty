import {
  Divider,
  Grid2 as Grid,
  Skeleton,
  TableCell,
  Typography,
} from "@mui/material";

interface TableRowSkeletonProps {
  columnSizes: number[];
}

/**
 * Returns 20 loading skeletons, that each represent a table row with the column sizes 
 * provided
 */
export const TableRowSkeleton = ({ columnSizes }: TableRowSkeletonProps) => {
  return (
    <>
      {[...Array(20).keys()].map(() => (
        <Grid container>
          <Divider
            sx={{ paddingLeft: "40px" }}
            orientation="vertical"
            variant="middle"
            flexItem
          />

          {columnSizes.map((size, index) => (
            <>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                key={index}
              />
              <Grid
                key={index}
                size={size}
                sx={{
                  // TODO: Make this
                  display: "flex",
                  alignContent: "center",
                  flexWrap: "wrap",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  height: "40px",
                }}
              >
                <Typography sx={{ width: "90%", paddingX: }}>
                  <Skeleton sx={{ width: "90%" }} />
                </Typography>
              </Grid>
            </>
          ))}
        </Grid>
      ))}
    </>
  );
};
