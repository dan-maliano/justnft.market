import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'

export default function ArtGallery3(props) {
    return (
        <div className='profile__list-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4'>
            {props.galleries.map((item, index) => (
                <div key={item.itemId} className='nft-list__item w-full h-auto grid grid-cols-1 '>
                    <div className='nft-list__item-wrap item-wrap_no-button grid grid-cols-1 p-4'>
                        <div className='nft-item__img bg-white rounded-xl'>
                        <Link href={{
                            pathname:`/market/${item.tokenId}/`,
                            query: {
                                id: `${item.itemId}`,
                               
                            }
                                }}>
                            <img src={item.image} alt={item.itemId} className='w-full h-auto'></img>
                            </Link>
                        </div>
                        <div className='nft-item__info'>
                            <div>
                                <p className="nft-item__category">{item.category}</p>
                                <h1 className="nft-item__name">{item.name}</h1>
                            </div>

                            <div className='nft-item__price'>
                                <div className="">
                                    {/* <FontAwesomeIcon icon={faEthereum} className="" /> */}
                                    <img src="/assets/svg/assets-logo.svg" alt="Polygon NFT" className=''></img>
                                </div>
                                <h1 className="">{item.price} Matic</h1>
                            </div>
                        </div>
                        <p className="nft-item__creator-title text-[#A2A6D0] text-xs">creator</p>
                        <p className="nft-item__creator-address text-sm truncate ...">{item.creator}</p>
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
                    </div>
                </div>
            ))}
        </div>
    )
}