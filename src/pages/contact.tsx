import { Card } from "flowbite-react"
import { useState } from "preact/hooks"

export default function ContactPage(_: Props) {
    const contacts = [
        {
            "title": "visit us",
            "lines": [
                "500 Terry Francois St.",
                "San Francisco, CA 94158",
                "123-456-7890",
            ]
        },
        {
            "title": "opening hours",
            "lines": [
                "Mon - Fri: 7am - 10pm",
                "​​Saturday: 8am - 10pm",
                "​Sunday: 8am - 11pm",
            ]
        },
        {
            "title": "customer service",
            "lines": [
                "1-800-000-000",
                "123-456-7890",
                "info@mysite.com",
            ]
        },
    ]
    return (
        <div>
            <ContactForm />
            <div class="py-5">
                <Card>
                    <div class="grid grid-cols-3">
                        {
                            contacts.map((c, _) => <ContentGroup title={c.title} lines={c.lines} />)
                        }
                    </div>
                </Card>
            </div>
        </div>
    )
}

function ContentGroup({ title, lines }: ContentGroupProps) {
    return (
        <div>
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white capitalize">{title}</h5>
            <div>
                {
                    lines.map((c, _) => <div>{c}</div>)
                }
            </div>
        </div>
    )
}

function ContactForm() {
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

    const sendMail = () => {
        // TODO: fix 
        window.open(`mailto:${email}?${subject ? `subject=${subject}` : ""}${message ? `&body=${message}` : ""}`)
    }

    return (
        <Card >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Contact Us
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                For any questions, please send us a message
            </p>
            {/* <form> */}
            <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        First Name
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" />
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
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="your@email.com"
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
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-subject" type="text" placeholder="Your title" />

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
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-msg" placeholder="Leave your message here..." />
                    {/* <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
                </div>
            </div>
            <div class="flex flex-wrap">
                <button onClick={sendMail} class="inline-flex bg-blue-700 items-center px-5 py-2.5 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                    Submit
                </button>
            </div>
            {/* </form> */}
        </Card>
    )
}

interface ContentGroupProps {
    title: string
    lines: string[]
}

interface Props {
    path: string
}