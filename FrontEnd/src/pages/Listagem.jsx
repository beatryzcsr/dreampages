import { useEffect, useState } from 'react'
import estante from '../assets/estante.png'

const imageOf = (book) => book.imagem || book.image || book.capa

function Listagem({ livros: initialBooks, onNavigate, onSelectBook, endpoint = '/api/livros' }) {
	const [livros, setLivros] = useState(initialBooks || [])
	const [loading, setLoading] = useState(!initialBooks)

	useEffect(() => {
		if (initialBooks) return
		fetch(endpoint).then((response) => (response.ok ? response.json() : Promise.reject(new Error('Falha ao carregar livros')))).then(setLivros).catch(() => setLivros([])).finally(() => setLoading(false))
	}, [endpoint, initialBooks])

	const openBook = (book) => { onSelectBook?.(book); onNavigate?.('detalhes', book.idLivro ?? book.id) }

	return (
		<main className="min-h-dvh bg-[#24100a] text-[#f8e8c8]">
			<section className="relative min-h-[82dvh] overflow-hidden bg-cover bg-center px-5 py-16 sm:px-10" style={{ backgroundImage: `url(${estante})` }}>
				<div className="absolute inset-0 bg-[#160805]/20" />
				<div className="relative mx-auto max-w-6xl">
					{loading && <p className="py-20 text-center font-serif text-xl">Abrindo a estante...</p>}
					{!loading && livros.length === 0 && <p className="bg-[#2b120b]/90 px-6 py-16 text-center font-serif text-xl">Nenhum livro encontrado.</p>}
					<div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">{livros.map((book) => <button key={book.idLivro ?? book.id} type="button" onClick={() => openBook(book)} className="group text-left"><div className="aspect-[2/3] overflow-hidden border border-[#c18b44] bg-[#160805] shadow-xl"><img src={imageOf(book)} alt={`Capa de ${book.titulo}`} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" /></div><h2 className="mt-3 line-clamp-2 font-serif text-sm text-[#ffe6b4] group-hover:text-white">{book.titulo}</h2></button>)}</div>
				</div>
			</section>
		</main>
	)
}

export default Listagem
