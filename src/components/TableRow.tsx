import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Divider,
  Grid2 as Grid,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Fragment } from "react";

interface TableCellProps {
  children: React.ReactNode;
}

export const TableCell = ({ children }: TableCellProps) => (
  <Box
    sx={{
      paddingX: 1,
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    }}
  >
    <Typography
      sx={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      }}
    >
      {children}
    </Typography>
  </Box>
);

export interface ColumnValues {
  /**
   *
   */
  value: string;

  /**
   *
   */
  columnSize: number;
}

interface TableRowProps {
  /**
   * Values to display
   */
  columnValues: ColumnValues[];

  selected?: boolean;

  onClick?: () => void;
}

export const TableRow = ({
  columnValues,
  selected,
  onClick,
}: TableRowProps) => {
  const theme = useTheme();

  return (
    <>
      <Paper
        data-testid="table-row"
        key={columnValues.toString()}
        square
        onClick={onClick}
        sx={{
          width: "100%",
          "&:hover": {
            backgroundColor: alpha(theme.palette.secondary.dark, 0.2),
            cursor: "pointer",
          },
          backgroundColor: selected
            ? alpha(theme.palette.secondary.dark, 0.4)
            : undefined,
        }}
      >
        <Grid container>
          {onClick !== undefined ? (
            <IconButton onClick={onClick} data-testid="open-overview">
              {selected ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          ) : (
            // Return an empty box to make up for empty space
            <Box sx={{ width: "40px" }}></Box>
          )}

          {columnValues.map((column, i) => {
            return (
              <Fragment key={i}>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Grid
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
