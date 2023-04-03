import { Card } from "flowbite-react"

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
    return (
        <Card >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Contact Us
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                For any questions, please send us a message
            </p>
            {/* <form> */}
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        First Name
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" />
                    <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        Last Name
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" />
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Email (*required)
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />

                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Subject
                    </label>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />

                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Message
                    </label>
                    <textarea class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="Leave your message here..." />
                    <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                </div>
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