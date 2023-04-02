import { Footer } from "flowbite-react"
import { BsPinterest, BsFacebook, BsInstagram } from "react-icons/bs"

export default function FooterApp() {
    const siteTree = [
        {
            "title": "home",
            "link": "/"
        },
        {
            "title": "shop collection",
            "link": "/"
        },
        {
            "title": "our story",
            "link": "/"
        },
        {
            "title": "contact",
            "link": "/"
        },
    ]

    const helpCenter = [
        {
            "title": "shipping & returns",
            "link": "/"
        },
        {
            "title": "store policy",
            "link": "/"
        },
        {
            "title": "payment methods",
            "link": "/"
        },
        {
            "title": "FAQ",
            "link": "/"
        },
    ]
    return (
        <Footer bgDark={true}>
            <div className="w-full">
                <div className="grid w-full grid-cols-2 gap-8 py-8 px-6 md:grid-cols-2">
                    <div>
                        <Footer.Title title="Site Tree" />
                        <Footer.LinkGroup col={true}>
                            {
                                siteTree.map(
                                    (site, _) => <Footer.Link href={site.link}>
                                        <span class="capitalize">{site.title}</span>
                                    </Footer.Link>
                                )
                            }
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title="Help Center" />
                        <Footer.LinkGroup col={true}>
                            {
                                helpCenter.map(
                                    (item, _) => <Footer.Link href={item.link}>
                                        <span class="capitalize">{item.title}</span>
                                    </Footer.Link>
                                )
                            }
                        </Footer.LinkGroup>
                    </div>
                </div>
                < MailSubscribeGroup />
                <div className="w-full bg-gray-700 py-6 px-4 sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright
                        href="/"
                        by="Happy Kids"
                        year={2023}
                    />
                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                        <Footer.Icon
                            href="/"
                            icon={BsFacebook}
                        />
                        <Footer.Icon
                            href="/"
                            icon={BsInstagram}
                        />
                        <Footer.Icon
                            href="/"
                            icon={BsPinterest}
                        />
                    </div>
                </div>
            </div>
        </Footer>
    )
}

function MailSubscribeGroup() {
    return (
        <div className="w-full py-6 px-4">
            <div class="pb-3 capitalize">join our mailing list</div>
            <div>
                <span>
                    <div class="relative mb-6">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                        </div>
                        <input type="email" id="input-group-1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john@dee.me" />
                    </div>
                </span>
            </div>
        </div>
    )
}