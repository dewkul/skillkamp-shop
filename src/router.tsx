import Router from "preact-router"
import HomePage from "./pages/home"

export default function Routes() {
    return (
        <div class="container mx-auto">
            <Router>
                <HomePage path="/" />
            </Router>
        </div>
    )
}
