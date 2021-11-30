import { useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import { Box, FormControl, Grid, MenuItem } from "@mui/material";
import dynamic from "next/dynamic";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
const Tooltip = dynamic(() => import("@mui/material/Tooltip"));
import type { SelectChangeEvent } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import {
  addTag,
  removeTag,
  changeOrder,
} from "../../context/reducers/projectSlices";
import { filterStyles as styles } from "./Projects.style";
import stylesUtility from "../Utilities/Utilities.style";

function Filter() {
  const projectState = useAppSelector((state) => state.projects);
  const dispatch = useAppDispatch();
  const [filterInput, setFilterInput] = useState<string>("");

  const handleInput = (event: KeyboardEvent<HTMLInputElement>) => {
    if (
      !projectState.tags.includes(filterInput.toUpperCase()) &&
      !filterInput.includes(" ") &&
      (event.key === "Enter" ||
        event.key === " " ||
        event.key === "Spacebar") &&
      filterInput
    ) {
      dispatch(addTag({ title: filterInput.toUpperCase() }));
      setFilterInput("");
    }
  };

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterInput(event.target.value.replace(/\s+/g, ""));
  };

  const handleRemoveTag = (text: string) => () =>
    dispatch(removeTag({ title: text.toUpperCase() }));

  const handleChangeOrder = (event: SelectChangeEvent) => {
    dispatch(changeOrder({ sortAlphabet: event.target.value }));
  };

  return (
    <Box
      flexDirection="column"
      sx={{
        ...stylesUtility.flexDefault,
        ...styles.container,
      }}>
      <TextField
        onChange={handleFilter}
        onKeyDown={handleInput}
        value={filterInput}
        label={
          <Typography
            variant="button"
            textAlign="center"
            sx={styles.input.text.label}>
            Enter Tags
          </Typography>
        }
        InputProps={{
          sx: styles.input.text.main,
        }}
        variant="standard"
        fullWidth
      />
      <Grid
        container
        sx={{
          ...stylesUtility.gridContainer,
          ...styles.tags.gridContainer,
        }}
        spacing={{ xs: 0.5 }}>
        {projectState.tags.map((text, index) => (
          <Grid key={`${text}|-${index}`} item xs={6} md={4} xl={4} mb="10px">
            <Tooltip
              title={<Typography variant="body2">{text}</Typography>}
              disableInteractive>
              <Chip
                sx={styles.tags.container}
                label={
                  <Typography
                    variant="button"
                    textAlign="center"
                    sx={styles.input.text.label}>
                    {text}
                  </Typography>
                }
                onDelete={handleRemoveTag(text)}
              />
            </Tooltip>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          ...stylesUtility.flexDefault,
          ...styles.forms.container,
        }}>
        <Typography variant="button" sx={styles.forms.text.title}>
          Sort Alphabetically
        </Typography>
        <FormControl variant="standard" sx={styles.forms.select.container}>
          <Select
            value={projectState.sortByTitle}
            onChange={handleChangeOrder}
            sx={styles.forms.select.text}>
            <MenuItem value="asc" sx={styles.forms.select.text}>
              Ascending
            </MenuItem>
            <MenuItem value="desc" sx={styles.forms.select.text}>
              Descending
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default Filter;
