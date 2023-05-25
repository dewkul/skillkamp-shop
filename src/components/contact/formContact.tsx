import { h } from "preact"
import { Card } from "flowbite-react"
import { useState } from "preact/hooks"

export default function ContactForm() {
    const [subject, setSubject] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")


    const onEmailInput = (e: Event) => {
        if (e.target instanceof HTMLInputElement)
            setEmail(e.target.value)
    }

    const onSubjectInput = (e: Event) => {
        if (e.target instanceof HTMLInputElement)
            setSubject(e.target.value)
    }

    const onMessageInput = (e: Event) => {
        if (e.target instanceof HTMLInputElement)
            setMessage(e.target.value)
    }

    const sendMail = (e: Event) => {
        const params: string[] = []
        e.preventDefault()
        if (subject)
            params.push(`subject=${subject}`)
        if (message)
            params.push(`&body=${message}`)

        window.open(`mailto:${email}?${params.join('&')}`)
    }

    return (
        <Card>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Contact Us
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                For any questions, please send us a message
            </p>
            <form onSubmit={e => sendMail(e)}>
                <div class="flex flex-wrap -mx-3 mb-2">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            First Name
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" />
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Last Name
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" />
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-2">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
                            Email (*required)
                        </label>
                        <input
                            value={email}
                            onInput={onEmailInput}
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-email"
                            type="email"
                            placeholder="your@email.com"
                            required
                        />
                        {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-2">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-subject">
                            Subject
                        </label>
                        <input
                            value={subject}
                            onInput={onSubjectInput}
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-subject"
                            type="text"
                            placeholder="Your title" />

                    </div>
                </div>
                <div class="flex flex-wrap -mx-3">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-msg">
                            Message
                        </label>
                        <textarea
                            value={message}
                            onInput={onMessageInput}
                            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-msg"
                            placeholder="Leave your message here..." />
                        {/* <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
                    </div>
                </div>
                <div class="flex flex-wrap">
                    <button
                        type="submit"
                        class="inline-flex items-center px-5 py-2.5 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </Card>
    )
}