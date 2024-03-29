import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import SavingsIcon from "@mui/icons-material/Savings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import Header from "../../components/Header";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import CryptoBalanceCalculator from "./CryptoBalanceCalculator";
import { BACKEND_API_URL } from "../../config.js";
import { pink } from "@mui/material/colors";
import { AssetsTimeGraph } from "./AssetsTimeGraph.jsx";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [cashStats, setCashStats] = useState({}); // This needs to ping the UP API on load
    const [totalCash, setTotalCash] = useState(0);
    const [totalStocks, setTotalStocks] = useState(0);
    const [totalBusinessCash, setTotalBusinessCash] = useState(0);
    const [totalCrypto, setTotalCrypto] = useState(0);
    const [financialTotal, setFinancialTotal] = useState(0);
    const [financialTimeData, setFinancialTimeData] = useState({});

    useEffect(() => {
        setFinancialTotal(parseFloat((totalCash + totalCrypto).toFixed(2)));
    }, [totalCash, totalCrypto]);

    useEffect(() => {
        // Function to fetch data
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    BACKEND_API_URL + "fetch-cash-accounts"
                );
                setCashStats(response.data);
                // Calculate cash total
                let cashTotal = 0;
                response.data.data.forEach((account) => {
                    cashTotal += parseFloat(account.attributes.balance.value);
                });
                setTotalCash(parseFloat(cashTotal.toFixed(2)));
            } catch (error) {
                console.error("Error fetching cash data:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs once on mount

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Header
                    title="DASHBOARD"
                    subtitle="Welcome to your dashboard"
                />

                <Box>
                    <Button
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                        Download Reports
                    </Button>
                </Box>
            </Box>

            {/* GRID & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                {/* ROW 1 */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={"$ " + totalCash}
                        subtitle="Cash"
                        progress={totalCash / financialTotal}
                        increase={
                            ((totalCash / financialTotal) * 100).toFixed(2) +
                            "%"
                        }
                        icon={
                            <SavingsIcon
                                sx={{
                                    color: colors.greenAccent[600],
                                    fontSize: "26px",
                                }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <CryptoBalanceCalculator setTotalCrypto={setTotalCrypto} />
                    <StatBox
                        title={"$ " + totalCrypto}
                        subtitle="Crypto"
                        progress={totalCrypto / financialTotal}
                        increase={
                            ((totalCrypto / financialTotal) * 100).toFixed(2) +
                            "%"
                        }
                        icon={
                            <CurrencyBitcoinIcon
                                sx={{
                                    color: colors.greenAccent[600],
                                    fontSize: "26px",
                                }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={"$" + totalStocks}
                        subtitle="Stocks"
                        progress={totalStocks / financialTotal}
                        increase={
                            ((totalStocks / financialTotal) * 100).toFixed(2) +
                            "%"
                        }
                        icon={
                            <ShowChartIcon
                                sx={{
                                    color: colors.greenAccent[600],
                                    fontSize: "26px",
                                }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={"$" + totalBusinessCash}
                        subtitle="Business"
                        progress={totalBusinessCash / financialTotal}
                        increase={
                            (
                                (totalBusinessCash / financialTotal) *
                                100
                            ).toFixed(2) + "%"
                        }
                        icon={
                            <ShoppingCartIcon
                                sx={{
                                    color: colors.greenAccent[600],
                                    fontSize: "26px",
                                }}
                            />
                        }
                    />
                </Box>

                {/* ROW 2 */}
                <Box
                    gridColumn="span 12"
                    gridRow="span 3"
                    backgroundColor={colors.primary[400]}
                >
                    <AssetsTimeGraph
                        financialTotal={financialTotal}
                        financialTimeData={financialTimeData}
                    />
                </Box>

                {/* ROW 3 */}
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="30px"
                >
                    <Typography variant="h5" fontWeight="600">
                        Savings Goal
                    </Typography>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mt="25px"
                    >
                        <ProgressCircle size="125" />
                        <Typography
                            variant="h5"
                            color={colors.greenAccent[500]}
                            sx={{ mt: "15px" }}
                        >
                            $48,352 revenue generated
                        </Typography>
                        <Typography>
                            Includes extra misc expenditures and costs
                        </Typography>
                    </Box>
                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                >
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        sx={{ padding: "30px 30px 0 30px" }}
                    >
                        Sales Quantity
                    </Typography>
                    <Box height="250px" mt="-20px">
                        <BarChart isDashboard={true} />
                    </Box>
                </Box>
                <Box
                    gridColumn="span 4"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    padding="30px"
                >
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        sx={{ marginBottom: "15px" }}
                    >
                        Geography Based Traffic
                    </Typography>
                    <Box height="200px">
                        <GeographyChart isDashboard={true} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
