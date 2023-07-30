import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { Link} from "react-router-dom";

const Navbar = () => {
  const address = useAddress()

  return (
    <div className="w-full lg:h-[70px] bg-white bg-opacity-5 flex flex-col lg:flex-row items-center justify-center lg:justify-between p-5
    sm:gap-3 lg:gap-0">
    <div className="lg:hidden">
    <ConnectWallet />
    </div>
      <Link to={"/"}>NFT Collection</Link>
      <div>
        {address && (
          <Link 
          to={`/profile/${address}`}
          href={`/profile/${address}`} 
          >
            My NFTs
          </Link>
        )}
      </div>
      <div className="sm:hidden lg:block">
      <ConnectWallet/>  
      </div>
    </div>
  );
};

export default Navbar;
