const {ethers} = require("hardhat");

//console.log("ethers:", ethers.utils.parseEther("0.01"));

const networkConfig = {
    5: {
        name: "goerli",
        vrfCoordinator: "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D",
        entranceFee: ethers.utils.parseEther("0.01"),
        gasLane: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
        subscriptionId: "6926",
        callbackGasLimit: "50000", //500,00
        interval: "30"
    },
    31337: {
        name:"hardhat",
        subscriptionId: "588",
        entranceFee: ethers.utils.parseEther("0.01"),
        gasLane: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
        callbackGasLimit: "50000", //500,00
        interval: "30"
    }
}

const developmentChains = ["hardhat", "localhost"];

module.exports = {
    networkConfig,
    developmentChains
}