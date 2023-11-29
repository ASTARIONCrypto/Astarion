import {General} from './config.js';
import fs from 'fs';
import { Account, ec, json, stark, Provider, hash, constants, CallData, Contract } from "starknet";


const privateKeyAX = fs.readFileSync('data/wallet.txt', 'utf8');
const AXcontractAddress = fs.readFileSync('data/address.txt', 'utf8');

try{

    const provider = new Provider({ rpc: { nodeUrl: General.nodeUrl } });

    const account = new Account(provider, AXcontractAddress, privateKeyAX, "1");


    const { transaction_hash: mintTxHash }  = await account.execute(
        [
        // Calling the first contract
        {
        contractAddress: General.contractAddress,
        entrypoint: "send_message",
        // approve 1 wei for bridge
        calldata: CallData.compile({
            message: "Hi",
          })
        }
      ]
    )
    

    console.log("TR Hash: " + "https://starkscan.co/tx/" + mintTxHash) 
    

    } catch(e) {
    
    console.log(e)}
