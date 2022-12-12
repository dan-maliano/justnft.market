import Head from 'next/head'
import Link from 'next/link'
import { useState,useEffect,useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone } from '@fortawesome/free-regular-svg-icons'
import { faCopy, faShareAlt } from '@fortawesome/free-solid-svg-icons'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Breadcrumbs from '../../components/breadcrumbs'
import ArtGallery3 from '../../components/explore/art-gallery3'
import { useWeb3 } from '../../components/web3'
import Web3 from "web3"
import axios from 'axios'
import SuccessDialog from '../../components/dialog/success'
import LoaderDialog from '../../components/dialog/loader'
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function myProfilePage() {


	
    const web3Api = useWeb3();
    console.log(web3Api)
    
    
      //Craete function to listen the change in account changed and network changes
    
    
      //Create LoadAccounts Function
      const account =   web3Api.account;

	 
		const[noProvider,setNoProvider] = useState(true);
	
	
	  
	
		//Create LoadAccounts Function
		const[accountBalance,setAccountBalance]= useState(0);
	
	
		const [isLoading,setIsLoading] = useState(true);
	
	
		//Load Contracts Function
		const[nftContract,setNFtContract]= useState(null)
		const[marketContract,setMarketContract]= useState(null)
		const[nftAddress,setNFtAddress]= useState(null)
		const[marketAddress,setMarketAddress]= useState(null)
		const[unsoldItems,setUnsoldItems]= useState([])
	
		const[tokenContract,setTokenContract]= useState(null)
		const[tokenBalance,setTokenBalnce] =useState("0");
		const [creatorCommissionValueInwei,setCreatorCommissionValueInwei]= useState(null)
	
  
  
	  //Load Contracts Function
	  const[creathedItems,setcreathedItems]= useState([])
	  const[soldItems,setSoldItems]= useState([])
  
  
	  useEffect(()=>{
		  const LoadContracts = async()=>{
		   //Paths of Json File
		   const nftContratFile =  await fetch("/abis/NFT.json");
		   const marketContractFile = await fetch("/abis/NFTMarketPlace.json");
//Convert all to json
		  const  convertNftContratFileToJson = await nftContratFile.json();
		  const  convertMarketContractFileToJson = await marketContractFile.json();
//Get The ABI
		  const markrtAbi = convertMarketContractFileToJson.abi;
		  const nFTAbi = convertNftContratFileToJson.abi;

		  const netWorkId =  await web3Api.web3.eth.net.getId();

		  const nftNetWorkObject =  convertNftContratFileToJson.networks[netWorkId];
		  const nftMarketWorkObject =  convertMarketContractFileToJson.networks[netWorkId];

	
	
		

		  if(nftMarketWorkObject && nftMarketWorkObject){
		   const nftAddress = nftNetWorkObject.address;
		   setNFtAddress(nftAddress)
		   const marketAddress = nftMarketWorkObject.address;
		   setMarketAddress(marketAddress)

		   const deployedNftContract = await new web3Api.web3.eth.Contract(nFTAbi,nftAddress);
		   setNFtContract(deployedNftContract)
		   const deployedMarketContract = await new web3Api.web3.eth.Contract(markrtAbi,marketAddress);
		   setMarketContract(deployedMarketContract)

		

			 if(account){
			  const data =  await deployedMarketContract.methods.getMyItemCreated().call({from:account})
			  const items = await Promise.all(data.map(async item=>{
			   const nftUrl = await deployedNftContract.methods.tokenURI(item.tokenId).call();
			   console.log(nftUrl)
			   console.log(item)
			   const priceToWei = Web3.utils.fromWei((item.price).toString(),"ether")
			   const metaData =  await axios.get(nftUrl);

			   let classChange;

			   if((item.sold||item.soldFirstTime)){
				   classChange = "Sold"
				   
			   }else{
				classChange = "Created"
			   }

  
  //TODO: fix this object
			 let myItem = {
				 
				ClassChange:classChange,
                price:priceToWei,
                itemId : item.id,
                tokenId:item.tokenId,
                owner :item.owner,
                seller:item.seller,
                oldOwner :item.oldOwner,
                creator:item.creator,
                oldSeller :item.oldSeller,

                oldPrice:item.oldPrice,
                image:metaData.data.image,
                name:metaData.data.name,
                description:metaData.data.description,
                category:classChange,

                isResell:item.isResell,
                soldFirstTime:item.soldFirstTime

		   }
  
		   return myItem;
  
			 }))
  
		
			 setcreathedItems(items)
			 
			 }
			
		   
  
  
  
   
			 }else{
                openSuccessModal()

			 }
  
  
  
		  }
		  setIsLoading(false) 
		  web3Api.web3&&LoadContracts()
  
	  },[account])

	//   setIsLoading(false)




    const [current, setCurrent] = useState(0)  

    const breadcrumbs = ["My Profile"]
    const btnCategories = [  "Created","Sold"]
  
    const [data, setData] = useState(creathedItems);
    const [category, setCategory] = useState("Created");
    
    useEffect(() => {
      const filteredData = creathedItems.filter((d) => d.category === category);
    
      if (category === "Created") {
        setData(creathedItems);
      } else {
        setData(filteredData);
      }
    }, [creathedItems,category]);
    
    let [priceOpen, setPriceOpen] = useState(false)
    let inputPriceRef = useRef(null)
    let [loaderOpen, setLoaderOpen] = useState(false)
    let [successOpen, setSuccessOpen] = useState(false)

    function closePriceModal() {
        setPriceOpen(false)
    }
    
    function openPriceModal() {
        setPriceOpen(true)
    }

    function closeLoaderModal() {
        setLoaderOpen(false)
    }
    
    function openLoaderModal() {
        closePriceModal()
        setLoaderOpen(true)

        setTimeout(purchaseSuccesss, 1000)
    }

    function closeSuccessModal() {
        closePriceModal()
        closeLoaderModal()
        setSuccessOpen(false)
    }

    function openSuccessModal() {
        setSuccessOpen(true)
    }

    function purchaseSuccesss() {
        closeLoaderModal()
        openSuccessModal()
    }





    return (
        <>
            <Head>
                <title>My Account</title>
                <link rel="icon" href="/favicon.png" />
            </Head>

            <Header current={-1}></Header>

            <div className='main page-wrap inside-page'>
                <div className='relative w-full 2xl:max-w-screen-2xl h-auto pt-[60px] m-auto'>
                    <div className='profile mx-4 sm:mx-16 lg:mx-[9vw] space-y-6'>
                        <div className='profile__wrap'>
                            <div className='profile__cover-wrap'>
                                <img src="/assets/jpg/cover-my-profile.jpg"></img>
                                <h1 className='page-title'>My Profile</h1>
                            </div>
                            <div class="profile__info">
                                <div className='profile__avatar'>
                                    <div className="profile__avatar-wrap">
                                        <img src="/assets/jpg/ava-my-profile.jpg"></img>
                                    </div>
                                </div>
                                <div className='profile__address-side'>
                                    <h2 className='profile__address-title'>Account Address</h2>
                                    <div className="profile__address-wrap">
                                        <div className='profile__address'>{account}</div>
                                        <div>
                                            <button className="copy-button"  onClick={() => {navigator.clipboard.writeText(`${account}`)}}>
                                                <span>Copy address</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='profile__list-count'>
                                <div className='profile__count-title'>NFT Count</div>
                                <div className='profile__count-number'>
                                    <p className=''>{creathedItems.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col mx-4 sm:mx-16 lg:mx-[9vw] space-y-6'>
                        <div className='flex flex-col space-y-6'>
                            <div className='profile-bottom-wrap'>
                                <div className='profile__list-head'>
                                    {/* categories */}
                                    <div className='filters-items-wrap'>
                                        {btnCategories.map((item, index) => (
                                        <button key={"btn-category" + index.toString()} className={classNames(index === current ? 'filter-button_active filter-button' : 'filter-button', '')} onClick={() => {setCurrent(index)
                                            setCategory(item)
                                        }}><span>{item}</span></button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* galleries */}
                            {
                                    !data.length?                                <a className="empty-messege">
                                    NO NFTs At This Category
                                </a>:    <ArtGallery3 galleries={data}></ArtGallery3> 
                            }
                         
                        </div>
                    </div>
                </div>
            </div>
            <SuccessDialog show={successOpen} closeSuccessModal={closeSuccessModal}>{{modalIconUrl: "/assets/svg/attention-icon",msg:"Please Connect MetaMask With Polygon NetWork",title:"Attention",buttonTitle:"Cancel"}}</SuccessDialog>

            <Footer></Footer>
        </>
    )
}
