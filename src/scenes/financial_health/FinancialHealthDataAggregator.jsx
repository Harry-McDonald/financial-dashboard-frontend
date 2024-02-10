import { mochFincancialRawData } from "../../data/mochFinancialTimeData";

// Process raw data and format into 1M/3M/6M/1Y/5Y bins for line graph
// The line graph series data object should have the following structure
// An array of objects for cash, crypto, stocks and bussiness
/**
 * [
 *  {
 *      id: "cash"
 *      color: color
 *      data: [
 *          {
 *              x: x1SeriesLabel,
 *              y: y1Value
 *          },
 *          {
 *              x: x2SeriesLabel,
 *              y: y2Value
 *          },
 *      ]
 *  },
 *  {},
 *  {},
 *  {}
 * ]
 *
 * This means that when the user selects a different timeline the data object needs
 * to be calculated and updated
 */

/**
 * @param seriesSelection - Array of the graph series that have been requested
 * @param timelineSelection - The timeline over which data has been requested
 * @param financialHealthLineData - Current line graph data.
 * @param setFinancialHealthLineData - The function used to change the state of the
 * the financial time graph data. - Must pass the exact data that the graph will use
 * to produce the graph.
 */
export const FinancialHealthDataAggregator = (
    seriesSelection,
    timeLineSelection,
    financialHealthLineData,
    setFinancialHealthLineData
) => {
    // On load fetch data check if its different from the previous fetch. if it is then adjust the line graph data
    // Fetch financialRaw Data

    useEffect(() => {}, [seriesSelection]);

    useEffect(() => {}, [timeLineSelection]);

    let rawData = mochFincancialRawData;
    let prevMonthEntries = [];
    // TODO: Check if new data matches old data?
    if (rawData.length === 0) {
        window.alert(
            "Financial history length is 0. Suspected error in fetch."
        );
        return;
    }
    // Format data into previous 4 week bins - check adequate number of entries
    if (rawData.length > 0) prevMonthEntries = rawData.slice(-4);

    let prev3MonthEntries = rawData.slice(-12);
};
