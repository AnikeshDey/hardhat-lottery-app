/* Automatic Web3 Connect with web3uikit */
import { ConnectButton } from "web3uikit";

const Header = () => {
    return (<div>
        Decentralized Lottery
        <ConnectButton moralisAuth={false} />
    </div>)
}

export default Header;




/* Mannual Web3 Connect with useMoralis hook */

// import { useEffect } from "react";
// import { useMoralis } from "react-moralis";
// const Header = () => {
//     const { Moralis, enableWeb3, deactivateWeb3, isWeb3EnableLoading, account, isWeb3Enabled } = useMoralis();
    
//     useEffect(() => {
//         console.log("isWeb3Enabled:", isWeb3Enabled);
//         if(isWeb3Enabled) return;
//         if(window.localStorage.getItem("connected")){
//             enableWeb3();
//         }
//     }, [isWeb3Enabled]);

//     useEffect(() => {
//         Moralis.onAccountChanged((account) => {
//             console.log("Account changed to:", account);
//             if(account == null){
//                 window.localStorage.removeItem("connected");
//                 deactivateWeb3();
//                 console.log("deactivated web3");
//             }
//         });
//     }, [])
    
//     return(<div>
//         {
//             account ? 
//             (<div>Connected to {account.slice(0,6)}...{account.slice(account.length - 1)}</div>) 
//             :
//             (<button onClick={async () => {
//                 await enableWeb3();
//                 if(typeof window != undefined){
//                     window.localStorage.setItem("connected", "inject");
//                 }
//             }}
//             disabled={isWeb3EnableLoading}>Connect Wallet</button>) 
//         }
        
//     </div>)
// }

// export default Header;