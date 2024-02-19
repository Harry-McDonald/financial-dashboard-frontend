import axios from "axios";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { BACKEND_API_URL } from "../../config.js";
import { TOKEN_BALANCE_TABLENAME } from "../../config.js";

const CryptoBalanceCalculator = ({ setTotalCrypto }) => {
    const [balances, setBalances] = useState({});
    const [loading, setLoading] = useState(true);
    const [tokenPrices, setTokenPrices] = useState({});
    const [tokenDollarValues, setTokenDollarValues] = useState({});

    useEffect(() => {
        if (Object.keys(balances).length === 0) return;
        try {
            axios
                .post(BACKEND_API_URL + "updateDBItem", {
                    tableName: TOKEN_BALANCE_TABLENAME,
                    key: { itemId: "1" },
                    updateObject: convertBalancesToString(balances),
                })
                .then((res) => {
                    console.log(res);
                });
        } catch (error) {
            console.error(error);
        }
    }, [balances]);

    function convertBalancesToString(balances) {
        let newBalances = {};

        Object.keys(balances).forEach((key) => {
            newBalances[key] = balances[key].toString();
        });

        return newBalances;
    }

    function convertBigIntToDecimal(bigIntValue, decimals) {
        // Convert bigIntValue to a string
        const bigIntStr = bigIntValue.toString();

        // Adjust the string representation to ensure it has at least `decimals` + 1 characters (adding leading zeros if necessary)
        const paddedBigIntStr = bigIntStr.padStart(decimals + 1, "0");

        // Insert a decimal point at the correct position
        const decimalPointIndex = paddedBigIntStr.length - decimals;
        const resultStr =
            paddedBigIntStr.slice(0, decimalPointIndex) +
            "." +
            paddedBigIntStr.slice(decimalPointIndex);

        // Convert the string to a number
        return parseFloat(resultStr);
    }

    const calculateDollarTotals = () => {
        /* Need to talk to the backend of the website to get the token prices from coingecko*/
        //Convert balances into decimal values, multiply by price, calculate tota;, setTotalCrypto

        let dollarValues = {};
        let totalDollarValue = 0;
        //Convert balances to decimals
        Object.keys(balances).forEach((key) => {
            let decimalBalance = convertBigIntToDecimal(balances[key], 18);

            let tokenPrice = tokenPrices[key]["aud"];
            let dollarValue = decimalBalance * tokenPrice;
            totalDollarValue += dollarValue;
            dollarValues[key] = Number(dollarValue.toFixed(2));
        });

        setTokenDollarValues(dollarValues);
        setTotalCrypto(Number(totalDollarValue.toFixed(2)));
    };

    const getMetaMaskBalances = () => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            const tokenAddresses = {
                // Ensure token key is the coingecko id for that token
                maple: "0x33349B282065b0284d756F0577FB39c158F935e6",
                tokemak: "0x2e9d63788249371f1dfc918a52f8d799f4a38c94",
                mycelium: "0x4b13006980aCB09645131b91D259eaA111eaF5Ba",
            };

            const minABI = [
                // balanceOf ABI
                {
                    constant: true,
                    inputs: [{ name: "_owner", type: "address" }],
                    name: "balanceOf",
                    outputs: [{ name: "balance", type: "uint256" }],
                    type: "function",
                },
            ];

            const fetchBalances = async () => {
                try {
                    const accounts = await window.ethereum.request({
                        method: "eth_requestAccounts",
                    });
                    if (accounts.length === 0)
                        throw new Error("No accounts found.");

                    let newBalances = {};

                    let rawEthBalance = await web3.eth.getBalance(accounts[0]);

                    for (const [symbol, address] of Object.entries(
                        tokenAddresses
                    )) {
                        const contract = new web3.eth.Contract(minABI, address);
                        const balance = await contract.methods
                            .balanceOf(accounts[0])
                            .call();
                        newBalances[symbol] = balance;
                    }
                    newBalances["ethereum"] = rawEthBalance; // Get ethereum total
                    setBalances(newBalances);
                } catch (error) {
                    console.error(error);
                }
            };

            fetchBalances();
        } else {
            console.log("MetaMask not detected");
            setLoading(false);
        }
    };

    // on load
    useEffect(() => {
        getMetaMaskBalances();
    }, []);

    // fetch token prices when balances state changes
    useEffect(() => {
        const fetchTokenPrices = () => {
            let tokenIDs = "";
            Object.keys(balances).forEach((key) => {
                tokenIDs += key + ",";
            });
            try {
                axios
                    .get(BACKEND_API_URL + "get-token-prices", {
                        params: {
                            ids: tokenIDs,
                            vs_currencies: "aud",
                        },
                    })
                    .then((res) => {
                        setTokenPrices(res.data);
                    });
            } catch (error) {
                console.error(error);
            }
        };

        fetchTokenPrices(balances);
    }, [balances]);

    // When we have the token balances and prices - calcualte the dollar values
    useEffect(() => {
        calculateDollarTotals();
    }, [tokenPrices]);

    return <></>;
};

export default CryptoBalanceCalculator;
