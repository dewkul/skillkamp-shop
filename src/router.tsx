import Router, { Route } from "preact-router"
import { HomePage, ContactPage } from "./pages"

export default function Routes() {
    return (
        <div class="container mx-auto max-w-7xl">
            <Router>
                <Route path="/" component={HomePage} />
                <Route path="/contact" component={ContactPage} />
            </Router>
        </div>
    )
}
