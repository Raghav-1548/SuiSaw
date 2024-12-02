import { JsonRpcProvider, Ed25519Keypair, RawSigner, TransactionBlock } from '@mysten/sui.js';

const TESTNET_URL = 'https://fullnode.testnet.sui.io:443';
const PRIVATE_KEY = 'suiprivkey1qreskfgt7cdaf0tr94sxhmj0d6ge79p0d5ugwjalfcy63yw0dw78qdtd9ek';
const CONTRACT_ADDRESS = '0x5543945483850052395ed40a8c6cddf739d66d18299ac39dbeaa44d88fed0c1b';

export const provider = new JsonRpcProvider(TESTNET_URL);

// Convert private key to keypair
const getKeypairFromPrivateKey = (privateKey: string): Ed25519Keypair => {
  // Remove the prefix if present
  const cleanKey = privateKey.startsWith('suiprivkey') ? privateKey.slice(10) : privateKey;
  const privateKeyBytes = Array.from(Buffer.from(cleanKey, 'base64'));
  return Ed25519Keypair.fromSecretKey(Uint8Array.from(privateKeyBytes));
};

export const signer = new RawSigner(
  getKeypairFromPrivateKey(PRIVATE_KEY),
  provider
);

export const createRental = async (
  modelId: string,
  userId: string,
  pricePerHour: number
) => {
  const tx = new TransactionBlock();
  
  tx.moveCall({
    target: `${CONTRACT_ADDRESS}::rental::create_rental`,
    arguments: [
      tx.pure(modelId),
      tx.pure(userId),
      tx.pure(Math.floor(pricePerHour * 1e9)), // Convert to smallest unit
      tx.pure(Date.now())
    ],
  });

  try {
    const result = await signer.signAndExecuteTransactionBlock({
      transactionBlock: tx,
    });
    return result;
  } catch (error) {
    console.error('Error creating rental on Sui:', error);
    throw error;
  }
};

export const endRental = async (rentalObjectId: string) => {
  const tx = new TransactionBlock();
  
  tx.moveCall({
    target: `${CONTRACT_ADDRESS}::rental::end_rental`,
    arguments: [tx.pure(rentalObjectId), tx.pure(Date.now())],
  });

  try {
    const result = await signer.signAndExecuteTransactionBlock({
      transactionBlock: tx,
    });
    return result;
  } catch (error) {
    console.error('Error ending rental on Sui:', error);
    throw error;
  }
};

export const getRentalEvents = async () => {
  try {
    const events = await provider.queryEvents({
      query: { MoveModule: { package: CONTRACT_ADDRESS, module: 'rental' } }
    });
    return events;
  } catch (error) {
    console.error('Error fetching rental events:', error);
    throw error;
  }
};