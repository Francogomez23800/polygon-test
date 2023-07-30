import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { Link} from "react-router-dom";

const Navbar = () => {
  const address = useAddress()

  return (
    <div className="w-full h-[70px] bg-white bg-opacity-5 flex items-center justify-between p-5">
      <Link to={"/"}>NFT Collection</Link>
      <div className="">
        {address && (
          <Link 
          to={`/profile/${address}`}
          href={`/profile/${address}`} >
            My NFTs
          </Link>
        )}
      </div>
      <ConnectWallet />
    </div>
  );
};

export default Navbar;
