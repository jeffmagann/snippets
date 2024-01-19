import { db } from '@/db';
//import Image from 'next/image';
import Link from 'next/link';

// JEFF_TEMP
export const revalidate = 10;

export default async function HomePage() {
    const snippets = await db.snippet.findMany({});

    return (
        <div>
            <h1 className='text-3xl my-6'>Home Page</h1>
            <div className='flex items-center space-x-20 mt-6 max-w-lg'>
                <div className='flex justify-between w-full mb-8'>
                    <h2 className='text-2xl text-blue-800'>Snippets</h2>
                    <Link
                        href='/snippets/new'
                        className='bg-blue-200 px-4 py-1 rounded-md shadow-md shadow-gray-500
                                active:translate-y-1 active:shadow-none'
                    >
                        Create Page!
                    </Link>
                </div>
            </div>
            <div>
                {snippets.map((snippet, index: number) => {
                    const line = `${index}: ID = ${snippet.id}  Title = ${snippet.title},  Code = ${snippet.code}`;
                    return (
                        <Link
                            href={`/snippets/${snippet.id}`}
                            key={snippet.id}
                            className='flex justify-between p-4 border-2 rounded-md shadow-lg max-w-lg mb-2 items-center'
                        >
                            <div className=''>{snippet.title}</div>
                            <div
                                className='bg-blue-300 px-4 py-1 rounded-md shadow-md shadow-gray-500
                                active:translate-y-1 active:shadow-none
                            '
                            >
                                View
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
