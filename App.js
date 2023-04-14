import React, {useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import Web3 from 'web3';

const App = () => {
  const [tmxValue, setTmxValue] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');

  const handleSendEth = async () => {
    const web3 = new Web3(
      'https://mainnet.infura.io/v3/a6be07d508a04d018080606edaef1ed5',
    );
    const privateKey = '0xE078Df9bD8B6ef612F5ECe164485cb2caa4773A9';
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);

    const gasPrice = '1000000000';
    const gasLimit = 21000;

    const transaction = {
      from: account.address,
      to: toAddress,
      value: web3.utils.toWei(tmxValue, 'ether'),
      gasPrice,
      gasLimit,
    };

    try {
      const signedTx = await web3.eth.accounts.signTransaction(
        transaction,
        privateKey,
      );
      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
      );
      console.log('Transaction receipt:', receipt);

      setTransactionHash(receipt.transactionHash);
      setTransactionStatus(receipt.status === true ? 'Completed' : 'Failed');
    } catch (error) {
      console.error('Transaction error:', error);
    }
  };

  return (
    <View>
      <TextInput
        value={tmxValue}
        onChangeText={setTmxValue}
        placeholder="TMX value"
      />
      <TextInput
        value={toAddress}
        onChangeText={setToAddress}
        placeholder="To address"
      />
      <Button title="Send ETH" onPress={handleSendEth} />
      {transactionHash && (
        <View>
          <Text>Transaction Hash: {transactionHash}</Text>
          <Text>Transaction Status: {transactionStatus}</Text>
        </View>
      )}
    </View>
  );
};

export default App;
