import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { getLedgerWallet } from "@solana/wallet-adapter-wallets/lib/ledger";
import { getPhantomWallet } from "@solana/wallet-adapter-wallets/lib/phantom";
import { getSlopeWallet } from "@solana/wallet-adapter-wallets/lib/slope";
import { getSolflareWallet } from "@solana/wallet-adapter-wallets/lib/solflare";
import { getSolletExtensionWallet } from "@solana/wallet-adapter-wallets/lib/solletExtension";
import { getSolletWallet } from "@solana/wallet-adapter-wallets/lib/sollet";
import { getTorusWallet } from "@solana/wallet-adapter-wallets/lib/torus";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

export const WalletAddressFieldWithSelectorButtons = () => {
  const { publicKey } = useWallet();

  return (
    <>
      <input
        autoFocus
        type="text"
        name="wallet[wallet_id]"
        id="wallet_wallet_id"
        defaultValue={publicKey?.toString()}
        style={{ width: 360 }}
      />

      <div style={{ display: "flex", marginTop: 8 }}>
        <WalletMultiButton />
        <div style={{ width: 8 }} />
        <WalletDisconnectButton />
      </div>
    </>
  );
};

export const WalletSelectorApp = () => {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Mainnet;

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
  // Only the wallets you configure here will be compiled into your application
  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSlopeWallet(),
      getSolflareWallet(),
      getTorusWallet({
        options: { clientId: "Get a client ID @ https://developer.tor.us" },
      }),
      getLedgerWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletAddressFieldWithSelectorButtons />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletSelectorApp;
