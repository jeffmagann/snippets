'use server';

import { db } from '@/db';
import { snippet } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

//************   editSnippet   ********************/
export const editSnippet = async (snippet: snippet) => {
    const returnSnippet = await db.snippet.update({ where: { id: snippet.id }, data: { code: snippet.code } });

    // console.log('Return snip = ', returnSnippet);
    revalidatePath(`/snippets/${snippet.id}`);
    revalidatePath(`/snippets/${snippet.id}/edit`);

    redirect(`/snippets/${snippet.id}`);
    return returnSnippet;
};

//************   deleteSnippet   ********************/
export const deleteSnippet = async (id: number) => {
    //
    const result = await db.snippet.delete({ where: { id } });
    // console.log('Delete result = ', result);
    revalidatePath(`/`);
    redirect('/');
};

//************   createSnippet   ********************/
export const createSnippet = async (formState: { message: string }, formData: FormData) => {
    //export const createSnippet = async (formState: any, formData: FormData) => {
    try {
        const title = formData.get('title');
        const code = formData.get('code');

        // console.log('formState = ', formState);

        if (typeof title !== 'string' || title.length < 3) {
            return {
                message: 'Title must be longer (2 characters)',
            };
        }

        if (typeof code !== 'string' || code.length < 5) {
            return {
                message: 'Code must be longer (5 characters)',
            };
        }

        const snippet = await db.snippet.create({
            data: {
                title: title,
                code: code,
            },
        });

        //revalidatePath(`/`);

        //  throw new Error('Jeff this is an error test');
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log('Error: ', err.message);
            return {
                message: 'Snippet was not created - please try again later. ',
            };
        }

        console.log('Error: ', 'Unknown Error');
        return {
            message: 'Snippet was not created - please try again later',
        };
    }

    revalidatePath('/');
    redirect('/');
    // If you take out the redirect for testing - then need to return the message object
    // return {
    //     message: '',
    // };
};
