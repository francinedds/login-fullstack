import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/signup'); // Redireciona imediatamente do lado do servidor (estava usando useEffect antes, causou erro).
}
