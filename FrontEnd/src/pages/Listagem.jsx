import { useEffect, useState } from 'react'
import fundo from '../assets/fundo.png'
import { authFetch } from '../api.js'

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
		<main className="min-h-dvh bg-[#170307] text-[#f8e8c8]">
			<section className="min-h-[calc(100dvh-154px)] bg-cover bg-center px-5 py-12 sm:px-10 lg:px-14" style={{ backgroundImage: `linear-gradient(rgba(67, 0, 9, .28), rgba(67, 0, 9, .28)), url(${fundo})` }}>
				<div className="mx-auto max-w-7xl">
					<header className="mb-12 text-center">
						<h1 className="font-serif text-5xl tracking-[.06em] text-[#fff1d0] sm:text-7xl lg:text-8xl">Mais Vendidos</h1>
						<div className="mx-auto mt-5 h-px max-w-2xl bg-[#e1bc79]/75" />
					</header>
					{loading && <p className="py-20 text-center font-serif text-xl">Abrindo a estante...</p>}
					{!loading && erro && <p className="mx-auto max-w-2xl border border-[#d5aa67] bg-[#26050b]/90 px-6 py-10 text-center font-serif text-xl">Não foi possível carregar os livros.<span className="mt-2 block text-sm text-[#e8c98a]">{erro}. Verifique se o backend e o PostgreSQL estão funcionando.</span></p>}
					{!loading && !erro && livros.length === 0 && <p className="border border-[#d5aa67] bg-[#26050b]/90 px-6 py-16 text-center font-serif text-xl">Nenhum livro encontrado.</p>}
					{!loading && !erro && <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-5 lg:gap-x-10 lg:gap-y-14">
						{livros.map((book) => (
							<button key={book.idlivro ?? book.idLivro ?? book.id} type="button" onClick={() => openBook(book)} aria-label={`Abrir detalhes de ${book.titulo}`} className="group mx-auto flex w-full max-w-[12rem] flex-col items-center text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffe29a] focus-visible:ring-offset-4 focus-visible:ring-offset-[#4c0710]">
								<span className="flex aspect-[2/3] w-full items-center justify-center overflow-hidden bg-[#180205]/75 shadow-[0_10px_20px_rgba(0,0,0,.45)] transition duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_18px_26px_rgba(0,0,0,.6)]">
									<img src={imageOf(book)} alt={`Capa de ${book.titulo}`} className="h-full w-full object-cover" />
								</span>
								<span className="mt-3 line-clamp-2 min-h-12 w-full font-serif text-lg leading-tight text-[#fff1d0] transition group-hover:text-[#ffe29a]">{book.titulo || 'Livro sem título'}</span>
							</button>
						))}
					</div>}
				</div>
			</section>
		</main>
	)
}

export default Listagem
