import Router from "preact-router"
import { HomePage, ContactPage } from "./pages"

export default function Routes() {
    return (
        <div class="container mx-auto max-w-7xl">
            <Router>
                <HomePage path="/" />
                <ContactPage path="/contact" />
            </Router>
        </div>
    )
}
