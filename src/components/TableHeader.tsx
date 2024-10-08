import { alpha, Divider, Grid2 as Grid, Paper, useTheme } from "@mui/material";
import { Fragment } from "react";
import { ColumnValues, TableCell } from "./TableRow";

interface TableHeaderProps {
  columnValues: ColumnValues[];
}

export const TableHeader = ({ columnValues }: TableHeaderProps) => {
  const theme = useTheme();
  return (
    <>
      <Paper
        square
        sx={{
          backgroundColor: alpha(theme.palette.primary.main, 0.5),
        }}
      >
        <Grid container>
          <Divider
            sx={{ paddingLeft: "40px" }}
            orientation="vertical"
            variant="middle"
            flexItem
          />

          {columnValues.map((column, index) => {
            return (
              <Fragment key={column.value}>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  key={column.value + "-divider"}
                />
                <Grid
                  key={column.value + "-table-cell"}
                  size={column.columnSize}
                  sx={{
                    display: "flex",
                    alignContent: "center",
                    flexWrap: "wrap",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  <TableCell>{column.value}</TableCell>
                </Grid>
              </Fragment>
            );
          })}
        </Grid>
      </Paper>
    </>
  );
};
