import { Navbar, Button, Dropdown } from "flowbite-react"
import { Menu, Transition } from '@headlessui/react'
import { MdAccountCircle } from "react-icons/md"
import { Match } from "preact-router/match"
import { BsCart3 } from "react-icons/bs"
import { AuthDrawer } from "../drawer"
import { useAuthCtx } from "../../hooks/useAuth"
import { useCartCtx } from "../../hooks/useCart"
import CartDrawer from "../drawer/cartDrawer"

export default function Nav() {

    return (
        <Navbar fluid={true} rounded={true}>
            <Navbar.Brand href="/">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Happy Kids
                </span>
            </Navbar.Brand>
            <div class="flex flex-wrap gap-2 md:order-2">
                <AccountButton />
                <CartOpenButton />
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Match path="/">
                    {
                        ({ matches }: MatchProps) =>
                            <Navbar.Link href="/" active={matches}>Home</Navbar.Link>}
                </Match>
                <Match path="/shop">
                    {
                        ({ matches }: MatchProps) =>
                            <Navbar.Link href="/shop" active={matches}>Shop</Navbar.Link>
                    }
                </Match>
                <Match path="/story">
                    {
                        ({ matches }: MatchProps) =>
                            <Navbar.Link href="/story" active={matches}>Our story</Navbar.Link>
                    }
                </Match>

                <Match path="/contact">
                    {
                        ({ matches }: MatchProps) =>
                            <Navbar.Link href="/contact" active={matches}>Contact</Navbar.Link>
                    }
                </Match>
            </Navbar.Collapse>
        </Navbar>
    )
}

function AccountButton() {
    const { openAuthDrawer, isLogIn, removeAuthData } = useAuthCtx()

    return (
        <div>
            {
                isLogIn.value
                    ? <Dropdown label={<MdAccountCircle />} icon={<MdAccountCircle />}>
                        {/* <Dropdown.Item>
                            My Account
                        </Dropdown.Item> */}
                        <Dropdown.Item onClick={removeAuthData}>
                            Log Out
                        </Dropdown.Item>
                    </Dropdown>
                    : <Button onClick={openAuthDrawer}>
                        <span class="mr-2">
                            <MdAccountCircle />
                        </span>
                        <span class="text-xs">Log in</span>
                    </Button>
            }
            <AuthDrawer />
        </div>
    )
}

function CartOpenButton() {
    const { openCartDrawer, itemsCount } = useCartCtx()

    return (
        <div>
            <Button
                color="gray"
                label={itemsCount}
                onClick={openCartDrawer}>
                <BsCart3 />
            </Button>
            <CartDrawer />
        </div>
    )
}


interface MatchProps {
    matches: boolean
}
