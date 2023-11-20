import {General} from './config.js';
import {abi} from './data/abi.js';
import fs from 'fs';
import { Account, Provider, CallData, cairo } from "starknet";


const privateKeyAX = fs.readFileSync('data/wallet.txt', 'utf8');
const AXcontractAddress = fs.readFileSync('data/address.txt', 'utf8');

try{

    const provider = new Provider({ rpc: { nodeUrl: General.nodeUrl } });

    const account = new Account(provider, AXcontractAddress, privateKeyAX, "1");


    const { transaction_hash: mintTxHash }  = await account.execute(
        [
        // Calling the first contract
        {
        contractAddress: General.contractAddressETH,
        entrypoint: "approve",
        // approve 1 wei for bridge
        calldata: CallData.compile({
            spender: General.contractAddress,
            amount: cairo.uint256(50000000000000),
          })
        },
        // Calling the second contract
        {
          contractAddress: General.contractAddress,
          entrypoint: "mint",
          // transfer 1 wei to the contract address
         calldata: CallData.compile({
    
          })
        }
      ]
    )
    

    console.log("TR Hash: " + "https://starkscan.co/tx/" + mintTxHash) 
    

    } catch(e) {
    
    console.log(e)}