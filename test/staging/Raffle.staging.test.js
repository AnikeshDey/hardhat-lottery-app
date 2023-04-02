const { assert, expect } = require("chai");
const { developmentChains, networkConfig } = require("../../helper-hardhat-config");
const { network, getNamedAccounts, deployments, ethers } = require("hardhat");

developmentChains.includes(network.name)
    ? describe.skip
    : describe("Raffle Unit Tests", function () {
        let raffle, entryFee, deployer;

        beforeEach(async function(){
            deployer = (await getNamedAccounts()).deployer;
            raffle = await ethers.getContract("Raffle", deployer);
            entryFee = await raffle.getEntranceFee();
        });

        describe("fulfillRandomWords", function (){
            it("works with live Chainlink Keepers and Chainlink VRF, we get a random winner", async function(){
                //enter the raffle
                const startingTimeStamp = await raffle.getLatestTimeStamp();
                const accounts = await ethers.getSigners();

                await new Promise(async (resolve, reject) => {
                    raffle.once("PickedWinner", async function(){
                        console.log("Winner Picked!");
                    
                        try{
                            const recentWinner = await raffle.getRecentWinner();
                            const raffleState = await raffle.getRaffleState();
                            const winnerEndingBalance = await accounts[0].getBalance();
                            const endingTimeStamp = await raffle.getLatestTimeStamp();

                            await expect(raffle.getPlayers(0)).to.be.reverted;
                            assert.equal(recentWinner.toString(), accounts[0].address);
                            assert.equal(raffleState.toString(), "0");
                            assert.equal(winnerEndingBalance.toString(), winnerStartingBalance.add(entryFee).toString());
                            assert.equal(endingTimeStamp > startingTimeStamp);
                            resolve();
                        } catch(err){
                            console.log(err);
                            reject(err);
                        }
                    });

                    //Entering Raffle
                    await raffle.enterRaffle({ value: entryFee });
                    const winnerStartingBalance = await accounts[0].getBalance();

                    // 
                });
            });
        });
    });