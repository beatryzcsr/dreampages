import { useEffect, useState } from 'react'
import madeira from '../assets/madeira.png'
import { authFetch } from '../api.js'

const valueOf = (book, key, fallback = 'Não informado') => book?.[key] ?? fallback

function Detalhes({ livro: initialBook, livroId, onNavigate, endpoint = '/livros' }) {
	const [livro, setLivro] = useState(initialBook)
	const [loading, setLoading] = useState(!initialBook)

	useEffect(() => {
		if (initialBook || !livroId) return
		authFetch(`${endpoint}/${livroId}`).then((response) => (response.ok ? response.json() : Promise.reject(new Error('Falha ao carregar livro')))).then(setLivro).finally(() => setLoading(false))
	}, [endpoint, initialBook, livroId])

	if (loading) return <main className="grid min-h-dvh place-items-center bg-[#27120b] text-xl text-[#f8e8c8]">Carregando livro...</main>
	if (!livro) return <main className="grid min-h-dvh place-items-center bg-[#27120b] text-xl text-[#f8e8c8]">Livro não encontrado.</main>

	const rows = [['Categoria', livro.generoNome || livro.genero], ['Livraria', livro.livrariaNome || livro.livraria], ['Autor', livro.autorNome || livro.autor], ['Quantidade', livro.quantidade], ['Classificação', livro.classificacaoNome || livro.classificacao], ['Editora', livro.editora]]

	return (
		<main className="min-h-dvh bg-cover bg-center px-5 py-12 text-[#f8e8c8] sm:px-10" style={{ backgroundImage: `linear-gradient(rgba(34, 10, 5, .28), rgba(34, 10, 5, .28)), url(${madeira})` }}>
			<div className="mx-auto max-w-6xl"><button type="button" onClick={() => onNavigate?.('listagem')} className="mb-7 border border-[#e7c17b] bg-[#280b08]/75 px-5 py-2 text-xs uppercase tracking-[.2em] hover:bg-[#53160e]">Voltar à listagem</button><div className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]"><div className="mx-auto w-full max-w-md bg-black/80 p-5 shadow-2xl"><img src={livro.imagem || livro.image || livro.capa} alt={`Capa de ${livro.titulo}`} className="max-h-[65dvh] w-full object-contain" /></div><article className="rounded-[2rem] border border-[#39599a] bg-[#061c5b]/95 p-7 shadow-2xl sm:p-10"><h1 className="font-serif text-4xl text-[#ffe483] sm:text-5xl">{valueOf(livro, 'titulo')}</h1><p className="mt-5 border-y border-black/80 py-5 font-serif leading-relaxed text-[#f1e6c9]">{valueOf(livro, 'sinopse')}</p><div className="divide-y divide-black/80 font-serif text-[#f5e7c7]">{rows.map(([label, value]) => <p key={label} className="py-3"><span className="text-[#ffe483]">{label}:</span> {value ?? 'Não informado'}</p>)}</div><p className="mt-4 font-serif text-xl text-[#ffe483]">Preço: R$ {Number(livro.preco || 0).toFixed(2).replace('.', ',')}</p><button type="button" onClick={() => onNavigate?.('edicao', livro.idLivro ?? livro.id)} className="mt-6 rounded-xl bg-[#f3ebc7] px-6 py-3 font-serif text-lg text-[#21160e] hover:bg-white">Edite aqui</button></article></div></div>
		</main>
	)
}

export default Detalhes
