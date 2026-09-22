import { useEffect, useState } from 'react'
import estante from '../assets/estante.png'
import { authFetch } from '../api.js'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const imageOf = (book) => book.imagem || book.image || book.capa

function Listagem({ livros: initialBooks, onNavigate, onSelectBook, endpoint = '/livros' }) {
	const [livros, setLivros] = useState(initialBooks || [])
	const [loading, setLoading] = useState(!initialBooks)
	const [erro, setErro] = useState('')

	useEffect(() => {
		if (initialBooks) return
		authFetch(endpoint).then((response) => (response.ok ? response.json() : Promise.reject(new Error('Falha ao carregar livros')))).then(setLivros).catch(() => setLivros([])).finally(() => setLoading(false))
	}, [endpoint, initialBooks])

	const openBook = (book) => { onSelectBook?.(book); onNavigate?.('detalhes', book.idlivro ?? book.idLivro ?? book.id) }

	return (
		<main className="min-h-dvh bg-[#24100a] text-[#f8e8c8]">
			<section className="relative min-h-[calc(100dvh-154px)] overflow-hidden bg-[length:100%_100%] bg-center bg-no-repeat px-5 py-16 sm:px-10" style={{ backgroundImage: `linear-gradient(rgba(22, 8, 5, .12), rgba(22, 8, 5, .12)), url(${estante})` }}>
				<div className="relative mx-auto h-full max-w-6xl">
					{loading && <p className="py-20 text-center font-serif text-xl">Abrindo a estante...</p>}
					{!loading && erro && <p className="mx-auto max-w-2xl bg-[#2b120b]/90 px-6 py-10 text-center font-serif text-xl">Não foi possível carregar os livros.<span className="mt-2 block text-sm text-[#e8c98a]">{erro}. Verifique se o backend e o PostgreSQL estão funcionando.</span></p>}
					{!loading && !erro && livros.length === 0 && <p className="bg-[#2b120b]/90 px-6 py-16 text-center font-serif text-xl">Nenhum livro encontrado.</p>}
					{!loading && !erro && <div className="grid grid-cols-2 gap-x-8 gap-y-10 pt-20 sm:grid-cols-3 md:grid-cols-5 md:grid-rows-5 md:gap-x-14 md:gap-y-3 md:pt-24 md:pb-20 lg:gap-x-20">
						{livros.map((book) => (
							<button key={book.idlivro ?? book.idLivro ?? book.id} type="button" onClick={() => openBook(book)} aria-label={`Abrir detalhes de ${book.titulo}`} className="group mx-auto flex h-24 w-16 items-end justify-center md:h-24 md:w-20 lg:w-24">
								<img src={imageOf(book)} alt={`Capa de ${book.titulo}`} className="h-full w-full object-cover shadow-xl transition duration-300 group-hover:scale-105" />
							</button>
						))}
					</div>}
				</div>
			</section>
		</main>
	)
}

export default Listagem
