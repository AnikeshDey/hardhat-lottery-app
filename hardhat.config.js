require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks:{
    hardhat:{
      chainId: 31337,
      blockConfirmations: 1
    }
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
    outputFile: "gas-reporter.txt",
    noColors: true
  },
  solidity: "0.8.17",
  namedAccounts: {
    deployer: {
      default: 0,
    }, 
    player: {
      default: 1
    }
  },
  mocha: {
    timeout: 500000, // 500 seconds max for running tests
  }
};
