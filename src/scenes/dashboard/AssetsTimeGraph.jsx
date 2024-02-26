import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import axios from "axios";
import LineChart from "../../components/LineChart";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { BACKEND_API_URL } from "../../config";
import { FINANCIAL_HISTORICAL_DATA_TABLENAME } from "../../config";
import { FinancialHealthDataAggregator } from "./FinancialHealthDataAggregator";
import { mochFincancialRawData } from "../../data/mochFinancialTimeData";

export const AssetsTimeGraph = ({ financialTotal }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [seriesSelection, setSeriesSelection] = useState({
        "total assets": true,
        cash: false,
        crypto: false,
        stocks: false,
        business: false,
    });
    const [timelineSelection, setTimelineSelection] = useState("1M");
    const [financialLineData, setfinancialLineData] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [rawData, setRawData] = useState([]);
    let graphSeries = ["total assets", "cash", "crypto", "stocks", "business"];

    useEffect(() => {
        fetchHistoricalData();
    }, []); // Empty dependency array ensures this runs once on mount

    useEffect(() => {
        if (rawData.length !== 0) setfinancialLineData(calculateTimelineData());
    }, [timelineSelection, rawData]);

    /**
     * When the series selection changes or the lineData changes because the
     * timeline selection has changed then send the
     */
    useEffect(() => {
        const filteredData = financialLineData.filter(
            (series) => seriesSelection[series.id]
        );
        setGraphData(filteredData);
    }, [seriesSelection, financialLineData]);

    async function fetchHistoricalData() {
        try {
            const response = await axios.get(
                BACKEND_API_URL + "fetchAllItems",
                {
                    params: {
                        tableName: FINANCIAL_HISTORICAL_DATA_TABLENAME,
                    },
                }
            );
            setRawData(response.data.items);
        } catch (error) {
            console.error("Error fetching cash data:", error);
        }
    }

    const handleDropdownChange = (event) => {
        setTimelineSelection(event.target.value);
    };

    const handleCheckboxChange = (id) => {
        setSeriesSelection((prevSeriesSelection) => ({
            ...prevSeriesSelection,
            [id]: !prevSeriesSelection[id],
        }));
    };

    /**
     * entries =
     * [
     *  {date: "22/01/2024", cash = 2300, crypto}
     * ]
     */

    const formatLineGraphData = (rawEntries, timelineSelection) => {
        let lineGraphData = [];
        let cashData = [];
        let cryptoData = [];
        let stocksData = [];
        let businessData = [];
        let totalAssetsData = [];

        if (["1M", "3M", "6M"].includes(timelineSelection)) {
            rawEntries.forEach((entry) => {
                cashData.push({
                    x: entry["date"],
                    y: entry["cash"],
                });
                cryptoData.push({
                    x: entry["date"],
                    y: entry["crypto"],
                });
                stocksData.push({
                    x: entry["date"],
                    y: entry["stocks"],
                });
                businessData.push({
                    x: entry["date"],
                    y: entry["business"],
                });
                totalAssetsData.push({
                    x: entry["date"],
                    y: entry["total assets"],
                });
            });

            lineGraphData = [
                {
                    id: "cash",
                    color: tokens("dark").greenAccent[500],
                    data: cashData,
                },
                {
                    id: "crypto",
                    color: tokens("dark").blueAccent[300],
                    data: cryptoData,
                },
                {
                    id: "total assets",
                    color: tokens("dark").redAccent[200],
                    data: totalAssetsData,
                },
                {
                    id: "stocks",
                    color: "#e6ed87", // yello
                    data: stocksData,
                },
                {
                    id: "business", // purple
                    color: "#d67ec9",
                    data: businessData,
                },
            ];
        }

        // Need to implement 1Y and 5Y but this is at least a year from being in scope
        return lineGraphData;
    };

    const calculateTimelineData = () => {
        // let rawData = await fetchHistoricalData();
        let rawEntries = [];

        if (rawData.length === 0) {
            console.log(
                "Financial history length is 0. Suspected error in fetch."
            );
            return;
        }

        if (timelineSelection === "1M") {
            rawEntries = rawData.slice(-4);
        } else if (timelineSelection === "3M") {
            rawEntries = rawData.slice(-12);
        } else if (timelineSelection === "6M") {
            rawEntries = rawData.slice(-24);
        } else if (timelineSelection === "1Y") {
            rawEntries = rawData.slice(-48);
        } else if (timelineSelection === "5Y") {
            rawEntries = rawData.slice(-48 * 5);
        }

        return formatLineGraphData(rawEntries, timelineSelection);
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
                gap="10px"
            >
                <Box gridColumn="span 11" gridRow="span 3">
                    <LineChart isDashboard={true} data={graphData} />
                </Box>
                <Box mt="20px" gridColumn="span 1" gridRow="span 2">
                    <FormGroup>
                        {graphSeries.map((label) => (
                            <FormControlLabel
                                key={label}
                                control={
                                    <Checkbox
                                        inputProps={{
                                            "aria-label": "controlled",
                                        }}
                                        key={label}
                                        checked={seriesSelection[label]}
                                        onChange={() =>
                                            handleCheckboxChange(label)
                                        }
                                        sx={{
                                            color: colors.grey[100],
                                            "&.Mui-checked": {
                                                color: colors.greenAccent[500],
                                            },
                                        }}
                                    />
                                }
                                label={label}
                            />
                        ))}
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
