import Link from 'next/link';

const Header = () => {
    return (
        <div className='flex justify-between items-center max-w-lg mt-0 bg-gray-300 py-2 px-10 '>
            <Link href='/' className='hover:underline hover:underline-offset-4'>
                Home
            </Link>
            <Link href='/snippets/new' className='hover:underline hover:underline-offset-4'>
                Create Snippet
            </Link>
        </div>
    );
};

export default Header;
