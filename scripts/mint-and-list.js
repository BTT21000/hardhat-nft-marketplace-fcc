const { ethers, network } = require("hardhat")
const { moveBlocks } = require("../utils/move-blocks")

const PRICE = ethers.utils.parseEther("0.1")

async function mintAndList() {
    const nftMarketplace = await ethers.getContract("NftMarketplace")
    // console.log(nftMarketplace.address)
    const basicNft = await ethers.getContract("BasicNft")
    // console.log(basicNft.address)
    if (network.name == "localhost" || network.config.chainId == "31337") {
        console.log("Minting...")
        const mintTx = await basicNft.mintNft()
        console.log("Wait 1 block on hardhat localhost network...")
        const mintTxReceipt = await mintTx.wait(1)
        const tokenId = mintTxReceipt.events[0].args.tokenId
        console.log("Approving Nft...")

        const approvalTx = await basicNft.approve(nftMarketplace.address, tokenId)
        console.log("Wait 1 block on hardhat localhost network...")
        await approvalTx.wait(1)
        console.log("Listing Nft...")
        const tx = await nftMarketplace.listItem(basicNft.address, tokenId, PRICE)
        console.log("Wait 1 block on hardhat localhost network...")
        await tx.wait(1)
        console.log("Listed!")
    } else {
        console.log("Minting...")
        const mintTx = await basicNft.mintNft()
        console.log("Wait 1 blocks on testnet...")
        const mintTxReceipt = await mintTx.wait(1)
        const tokenId = mintTxReceipt.events[0].args.tokenId
        console.log("Approving Nft...")

        const approvalTx = await basicNft.approve(nftMarketplace.address, tokenId)
        console.log("Wait 1 blocks on testnet...")
        await approvalTx.wait(1)
        console.log("Listing Nft...")
        const tx = await nftMarketplace.listItem(basicNft.address, tokenId, PRICE)
        console.log("Wait 1 blocks on testnet...")
        await tx.wait(1)
        console.log("Listed!")
    }
    // console.log("Minting...")
    // const mintTx = await basicNft.mintNft()
    // const mintTxReceipt = await mintTx.wait(1)
    // const tokenId = mintTxReceipt.events[0].args.tokenId
    // console.log("Approving Nft...")

    // const approvalTx = await basicNft.approve(nftMarketplace.address, tokenId)
    // await approvalTx.wait(1)
    // console.log("Listing Nft...")
    // const tx = await nftMarketplace.listItem(basicNft.address, tokenId, PRICE)
    // await tx.wait(1)
    // console.log("Listed!")

    if (network.name == "localhost" || network.config.chainId == "31337") {
        await moveBlocks(2, (sleepAmount = 1000))
    }
}

mintAndList()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
