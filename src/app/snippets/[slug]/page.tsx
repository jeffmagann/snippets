import { deleteSnippet } from '@/actions';
import { db } from '@/db';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

export interface SnippetsShowPageProps {
    params: {
        slug: string;
    };
}

//************   generateStaticParams   ********************/
export async function generateStaticParams() {
    const snippets = await db.snippet.findMany();
    const retSnippets = snippets.map((snippet) => ({ slug: snippet.id.toString() }));
    return retSnippets;
}

//*************************************************/
//***************    SnippetsShowPage            **************/
const SnippetsShowPage = async ({ params }: SnippetsShowPageProps) => {
    const id = params.slug;

    //await new Promise((r) => setTimeout(r, 2000));

    if (!Number.isInteger(+id)) {
        notFound();
    }

    const snippet = await db.snippet.findFirst({ where: { id: parseInt(id) } });

    if (snippet == null) {
        notFound();
    }

    //************   handleDeleteSnippet   ********************/
    const handleDeleteSnippet = deleteSnippet.bind(null, parseInt(id));

    return (
        <div className='max-w-lg'>
            <div className='flex m-4 justify-between items-center mt-10  '>
                <h1 className='text-xl fond-bold'>{snippet.title}</h1>
                <div className='flex gap-4'>
                    <Link href={`${id}/edit`} className='p-2 border rounded bg-blue-300 px-4 py-1'>
                        Edit
                    </Link>

                    <form action={handleDeleteSnippet}>
                        <button className='p-2 border rounded bg-blue-300 px-4 py-1'>Delete</button>
                    </form>
                </div>
            </div>
            <pre className='p-3 border rounded bg-gray-200 border-gray-200'>
                <code>{snippet.code}</code>
            </pre>
        </div>
    );
};

export default SnippetsShowPage;
