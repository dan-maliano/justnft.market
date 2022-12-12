import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'
import InputDialog from '../../components/dialog/input'
import LoaderDialog from '../../components/dialog/loader'
import SuccessDialog from '../../components/dialog/success'
import { useState,useEffect } from 'react'

export default function ArtGallery4(props) {


let [priceOpen, setPriceOpen] = useState(false)
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
        <div className='profile__list-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4'>
            {props.galleries.map((item, index) => (
                 <div key={item.itemId} className='nft-list__item w-full h-auto grid grid-cols-1'>
                    <div className='nft-list__item-wrap grid grid-cols-1 p-4'>
                        <div className='nft-item__img'>
                        <Link href={{
                            pathname:`/market/${item.tokenId}/`,
                            query: {
                                id: `${item.itemId}`,
                               
                            }
                                }}>
                            <img src={item.image} alt={item.name} className='w-full h-auto'></img>
                            </Link>
                        </div>
                        <div className='nft-item__info'>
                            <div>
                                <p className="nft-item__category">{item.category}</p>
                                <h1 className="nft-item__name">{item.name}</h1>
                            </div>

                            <div className='nft-item__price'>
                                <div>
                                    <img src='/assets/svg/assets-logo.svg' alt="Polygon NFT"></img>
                                </div>
                                <h1>{item.price } Matic</h1>
                            </div>
                        </div>
                        <p className="nft-item__creator-title">Creator</p>
                        <p className="nft-item__creator-address truncate ... ">{item.creator} </p>
                    </div>                            
                    
                    <div className="nft-item__buy-wrap">
                        <Link href={{
                            pathname:`/market/${item.tokenId}/`,
                            query: {
                                id: `${item.itemId}`,
                            
                            }
                                }}>
                            <button className="nft-item__link">
                                <span>More info</span>
                            </button>
                        </Link>
                        <button className='my-button' onClick={openPriceModal}><span>{item.buttonTitle}</span></button>
                    </div>

                       {/* price input dialog  */}
       <InputDialog show={priceOpen} openPriceModal={openPriceModal} closePriceModal={closePriceModal} purchasingNft={openLoaderModal}>{{resellFucnction:props.children.resellFucnction,item:item}}</InputDialog>

                </div>
                
            ))}

{/* loader dialog  */}
<LoaderDialog show={loaderOpen} openLoaderModal={openLoaderModal}></LoaderDialog>

{/* success dialog  */}
{/* <SuccessDialog show={successOpen} closeSuccessModal={closeSuccessModal}>{{msg:"",title:"",buttonTitle:""}}</SuccessDialog> */}

        </div>

        
    )
}