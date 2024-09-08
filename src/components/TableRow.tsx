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
import { useState } from "react";
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

interface TableRowProps {
  /**
   * The index of the row
   */
  index?: number;

  /**
   * The character information to display
   *
   * @deprecated
   */
  character?: Character;

  /**
   * Values to display
   */
  columnValues: {
    /**
     *
     */
    value?: string;

    /**
     *
     */
    columnSize: number;
  }[];

  selected?: boolean;

  onClick?: () => void;
}

export const TableRow = ({
  index,
  character,
  columnValues,
  selected,
  onClick,
}: TableRowProps) => {
  const theme = useTheme();
  // const [showOverview, setShowOverview] = useState(false);

  // const onClick = () => {
  //   setShowOverview(!showOverview);
  // };

  return (
    <>
      <Paper
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
          <IconButton onClick={onClick}>
            {selected ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>

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
