import Link from 'next/link';
import DropComponent from './_components/component';
export default function Drop() {
    return (
        <main className="flex gap-8 justify-center">
            <Link href="/">
            <p>Voltar</p>
            </Link>
            <article>
                <DropComponent />
            </article>
        </main>
    );
}   