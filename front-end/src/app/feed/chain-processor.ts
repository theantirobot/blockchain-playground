import Web3, { Block, BlockNumberOrTag } from "web3";
// Optional: Fetch the block details if necessary
// const block = await this.web3.eth.getBlock(currentBlockNumber);
// console.log(block);

interface EthereumBlockPollerProps {
  web3: Web3;
  onBlock: (block: Block) => void;
}
export class EthereumBlockPoller {
  private web3: Web3;
  private latestBlockNumber: bigint | null;
  private pollingInterval: NodeJS.Timeout | undefined;
  private onBlock: (block: Block) => void;

  constructor(props: EthereumBlockPollerProps) {
    // Initialize a new Web3 instance with an HTTP provider.
    this.web3 = props.web3;
    this.latestBlockNumber = null;
    this.onBlock = props.onBlock;
  }

  public startPolling(interval: number = 10000): void {
    // Set up a polling interval to check for new blocks.
    this.pollingInterval = setInterval(async () => {
      try {
        const currentBlockNumber = await this.web3.eth.getBlockNumber();
        const blocksToProcess: bigint[] = [];
        if (this.latestBlockNumber === null) {
          console.log(`Initial block number: ${currentBlockNumber}`);
          blocksToProcess.push(currentBlockNumber);
          const block = await this.web3.eth.getBlock(currentBlockNumber);
          this.onBlock(block);
        } else if (currentBlockNumber > this.latestBlockNumber) {
          console.log(`New block number: ${currentBlockNumber}`);
          for (
            let i = BigInt(this.latestBlockNumber) + BigInt(1);
            i <= currentBlockNumber;
            i++
          ) {
            console.log(`Processing block number: ${i}`);
            const block = await this.web3.eth.getBlock(i);
            this.onBlock(block);
          }
        }
        this.latestBlockNumber = currentBlockNumber;
      } catch (error) {
        console.error("Error polling for new blocks:", error);
      }
    }, interval);
    console.log("Started polling for new blocks...");
  }

  public stopPolling(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      console.log("Stopped polling for new blocks.");
    }
  }
}

// Example usage:
// const NODE_URL = 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID';
// const poller = new EthereumBlockPoller(NODE_URL);
// poller.startPolling(15000);  // Poll every 15 seconds

// Remember to call poller.stopPolling() when you're done or before shutting down your application.
