import type { SyntheticEvent, KeyboardEvent, ChangeEvent } from "react";
import { useState, useCallback } from "react";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Snackbar,
  Typography,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import dynamic from "next/dynamic";
const Tooltip = dynamic(() => import("@mui/material/Tooltip"));
import type { SelectChangeEvent } from "@mui/material";
import { props } from "../Utilities/StylesProvider";
import { Icon } from "@iconify/react";
import MainButton from "../Utilities/MainButton";
import { changeColor, resetColor } from "../../context/reducers/navSlices";
import { useAppSelector, useAppDispatch } from "../../context/hooks";
import {
  adjustTextColor,
  adjustColorShade,
} from "../Utilities/ColorUtils/adjustColor";

const { stylesAll, colors: colorsAll } = props;
const SetColor = () => {
  const colors = useAppSelector((state) => state.nav);
  const dispatch = useAppDispatch();
  const escapeNonHex = (hex: string) =>
    hex.replace(/([^0-9A-F]+)/gi, "").substr(0, 6);
  const [colorCat, setColorCat] = useState<string>("Primary");
  const [colorInput, setColorInput] = useState<string>(
    escapeNonHex(colors.Primary)
  );
  const [snack, setSnack] = useState<boolean>(false);
  const isColorValid = colorInput.length === 3 || colorInput.length === 6;

  const handleChange = (event: SelectChangeEvent<string>) => {
    setColorCat(event.target.value);
    setColorInput(escapeNonHex(colors[event.target.value]));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setColorInput(escapeNonHex(event.target.value));
  };

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnack(false);
  };

  const convertToHexSix = (hexColor: string) => {
    let hexLength = hexColor.length;
    if (hexLength === 3) {
      hexColor = hexColor
        .split("")
        .map((hex) => {
          if (hex === "#") {
            return hex;
          }
          return hex + hex;
        })
        .join("");
    }

    return `#${hexColor}`;
  };

  const applyColor = useCallback(async () => {
    let hexColor = colorInput;
    let hexLength = hexColor.length;
    if (hexLength < 3 || (hexLength > 3 && hexLength < 6)) {
      setSnack(true);
      return;
    } else {
      dispatch(changeColor({ [colorCat]: convertToHexSix(hexColor) }));
    }
  }, [colorInput]);

  return (
    <Box
      sx={{
        ...stylesAll.utilities.flexDefault,
        ...stylesAll.setColor.container,
        flexDirection: "column",
        zIndex: 99999999,
      }}>
      <Snackbar open={snack} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          variant="filled"
          severity="error"
          action={
            <IconButton
              onClick={handleClose}
              size="medium"
              sx={{
                ...stylesAll.setColor.snackBar.action,
              }}>
              <Icon icon="entypo:cross" />
            </IconButton>
          }>
          <Typography
            variant="h6"
            sx={{
              ...stylesAll.setColor.snackBar.text,
            }}
            color="common.white">
            You need to write 3 digit or 6 digit hex value
          </Typography>
        </Alert>
      </Snackbar>
      <FormControl variant="standard" sx={{ width: "100%" }}>
        <Select
          value={colorCat}
          onChange={handleChange}
          sx={{
            fontWeight: 500,
            ...stylesAll.setColor.text,
          }}>
          <MenuItem value="Primary" sx={{ ...stylesAll.setColor.text }}>
            Primary
          </MenuItem>
          <MenuItem value="Secondary" sx={{ ...stylesAll.setColor.text }}>
            Secondary
          </MenuItem>
        </Select>
      </FormControl>
      <TextField
        value={colorInput}
        onChange={handleInputChange}
        onKeyDown={(event: KeyboardEvent<HTMLInputElement>) =>
          event.key === "Enter" && applyColor()
        }
        InputProps={{
          sx: {
            ...stylesAll.setColor.text,
          },
          startAdornment: (
            <InputAdornment position="start">
              <Typography variant="h5" color="text.primary">
                #
              </Typography>
            </InputAdornment>
          ),
        }}
        variant="standard"
        fullWidth
      />
      <Grid
        container
        sx={{
          ...stylesAll.utilities.gridContainer,
          ...stylesAll.setColor.colorPalette.gridContainer,
        }}
        spacing={0}>
        {[
          "#f79c00",
          "#f44336",
          "#1e88e5",
          "#e53935",
          "#43a047",
          "#00b0ff",
          "#A14A76",
          "#94FBAB",
        ].map((color) => (
          <Grid
            key={color}
            item
            xs={3}
            sx={{
              ...stylesAll.setColor.colorPalette.container,
              background: `${color}`,
              border: color === `#${colorInput}` ? `2.5px solid #fff` : "none",
            }}
            onClick={() => setColorInput(escapeNonHex(color))}>
            <Tooltip
              title={
                <Typography variant="body2" sx={{ userSelect: "none" }}>
                  {color}
                </Typography>
              }
              placement="bottom"
              disableInteractive>
              <IconButton
                sx={{
                  width: "100%",
                  height: "100%",
                  "&:hover": { background: "transparent" },
                }}>
                {color === `#${colorInput}` && (
                  <Icon
                    icon="ic:round-done"
                    style={{ ...stylesAll.setColor.colorPalette.icon }}
                  />
                )}
              </IconButton>
            </Tooltip>
          </Grid>
        ))}
      </Grid>

      <Grid
        container
        sx={{
          ...stylesAll.utilities.gridContainer,
          ...stylesAll.setColor.preview.gridContainer,
        }}
        spacing={0}>
        {[-40, 0, 40].map((shade) => (
          <Grid
            key={`${shade}-${shade}`}
            item
            xs={4}
            sx={{
              ...stylesAll.setColor.preview.container,
              background: `${
                isColorValid &&
                `${adjustColorShade(convertToHexSix(colorInput), shade)}`
              }`,
              ...stylesAll.utilities.gridDefault,
            }}>
            <Typography
              variant="h6"
              sx={{
                color: `${
                  isColorValid &&
                  adjustTextColor(
                    adjustColorShade(convertToHexSix(colorInput), shade)
                  )
                }`,
              }}>
              {(isColorValid &&
                `${adjustColorShade(convertToHexSix(colorInput), shade)}`) ||
                "No Color"}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <MainButton
        onClick={applyColor}
        sxButton={{
          ...stylesAll.utilities.buttons.container,
          ...stylesAll.setColor.button.container,
        }}
        sxLink={{
          textDecoration: "none",
        }}
        sxText={{
          ...stylesAll.utilities.buttons.text,
          ...stylesAll.setColor.button.text,
        }}
        component="span"
        btn_name={`Set as ${colorCat} Color`}
      />
      <MainButton
        variant="outlined"
        onClick={useCallback(() => {
          dispatch(
            resetColor({
              Primary: colorsAll.Primary,
              Secondary: colorsAll.Secondary,
            })
          );
        }, [])}
        sxButton={{
          ...stylesAll.utilities.buttons.container,
          ...stylesAll.setColor.button.container,
          borderWidth: "3.5px",
        }}
        sxLink={{
          textDecoration: "none",
        }}
        sxText={{
          ...stylesAll.utilities.buttons.text,
          ...stylesAll.setColor.button.text,
        }}
        component="span"
        btn_name="Reset Colors"
        textColor="text.primary"
      />
    </Box>
  );
};

export default SetColor;
