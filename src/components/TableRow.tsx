import {
  Box,
  Button,
  Divider,
  Grid2 as Grid,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { Character } from "../types/Character";
import { CharacterOverview } from "./CharacterOverview";
import { Fragment, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { alpha } from "@mui/material/styles";

interface TableCellProps {
  children: React.ReactNode;
}

export const TableCell = ({ children }: TableCellProps) => (
  // TODO: Make this styled
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
          {onClick !== undefined && (
            <IconButton onClick={onClick}>
              {selected ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}

          {columnValues.map((column, i, columnValues) => {
            return (
              <Fragment key={i}>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Grid
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
              </Fragment>
            );
          })}
        </Grid>
      </Paper>
    </>
  );
};
