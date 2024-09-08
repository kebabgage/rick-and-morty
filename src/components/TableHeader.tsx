import { alpha, Divider, Grid2 as Grid, Paper, useTheme } from "@mui/material";
import { TableCell } from "./TableRow";

interface TableHeaderProps {
  columnValues: {
    value: string;
    columnSize: number;
  }[];
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
              <>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  key={index}
                />
                <Grid
                  key={index}
                  size={column.columnSize}
                  sx={{
                    // TODO: Make this
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
              </>
            );
          })}
        </Grid>
      </Paper>
    </>
  );
};
