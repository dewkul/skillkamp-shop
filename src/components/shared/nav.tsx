import { Navbar, Button } from "flowbite-react"
import { MdAccountCircle } from "react-icons/md"
import CartButton from "./navBtnCart"
import { Match } from "preact-router/match"
import { AuthDrawer } from "../drawer"
import { useAuthCtx } from "../../hooks/useAuth"

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
    const { setAuthDrawerOpen } = useAuthCtx()
    return (
        <div>
            <Button onClick={() => setAuthDrawerOpen(true)}>
                <span class="mr-2">
                    <MdAccountCircle />
                </span>
                Log in
            </Button>
            <AuthDrawer />
        </div>
    )
}

interface MatchProps {
    matches: boolean
}
