import { useWeb3Contract } from "react-moralis";
import { abi, contractAddress } from "@/constants";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";

const LotteryEntrance = () => {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();

    const chainId = parseInt(chainIdHex);

    const raffleAddress = chainId in contractAddress ? contractAddress[chainId][0] : null;
    const [ entranceFee, setEntranceFee ] = useState("0");
    const [ numPlayers, setNumPlayers ] = useState("0");
    const [ recentWinner, setRecentWinner ] = useState("0");
    
    const notificationDispatch = useNotification();
    
    const {
        runContractFunction: enterRaffle, isLoading, isFetching
    } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        msgValue: ethers.utils.parseEther(entranceFee),
        params: {},
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {}
    });

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {}
    });

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {}
    });

    async function updateUI(){
        const entranceFeeFromCall = (await getEntranceFee()).toString();
        const numPlayersFromCall = (await getNumberOfPlayers()).toString();
        const recentWinnerFromCall = (await getRecentWinner()).toString();

        setEntranceFee(ethers.utils.formatUnits(entranceFeeFromCall, "ether"));
        setNumPlayers(numPlayersFromCall);
        setRecentWinner(recentWinner)
    }

    useEffect(() => {
        if(isWeb3Enabled){
            //try to read the raffle entrance fee

            updateUI();
        }
    }, [isWeb3Enabled]);

    const handleSuccess = async function (tx){
        await tx.wait(1);
        handleNewNotification(tx);
        updateUI();
    }

    const handleNewNotification = (tx) => {
        notificationDispatch({
            type:"info",
            message: "Transaction Complete!",
            title: "Tx Notification",
            position: "topR",
            icon: "bell"
        })
    }

    return (
        <div>
            { raffleAddress ?
                <div>
                    <button 
                    onClick={async () =>
                        await enterRaffle({
                            // onComplete:
                            // onError:
                            onSuccess: handleSuccess,
                            onError: (error) => console.log(`Enter Raffle Error: ${error}`),
                        })
                    }
                    disabled={isFetching || isLoading}>Enter Raffle</button>
                    Entrance Fee: {entranceFee} ETH
                    Number of Players: {numPlayers} Players
                    Recent Winner: {recentWinner}
                </div>
                :
                <div>
                    No Raffle Address Detected!
                </div>
            }
        </div>
    )
};

export default LotteryEntrance;