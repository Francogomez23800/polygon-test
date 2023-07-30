import {
  Web3Button,
  useActiveClaimConditionForWallet,
  useAddress,
  useClaimIneligibilityReasons,
  useContract,
  useContractMetadata,
  useTotalCirculatingSupply,
  useTotalCount,
} from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../../const/addresses";
import Navbar from "../components/Navbar";
import { ethers } from "ethers";

const Home = () => {
  const address = useAddress();

  const { contract } = useContract(CONTRACT_ADDRESS);

  const { data: contractMetadata, isLoading: isContractMetadataLoading } =
    useContractMetadata(contract);

  const { data: activeClaimPhase, isLoading: isActiveClaimPhaseLoading } =
    useActiveClaimConditionForWallet(contract, address);

  const { data: totalSuply, isLoading: isTotalSuplyLoading } =
    useTotalCount(contract);

  const { data: totalClaimed, isLoading: isTotalClaimedLoading } =
    useTotalCirculatingSupply(contract);

  const maxClaimable = parseInt(activeClaimPhase?.maxClaimablePerWallet || "0");

  const { data: claimIneleigibility, isLoading: isClaimIneleigibilityLoading } =
    useClaimIneligibilityReasons(contract, {
      walletAddress: address || "",
      quantity: 1,
    });

  return (
    <div>
      <Navbar />
      <main className="w-full h-[600px] flex flex-col items-center justify-center p-5 lg:p-0">
        {!isContractMetadataLoading && (
          <div className="bg-slate-100 bg-opacity-20 flex flex-col lg:flex-row gap-5 items-center rounded-2xl w-full max-w-[370px] lg:max-w-[600px] lg:h-[300px] flex p-5">
            <div className="w-[150px] lg:w-[220px]">
              <img
                src={contractMetadata?.image}
                className="w-full rounded-2xl"
              />
            </div>
            <div className="flex flex-col gap-7 items-center lg:items-start">
              <div>
                <h1 className="text-[25px] lg:text-[30px] text-center font-semibold">
                  {contractMetadata.name}
                </h1>
                <p className="text-center lg:text-start">{contractMetadata.description}</p>
              </div>
              <div>
                {!isActiveClaimPhaseLoading ? (
                  <div>
                    <p>
                      Price: {ethers.utils.formatUnits(activeClaimPhase?.price)}
                    </p>
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
                {!isTotalSuplyLoading && !isTotalClaimedLoading ? (
                  <p className="">
                    Claimed: {totalClaimed?.toNumber()}/
                    {totalSuply?.toNumber()}
                  </p>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
              <div>
                {address ? (
                  !isClaimIneleigibilityLoading ? (
                    claimIneleigibility?.lenght > 0 ? (
                      claimIneleigibility?.map((reason, index) => <p key={index}>{reason}</p>)
                    ) : (
                      <div className="">
                        <Web3Button
                          contractAddress={CONTRACT_ADDRESS}
                          action={(contract) => contract.erc721.claim(1)}
                        >
                          Claim NFT
                        </Web3Button>
                      </div>
                    )
                  ) : (
                    <p>Loading...</p>
                  )
                ) : (
                  <p>Connect Your wallet to claim</p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
