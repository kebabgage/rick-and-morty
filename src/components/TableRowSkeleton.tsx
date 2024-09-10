import { Divider, Grid2 as Grid, Skeleton, Typography } from "@mui/material";
import { Fragment } from "react";

interface TableRowSkeletonProps {
  skeletonNumber: number;
  columnSizes: number[];
}

/**
 * Returns a number loading skeletons, that each represent a table row with the column sizes
 * provided
 */
export const TableRowSkeleton = ({
  skeletonNumber,
  columnSizes,
}: TableRowSkeletonProps) => {
  return (
    <>
      {[...Array(skeletonNumber).keys()].map((item) => (
        <Grid container data-testid="table-row" key={item}>
          <Divider
            sx={{ paddingLeft: "40px" }}
            orientation="vertical"
            variant="middle"
            flexItem
          />

          {columnSizes.map((size, index) => (
            <Fragment key={index}>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Grid
                size={size}
                sx={{
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
