import Image from 'next/image';

export default function Header() {

    // maybe navbar should be put inside game components and not to the global header, since
    // this is for navigating inside the game
    return (
        <div className="header-area">
            <div className="logo-area">
                <Image className="game-logo" src={"/landofcharacterslogo.png"} alt={'logo'} width={380} height={206} />
            </div>
            <div className="navbar">
                <a href="/game/battle">Battle</a>
                {/* toho /game/army/:pelaajanId tjsp*/}
                <a href="/game/army">My army</a>
                <a href="/game/market">Market</a>
            </div>
        </div>
    );
}
