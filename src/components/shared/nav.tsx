import { Navbar, Button } from "flowbite-react"
import { BsPersonCircle, BsCart3 } from "react-icons/bs"
import { MdAccountCircle } from "react-icons/md"
import CartButton from "./navBtnCart"

export default function Nav() {
    return (
        <Navbar fluid={true} rounded={true}>
            <Navbar.Brand href="/">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Happy Kids
                </span>
            </Navbar.Brand>
            <div class="flex md:order-2">
                <AccountButton />
                <CartButton />
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="/" active={true}>Home</Navbar.Link>
                <Navbar.Link href="/">Shop</Navbar.Link>
                <Navbar.Link href="/">Our story</Navbar.Link>
                <Navbar.Link href="/">Contact</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

function AccountButton() {
    return (
        // <button class="tw-p-0" >Log in</button>
        // leftIcon={<BsPersonCircle />}
        <Button>
            <span class="mr-2">
                <MdAccountCircle />
            </span>
            Log in
        </Button>
    )
}
