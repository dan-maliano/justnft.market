export default function Footer() {
    return (
        <div className="footer">
            <div className="w-full 2xl:max-w-screen-2xl m-auto">
                <div className="grid grid-cols-1">
                    <div className="footer__wrap flex flex-col lg:flex-column m-4 sm:m-8 lg:m-[7vw]">
                        <div className="footer__head">
                            <img src="/assets/svg/logo-dark.svg" alt="logo" className="footer__logo footer__logo_light"></img>
                            <img src="/assets/svg/logo-light.svg" alt="logo" className="footer__logo footer__logo_dark"></img>
                            <p>Discover, Collect, and Sell Extraordinary NFTs. Just NFT is the world's first and largest NFT marketplace</p>
                        </div>
                    </div>

                    <div className="footer__copyright">
                        <p className="copyright">© 2022 Just NFT. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}