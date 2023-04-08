import { route } from "preact-router";

export default function NotFoundError() {
    return (
        <section class="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
            <div class="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div class="max-w-md text-center">
                    <h2 class="mb-8 font-extrabold text-9xl dark:text-gray-600">
                        404
                    </h2>
                    <p class="text-2xl font-semibold md:text-3xl">😔 Page not found</p>
                    <p class="mt-4 mb-8 dark:text-gray-400">The stuff you were looking for does not exist </p>
                    <button
                        onClick={() => route("/")}
                        class="px-8 py-3 font-semibold rounded bg-blue-700 text-white dark:bg-violet-400 dark:text-gray-900"
                    >Back to Home
                    </button>
                </div>
            </div>
        </section>
    )
}