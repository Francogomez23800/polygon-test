import {
  useAddress,
  useOwnedNFTs,
  useContract,
  ThirdwebNftMedia,
} from "@thirdweb-dev/react";
import React from "react";
import { CONTRACT_ADDRESS } from "../../../const/addresses";
import Navbar from "../../components/Navbar";

const Profile = () => {
  const address = useAddress();
  const truncateAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const { contract } = useContract(CONTRACT_ADDRESS);

  const { data: ownedNFTs, isLoading: isOwnedNFTsLoading } = useOwnedNFTs(
    contract,
    address
  );
  return (
    <>
      <Navbar />
      <div className="flex flex-col">
        {address ? (
          <>
            <h3 className="p-3 text-[20px]">My NFTs:</h3>
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-10 p-10">
              {!isOwnedNFTsLoading ? (
                ownedNFTs?.length > 0 ? (
                  ownedNFTs?.map((nft) => (
                    <div
                      className="w-full lg:w-[350px] bg-slate-100 bg-opacity-20 rounded-2xl flex flex-col gap-5 items-center justify-center p-10"
                      key={nft.metadata.id}
                    >
                      
                        <ThirdwebNftMedia
                          metadata={nft.metadata}
                          width="250px"
                          height="250px"/>
                     
                      <h3 className="text-[25px]">{nft.metadata.name}</h3>
                    </div>
                  ))
                ) : (
                  <p>No NFTs owned</p>
                )
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </>
        ) : (
          <div>
            <p>Please connect a wallet!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
