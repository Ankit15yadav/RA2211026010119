import Link from 'next/link';

const NavBar: React.FC = () => {
    return (
        <nav className="bg-gray-800 p-4">
            {/* Horizontal navigation with Tailwind spacing */}
            <ul className="flex space-x-4 text-white">
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/top-users">Top Users</Link>
                </li>
                <li>
                    <Link href="/trending-posts">Trending Posts</Link>
                </li>
                <li>
                    <Link href="/feed">Feed</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;