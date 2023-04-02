const {ethers} = require("hardhat");

//console.log("ethers:", ethers.utils.parseEther("0.01"));

const networkConfig = {
    5: {
        name: "goerli",
        vrfCoordinator: "0xXXXXXXXXX",
        entranceFee: ethers.utils.parseEther("0.01"),
        gasLane: "0xXXXXXXXXXXXXXXxx",
        subscriptionId: "6926",
        callbackGasLimit: "50000", //500,00
        interval: "30"
    },
    31337: {
        name:"hardhat",
        subscriptionId: "588",
        entranceFee: ethers.utils.parseEther("0.01"),
        gasLane: "0xXXXXXXXXX",
        callbackGasLimit: "50000", //500,00
        interval: "30"
    }
}

const developmentChains = ["hardhat", "localhost"];

module.exports = {
    networkConfig,
    developmentChains
}