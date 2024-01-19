'use client';

import { Editor } from '@monaco-editor/react';
import type { snippet } from '@prisma/client';
import { FormEvent, useState } from 'react';
import { editSnippet } from '@/actions';
import { db } from '@/db';
import { redirect } from 'next/navigation';

// interface SnippetEditFormProps {
//     snippet: {
//         id: number;
//         title: string;
//         code: string;
//     };
// }

interface SnippetEditFormProps {
    snippet: snippet; //Prisma defines types for each table
}

//*************************************************/
//***************    SnippetEditForm            **************/
const SnippetEditForm = ({ snippet }: SnippetEditFormProps) => {
    //
    const [code, setCode] = useState(snippet.code);

    const handleEditorChange = (value: string = '') => {
        setCode(value);
    };

    const saveSnippet = async (event: FormEvent) => {
        event.preventDefault();
        const returnSnippet = await editSnippet({ ...snippet, code: code });
        //setCode(returnSnippet.code);
        //redirect(`/snippets/${snippet.id}`);
    };

    return (
        <div>
            <form onSubmit={saveSnippet}>
                <Editor
                    height='40vh'
                    theme='vs-dark'
                    language='javascript'
                    defaultValue={snippet.code}
                    options={{ minimap: { enabled: false } }}
                    onChange={handleEditorChange}
                />
                <button type='submit' className='bg-blue-300 shadow-xl px-6 py-2 mt-5 rounded-lg hover:bg-blue-400 '>
                    Save Snippet
                </button>
            </form>
        </div>
    );
};

export default SnippetEditForm;
