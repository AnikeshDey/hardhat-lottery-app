const { ethers, network } = require("hardhat");
const fs = require("fs");


const FRONT_END_ADDRESS_FILE = "./frontend/constants/contractAddress.json";
const FRONT_END_ABI_FILE = "./frontend/constants/abi.json";


module.exports = async function (){
    if(process.env.UPDATE_FRONTEND){
        updateContractAddress();
        updateAbi();
    }
}

async function updateAbi(){
    const raffle = await ethers.getContract("Raffle");
    fs.writeFileSync(FRONT_END_ABI_FILE, raffle.interface.format(ethers.utils.FormatTypes.json));
}

async function updateContractAddress(){
    const raffle = await ethers.getContract("Raffle");
    const currentAddress = JSON.parse(fs.readFileSync(FRONT_END_ADDRESS_FILE, "utf-8"));
    const chainId = network.config.chainId.toString();
    if(chainId in currentAddress){
        if(!currentAddress[chainId].includes(raffle.address)){
            currentAddress[chainId].push(raffle.address);
        }
    } else {
        currentAddress[chainId] = [raffle.address];
    }
    fs.writeFileSync(FRONT_END_ADDRESS_FILE, JSON.stringify(currentAddress));
} 

module.exports.tags = ["all", "frontend"];