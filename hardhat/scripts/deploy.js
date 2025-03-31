const hre = require("hardhat");

async function main() {
    const MyContract = await hre.ethers.getContractFactory("Asset");
    const myContract = await MyContract.deploy("Gold", "GLD");

    const address = await myContract.getAddress();

    console.log("MyContract deployed to:", address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
