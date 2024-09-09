import {
  Divider,
  Grid2 as Grid,
  Skeleton,
  TableCell,
  Typography,
} from "@mui/material";
import { Fragment } from "react";

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
      {[...Array(20).keys()].map((item) => (
        <Grid container data-testid="table-row" key={item}>
          <Divider
            key={item}
            sx={{ paddingLeft: "40px" }}
            orientation="vertical"
            variant="middle"
            flexItem
          />

          {columnSizes.map((size, index, items) => (
            <Fragment key={index}>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Grid
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
                <Typography sx={{ width: "90%", paddingX: 1 }}>
                  <Skeleton
                    sx={{ width: "90%" }}
                    data-testid="cell-loading-skeleton"
                  />
                </Typography>
              </Grid>
            </Fragment>
          ))}
        </Grid>
      ))}
    </>
  );
};
