import ContactForm from "../components/contact/formContact"

export default function ContactPage() {
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
            <div class="grid grid-cols-3 my-10">
                {
                    contacts.map((c, _) => <ContentGroup title={c.title} lines={c.lines} />)
                }
            </div>
        </div>
    )
}

function ContentGroup({ title, lines }: ContentGroupProps) {
    return (
        <div>
            <h5 class="text-center text-xl font-bold tracking-tight text-gray-900 dark:text-white capitalize">{title}</h5>
            <div>
                {
                    lines.map((c, _) => <div class="text-center">{c}</div>)
                }
            </div>
        </div>
    )
}



interface ContentGroupProps {
    title: string
    lines: string[]
}
