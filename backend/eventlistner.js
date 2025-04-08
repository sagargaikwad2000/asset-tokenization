const ethers = require("ethers");
const fs = require("fs");


const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

const contractABI = JSON.parse(
    fs.readFileSync(
        "/Users/sagargaikwad/Documents/Me/Projects/Asset Tokenization/hardhat/artifacts/contracts/event.sol/Event.json",
        "utf8"
    )
);


const contract = new ethers.Contract(contractAddress, contractABI.abi, provider);

contract.on("RecordEvent", (data) => {
    console.log("Event fired:");
    console.log({ data });
});
