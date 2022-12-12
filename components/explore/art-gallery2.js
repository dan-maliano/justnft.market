import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'

export default function ArtGallery2(props) {
    return (
        <div className='nft-list__wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8'>
            {props.galleries.map((item, index) => (
                <div key={item.artId} className='nft-list__item w-full h-auto grid grid-cols-1 '>
                    <div className='nft-list__item-wrap grid grid-cols-1 p-4'>
                        <div className='nft-item__img bg-white'>
                        <Link href={{
                            pathname:`/market/${item.tokenId}/`,
                            query: {
                                id: `${item.itemId}`,
                               
                            }
                                }}>
                                       <img 
                                        onClick={() =>
                                            props.refresh
                                              ? props.refresh(item.tokenId, item.itemId)
                                              : ""
                                          }
                                       src={item.image} alt={item.name} className=''></img>
                                                     </Link>
                        </div>








                        <div className='nft-item__info'>
                            <div>
                                <p className="nft-item__category">{item.category}</p>
                                <h1 className="nft-item__name">{item.name}</h1>
                            </div>
                            <div className='nft-item__price'>
                                <div className="">
                                    <img src="/assets/svg/assets-logo.svg" alt="Polygon NFT" className=''></img>
                                </div>
                                <h1 className="">{item.price} Matic</h1>
                            </div>
                        </div>
                        
                        <p className="nft-item__creator-title">Creator:</p>
                        <Link href={`/account/${item.creator}`}>
                            <a className="nft-item__creator-address text-sm truncate ...">{item.creator}</a>
                        </Link >
                    </div>                            
                    
                    <div className="nft-item__buy-wrap">
                    <Link href={{
                            pathname:`/market/${item.tokenId}/`,
                            query: {
                                id: `${item.itemId}`,
                               
                            }
                                }}>

                            <button className="nft-item__link"  onClick={() =>
                                props.refresh
                                ? props.refresh(item.tokenId, item.itemId)
                                : ""
                            }>                                
                                <span>More info</span>

                            </button>
                            </Link >

                       {item.sold?"":<button className='my-button' onClick={()=>props.children.buyFunction(item)} > <span>{item.buttonTitle}</span></button>} 
                    </div>
                </div>
            ))}
        </div>
    )
}