export default function Header() {

    // maybe navbar should be put inside game components and not to the global header, since
    // this is for navigating inside the game
    return (
        <div className="header-area">
            <h1><a href="/">Magic game 2</a></h1>
            <div className="navbar">
                <ul>
                    <li><a href="/game/battle">Battle</a></li>
                    {/* toho /game/army/:pelaajanId tjsp*/}
                    <li><a href="/game/army">My army</a></li>
                    <li><a href="/game/market">Market</a></li>
                </ul>
            </div>
        </div>
    );
}
