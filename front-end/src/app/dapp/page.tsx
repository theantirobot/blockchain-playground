"use client"
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
    amount: number; // Corrected the typo here from 'ammount' to 'amount'
    recipient: string;
};

// Checking if window.ethereum is available
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

const SendEtherComponent = () => {
  const [account, setAccount] = useState('');
  const form = useForm<Inputs>();
  const [web3Status, setWeb3Status] = useState<string>("loading accounts");
  useEffect(() => {
    loadAccount();
  }, []);

  const loadAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      console.error("No accounts found. Please connect your wallet.");
      return;
    }
    setAccount(accounts[0]); // Using the first account found
    setWeb3Status("Connected");
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        setWeb3Status("Connected");
      } catch (error) {
        setWeb3Status("Failed requesting accounts");
        console.error('Failed to connect wallet:', error);
      }
    } else {
      setWeb3Status("No Wallet Found");
    }
  };

  const onSubmit: SubmitHandler<Inputs> = data => {
    const amountToSend = web3.utils.toWei(data.amount.toString(), "ether"); // Convert the amount to wei
    web3.eth.sendTransaction({
        from: account,
        to: data.recipient,
        value: amountToSend
    })
    .then(result => {
      console.log('Ether sent successfully:', result);
    })
    .catch(error => {
      console.error('Failed to send Ether:', error);
    });
  };

  return (
    <div>
    { web3Status === "loading accounts" && <p className="italic font-light text-center mt-2">Loading Accounts...</p> }
    { !account && web3Status !== "loading accounts" && <Button onClick={connectWallet}>Connect Wallet</Button> }
    { account && 
    <div className='border rounded-lg p-4 m-2 shadow'>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="recipient"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="0xD5F46Ef9e3acdE9f4AAEBD37F37c4B2EC90D51F1" {...field} />
                </FormControl>
                <FormDescription>
                  This is where you will send your ETH.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder=".1337" {...field} />
                </FormControl>
                <FormDescription>
                  This is how much ETH you'll send.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Send ETH</Button>
        </form>
      </Form>
    </div>}
    </div>

  )
};

export default SendEtherComponent;
