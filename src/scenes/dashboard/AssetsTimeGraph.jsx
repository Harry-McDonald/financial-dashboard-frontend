import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import LineChart from "../../components/LineChart";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export const AssetsTimeGraph = ({ financialTotal }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [seriesSelection, setSeriesSelection] = useState([]);
    const [timelineSelection, setTimelineSelection] = useState("1M");
    const [financialLineData, setfinancialLineData] = useState({});

    const handleDropdownChange = (event) => {
        setTimelineSelection(event.target.value);
    };
    return (
        <>
            <Box
                mt="25px"
                p="0 30px"
                display="flex "
                justifyContent="space-between"
                alignItems="center"
            >
                <Box>
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        color={colors.grey[100]}
                    >
                        Total Assets
                    </Typography>
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                        color={colors.greenAccent[500]}
                    >
                        {"$" + financialTotal}
                    </Typography>
                </Box>
            </Box>
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="117px"
                gap="0px"
            >
                <Box gridColumn="span 11" gridRow="span 3">
                    <LineChart isDashboard={true} />
                </Box>
                <Box mt="20px" gridColumn="span 1" gridRow="span 2">
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    defaultChecked
                                    sx={{
                                        color: colors.grey[100],
                                        "&.Mui-checked": {
                                            color: colors.greenAccent[500],
                                        },
                                    }}
                                />
                            }
                            label="Total Assets"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    defaultChecked
                                    sx={{
                                        color: colors.grey[100],
                                        "&.Mui-checked": {
                                            color: colors.greenAccent[500],
                                        },
                                    }}
                                />
                            }
                            label="Cash"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    defaultChecked
                                    sx={{
                                        color: colors.grey[100],
                                        "&.Mui-checked": {
                                            color: colors.greenAccent[500],
                                        },
                                    }}
                                />
                            }
                            label="Crypto"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    defaultChecked
                                    sx={{
                                        color: colors.grey[100],
                                        "&.Mui-checked": {
                                            color: colors.greenAccent[500],
                                        },
                                    }}
                                />
                            }
                            label="Stocks"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    defaultChecked
                                    sx={{
                                        color: colors.grey[100],
                                        "&.Mui-checked": {
                                            color: colors.greenAccent[500],
                                        },
                                    }}
                                />
                            }
                            label="Business"
                        />
                    </FormGroup>
                </Box>
                <Box mr="10px">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Timeline
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={timelineSelection}
                            label="Timeline"
                            onChange={handleDropdownChange}
                        >
                            <MenuItem value="1M">1M</MenuItem>
                            <MenuItem value="3M">3M</MenuItem>
                            <MenuItem value="6M">6M</MenuItem>
                            <MenuItem value="1Y">1Y</MenuItem>
                            <MenuItem value="5Y">5Y</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </>
    );
};
