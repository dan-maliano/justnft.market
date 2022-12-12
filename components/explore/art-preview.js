
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'

import {
    FacebookShareCount,
    HatenaShareCount,
    OKShareCount,
    PinterestShareCount,
    RedditShareCount,
    TumblrShareCount,
    VKShareCount
  } from "react-share";
export default function ArtPreview (props) {
    return (
        <div className='art-prev space-x-0 space-y-8 lg:space-x-8 lg:space-y-0'>
                <div className='art-prev__info-top'>
                    <div className='art-prev__img-wrap'>
                        <img src={props.children.item.image} className='w-full art-prev__img'></img>
                    </div>
                    <div className='art-prev__descr'>
                        <h4 className='art-prev__category'>{props.children.item.category}</h4>
                        <h1 className='art-prev__title'>{props.children.item.name}</h1>
                        <p>{props.children.item.description}</p>
                    </div>
                </div>

                <div className='art-prev__info-bottom'>

                    <div className='art-prev__price'>

                        <div className='art-prev__price-amount'>
                            <img className='art-prev__price-icon' src="/assets/svg/assets-logo.svg" alt="Polygon NFT"></img>
                            <h1 className="">{props.children.item.price}Matic</h1>
                        </div>


                        {props.children.item.sold?"":      <button className='my-button shadow-md' onClick={()=>props.children.buyFunction(props.children.item)}><span>BUY NOW</span></button>}
                    </div>

                    <div className='art-prev__users'>
                        <div className='art-prev__user-wrap'>
                            <div className='flex flex-row'>
                                <div className='art-prev__user-ava'>
                                    <img src='/assets/jpg/ava-user-profile.jpg'></img>
                                </div>
                                <div className='art-prev__user-info'>
                                    <p className=''>Sell By</p>
                                    <p className='text-ellipsis overflow-hidden whitespace-nowrap'>{props.children.item.seller}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className='art-prev__user-wrap'>
                            <div className='flex flex-row'>
                                <div className='art-prev__user-ava'>
                                    <img src='/assets/jpg/ava-user-profile.jpg'></img>
                                </div>
                                <div className='art-prev__user-info'>
                                    <p className=''>Created By</p>
                                    <p className='text-ellipsis overflow-hidden whitespace-nowrap'>{props.children.item.creator}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

        </div>
    )
}