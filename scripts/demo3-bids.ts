import { ethers } from "hardhat";
import networks from "../nft-auction-subgraph/networks.json";

async function main() {
  const Auction = await ethers.getContractFactory("NFTAuction");
  const auction = Auction.attach(networks.localhost.NFTAuction.address);

  const [, , , , , , s7, s8, s9] = await ethers.getSigners();

  // Initial Price for this auction is 0.5 ether, the step is 0.1 ether, so the first bid should be 0.6 ether
  // Every next bid should be at least 0.1 ether higher than the previous one
  // If the user already has a bid for this auction, next bid should be only the difference between his current bid and the highest bid + bid step;
  const step = 0.1;
  let highestBid = 0.5;
  let s4Total = 0.0;
  let s5Total = 0.0;
  let s6Total = 0.0;

  let s7Bid = highestBid + step - s4Total; // 0.6
  await auction
    .connect(s7)
    .bid(2, { value: ethers.utils.parseEther(`${s7Bid.toFixed(2)}`) });
  s4Total = s4Total + s7Bid; // 0.6
  highestBid = s4Total; // 0.6

  let s8Bid = highestBid + step - s5Total; // 0.7
  await auction
    .connect(s8)
    .bid(2, { value: ethers.utils.parseEther(`${s8Bid.toFixed(2)}`) });
  s5Total = s5Total + s8Bid; // 0.7
  highestBid = s5Total; // 0.7

  let s9Bid = highestBid + step - s6Total; // 0.8
  await auction
    .connect(s9)
    .bid(2, { value: ethers.utils.parseEther(`${s9Bid.toFixed(2)}`) });
  s6Total = s6Total + s9Bid; // 0.8
  highestBid = s6Total; // 0.8

  s8Bid = highestBid + step - s5Total; // 0.2
  await auction
    .connect(s8)
    .bid(2, { value: ethers.utils.parseEther(`${s8Bid.toFixed(2)}`) });
  s5Total = s5Total + s8Bid; // 0.9
  highestBid = s5Total; // 0.9

  s9Bid = highestBid + step - s6Total; // 0.2
  await auction
    .connect(s9)
    .bid(2, { value: ethers.utils.parseEther(`${s9Bid.toFixed(2)}`) });
  s6Total = s6Total + s9Bid; // 1.0
  highestBid = s6Total; // 1.0

  s7Bid = highestBid + step - s4Total; // 0.5
  await auction
    .connect(s7)
    .bid(2, { value: ethers.utils.parseEther(`${s7Bid.toFixed(2)}`) });
  s4Total = s4Total + s7Bid; // 1.1
  highestBid = s4Total; // 1.1
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
