import './Navbar.css';

function Navbar() {
    return (
        <div id="navbar">
            <button onClick={() => {
                console.log("navbar button clicked")
            }}>Button</button>

        </div>
    );
}

export default Navbar;
