/* This example requires Tailwind CSS v2.0+ */
import { DownloadIcon, AdjustmentsIcon } from '@heroicons/react/solid'

export default function Results(props) {
    return (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2 mx-2">
            {props.pictures.map((photo) => (
                <li
                    key={photo.id}
                    className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
                >
                    <img className="w-full h-full rounded-t-md object-cover" src={photo.display_url} alt="" />
                    <div>
                        <div className="-mt-px flex divide-x divide-gray-200">
                            <div className="w-0 flex-1 flex">
                                <a
                                    href={photo.download_link}
                                    className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                                >
                                    <DownloadIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                    <span className="ml-3">Download</span>
                                </a>
                            </div>
                            <div className="-ml-px w-0 flex-1 flex">
                                <a
                                    href={photo.links}
                                    className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                                >
                                    <AdjustmentsIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                    <span className="ml-3">Sizes</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}
