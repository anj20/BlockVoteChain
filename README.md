# BlockVoteChain 

BlockVoteChain is a decentralized voting application built on blockchain technology. This repository contains all the necessary code and resources to run the BlockVoteChain application.

## Features

- **Decentralized Voting:** BlockVoteChain enables decentralized voting, allowing participants to cast their votes directly without the need for intermediaries.
- **Transparent and Immutable:** All voting data is stored on the blockchain, ensuring transparency and immutability of the voting process.
- **Security:** BlockVoteChain utilizes cryptographic techniques to ensure the security and integrity of the voting system.
- **Easy to Use:** The application provides a user-friendly interface for voters to participate in the voting process.

## Prerequisites

To run the BlockVoteChain application, you need to have the following prerequisites:

- Node.js (version 12 or higher)
- Hardhat (development environment for Ethereum)
- Ganache (for local blockchain development)
- MetaMask (browser extension for interacting with the Ethereum network)

## Installation

1. Clone this repository to your local machine:

   ```
   git clone https://github.com/anj20/BlockVoteChain.git
   ```

2. Install the project dependencies:

   ```
   cd BlockVoteChain
   npm install
   ```

3. Configure MetaMask:

   - Install the MetaMask extension in your browser.
   - Create a new Ethereum network and connect to it.
   - Import an account with test Ether provided by Ganache.

## Usage

1. Start Ganache to create a local blockchain for testing and development:

   ```
   npx ganache-cli
   ```

2. Compile and deploy the smart contracts to the local blockchain:

   ```
   npx hardhat run scripts/deploy.js --network development
   ```

3. Start the development server:

   ```
   npm start
   ```

4. Open your browser and go to `http://localhost:3000` to access the BlockVoteChain application.

5. Use MetaMask to interact with the application and cast your vote.

## Contributing

Contributions to BlockVoteChain are welcome! If you find any issues or have suggestions for improvements, please submit an issue or a pull request to this repository.

When contributing, please ensure that your code adheres to the existing code style and conventions. Additionally, include test cases for any new features or bug fixes.

## License

BlockVoteChain is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute this code for both commercial and non-commercial purposes.

## Acknowledgements

BlockVoteChain was inspired by the idea of decentralized voting systems and blockchain technology. We would like to thank the open-source community for their valuable contributions and the Ethereum Foundation for providing the necessary infrastructure for building decentralized applications.
