import { notFound } from 'next/navigation';
import { SnippetsShowPageProps } from '../page';
import { db } from '@/db';
import SnippetEditForm from '@/components/snippet-edit-form';

//************   generateStaticParams   ********************/
// JEF_TEMP
// export async function generateStaticParams() {
//     const snippets = await db.snippet.findMany();
//     const retSnippets = snippets.map((snippet) => ({ snippet }));
//     return retSnippets;
// }

const SnippetEditPage = async ({ params }: SnippetsShowPageProps) => {
    console.log('[SnippetEditPage entered]');
    if (!Number.isInteger(+params.slug)) {
        notFound();
    }

    const id = +params.slug;

    const snippet = await db.snippet.findFirst({ where: { id: id } });
    console.log('In Edit page : ', snippet);

    if (!snippet) {
        notFound();
    }

    return (
        <div>
            <h1 className='my-5'>Title: {snippet.title}</h1>
            <SnippetEditForm snippet={snippet} />
        </div>
    );
};

export default SnippetEditPage;
