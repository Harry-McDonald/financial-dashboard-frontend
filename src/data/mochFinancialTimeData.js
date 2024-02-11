import { tokens } from "../theme";

export const mochFincancialRawData = [
    { "timestamp": "20/01/2024", "cash": 900, "crypto": 3500, "stocks": 0, "business": 0, "total_assets": 4400},
    { "timestamp": "27/01/2024", "cash": 900, "crypto": 3500, "stocks": 0, "business": 0, "total_assets": 4400},
    { "timestamp": "03/02/2024", "cash": 1300, "crypto": 2500, "stocks": 0, "business": 0, "total_assets": 3800},
    { "timestamp": "10/02/2024", "cash": 2300, "crypto": 3000, "stocks": 100, "business": 2000, "total_assets": 5300},
];

export const mochFinancial1YLineData = [
    {
        id: "Cash",
        color: tokens("dark").greenAccent[500],
        data: [
        {
            x: "plane",
            y: 101,
        },
        {
            x: "helicopter",
            y: 75,
        },
        {
            x: "boat",
            y: 36,
        },
        {
            x: "train",
            y: 216,
        },
        {
            x: "subway",
            y: 35,
        },
        {
            x: "bus",
            y: 236,
        },
        {
            x: "car",
            y: 88,
        },
        {
            x: "moto",
            y: 232,
        },
        {
            x: "bicycle",
            y: 281,
        },
        {
            x: "horse",
            y: 1,
        },
        {
            x: "skateboard",
            y: 35,
        },
        {
            x: "others",
            y: 14,
        },
        ],
    },
    {
        id: "france",
        color: tokens("dark").blueAccent[300],
        data: [
        {
            x: "plane",
            y: 212,
        },
        {
            x: "helicopter",
            y: 190,
        },
        {
            x: "boat",
            y: 270,
        },
        {
            x: "train",
            y: 9,
        },
        {
            x: "subway",
            y: 75,
        },
        {
            x: "bus",
            y: 175,
        },
        {
            x: "car",
            y: 33,
        },
        {
            x: "moto",
            y: 189,
        },
        {
            x: "bicycle",
            y: 97,
        },
        {
            x: "horse",
            y: 87,
        },
        {
            x: "skateboard",
            y: 299,
        },
        {
            x: "others",
            y: 251,
        },
        ],
    }
]