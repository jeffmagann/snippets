'use client';

import { createSnippet } from '@/actions';
// import { db } from '@/db';
// import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';
import { useFormState } from 'react-dom';

//*************************************************/
//***************    SnippetCreatePage            **************/
const SnippetCreatePage = () => {
    //"action" is the "createSnippet" function we passed in with stuff added
    const [formState, action] = useFormState(createSnippet, { message: '' });

    console.log('formState = ', formState);

    return (
        <form action={action} className='max-w-lg my-10'>
            <h3 className='font-bold m-3'>Create a Snippet</h3>
            <div className='flex flex-col gap-4'>
                {/* Title Input */}
                <div className='flex gap-4'>
                    <label className='w-12' htmlFor='title'>
                        Title
                    </label>
                    <input type='text' name='title' id='title' className='border rounded w-full' />
                </div>

                {/* Code Input */}
                <div className='flex gap-4'>
                    <label className='w-12' htmlFor='code'>
                        Code
                    </label>
                    <textarea name='code' id='code' className='border rounded w-full' />
                </div>

                {formState && formState.message ? (
                    <div className='my-2 p-2 bg-red-200 border border-red-400 rounded-sm'>{formState.message}</div>
                ) : (
                    ''
                )}

                <button type='submit' className='  rounded p-2 bg-blue-200'>
                    Create Snippet
                </button>
            </div>
        </form>
    );
};

export default SnippetCreatePage;
