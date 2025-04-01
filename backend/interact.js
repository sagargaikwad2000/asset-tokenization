const { ethers } = require("ethers");
const fs = require("fs");

class Interact {
    constructor() {
        this.provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
        this.contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        this.contractWithProvider = null;
        this.contractWithSigner = null;

    }

    async init() {
        const contractABI = JSON.parse(
            fs.readFileSync(
                "hardhat/artifact/contracts/asset.sol/Asset.json",
                "utf8"
            )
        );

        this.accounts = await this.provider.listAccounts();
        this.signer = this.provider.getSigner();
        this.contractWithSigner = new ethers.Contract(this.contractAddress, contractABI.abi, this.signer);
        this.contractWithProvider = new ethers.Contract(this.contractAddress, contractABI.abi, this.provider);

    }

    async invoke(functionName, args = []) {
        if (!this.contract) {
            await this.init();
        }
        if (!this.contractWithSigner[functionName]) {
            throw new Error(`Function ${functionName} does not exist on contract`);
        }

        try {
            console.log(`Calling function: ${functionName} with args:`, args);
            const tx = await this.contractWithSigner[functionName](...args);
            await tx.wait();
            return tx;
        } catch (error) {
            console.error(`Error calling function ${functionName}:`, error);
        }
    }

    async query(functionName, args = []) {
        if (!this.contractWithProvider) {
            await this.init(); // Ensure contract is initialized before calling functions
        }
        if (!this.contractWithProvider[functionName]) {
            throw new Error(`Function ${functionName} does not exist on contract`);
        }

        try {
            console.log(`Calling function: ${functionName} with args:`, args);
            const result = await this.contractWithProvider[functionName](...args);
            return result;
        } catch (error) {
            console.error(`Error calling function ${functionName}:`, error);
        }
    }
}

module.exports = new Interact();
