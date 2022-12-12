import Link from "next/link"
export default function Paragraph1() {
    const title = "Discover, Collect, and Sell Extraordinary NFTs"
    const description = "Just NFT is the world's first and largest NFT marketplace"
    
    return (
        <div className='prime relative flex flex-col space-y-8 md:flex-row md:space-y-0 md:items-center m-8 sm:m-16 '>
            {/* left element */}
            <div className='prime__content'>
                <h1 className='prime-title'>Discover, Collect, and Sell Extraordinary NFTs</h1>
                <p className='prime-undertitle'>{description}</p>
                <div className='double-buttons-wrap flex-1 flex flex-row gap-4 mt-[4vw]'>
                    <div className=''>
                    <Link href="./categories">
                        <button className='my-button prime-screen__button'><span>Collection</span></button>
                    </Link>
                    </div>
                    <div className=''>
                    <Link href="./create-nft">
                        <button className='my-button prime-screen__button prime-screen__button_secondary'><span>Create NFT</span></button>
                   </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}