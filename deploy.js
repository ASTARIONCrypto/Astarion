import {General} from './config.js';
import {abi} from './data/abi.js';
import fs from 'fs';
import { Account, ec, json, stark, Provider, hash, constants, CallData, Contract } from "starknet";


const privateKeyAX = fs.readFileSync('data/wallet.txt', 'utf8');
const AXcontractAddress = fs.readFileSync('data/address.txt', 'utf8');

try{

    const provider = new Provider({ rpc: { nodeUrl: General.nodeUrl } });

    const account = new Account(provider, AXcontractAddress, privateKeyAX, "1");

    if(General.contract == "NFT")
    {
    const calldata = CallData.compile({ name: General.name, symbol: General.symbol, ownerof: AXcontractAddress });
 
    const { transaction_hash: mintTxHash }  =  await account.deployContract({ classHash: General.ClassHash, constructorCalldata: calldata });
    

    console.log("TR Hash: " + "https://starkscan.co/tx/" + mintTxHash) 
        
    }
    
    else if(General.contract == "Messenger")
    {
    const calldata = CallData.compile({ });
 
    const { transaction_hash: mintTxHash }  =  await account.deployContract({ classHash: General.ClassHash, constructorCalldata: calldata });
    

    console.log("TR Hash: " + "https://starkscan.co/tx/" + mintTxHash) 
        
    }
 
 

    

    } catch(e) {
    
    console.log(e)}
