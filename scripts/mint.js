const { ethers, network } = require("hardhat")
const { moveBlocks } = require("../utils/move-blocks")

async function mint() {
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
        console.log(`Got tokenID: ${tokenId}`)
        console.log(`NFT Address: ${basicNft.address}`)
    } else {
        console.log("Minting...")
        const mintTx = await basicNft.mintNft()
        console.log("Wait 1 blocks on testnet...")
        const mintTxReceipt = await mintTx.wait(1)
        const tokenId = mintTxReceipt.events[0].args.tokenId
        console.log(`Got tokenID: ${tokenId}`)
        console.log(`NFT Address: ${basicNft.address}`)
    }
    // console.log("Minting...")
    // const mintTx = await basicNft.mintNft()
    // const mintTxReceipt = await mintTx.wait(1)
    // const tokenId = mintTxReceipt.events[0].args.tokenId
    // console.log("Approving Nft...")

    if (network.name == "localhost" || network.config.chainId == "31337") {
        await moveBlocks(2, (sleepAmount = 1000))
    }
}

mint()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
