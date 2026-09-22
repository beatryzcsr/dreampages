import { useEffect, useState } from 'react'
import borda from '../assets/borda.png'
import divisor from '../assets/divisor.png'
import flores from '../assets/rosa.png'
import fundo from '../assets/fundo.png'
import texto from '../assets/texto.png'

const fields = [['titulo', 'Nome do livro'], ['quantidade', 'Quantidade', 'number'], ['preco', 'Preço', 'number'], ['autor', 'Autor'], ['genero', 'Categoria'], ['livraria', 'Livraria'], ['classificacao', 'Classificação'], ['editora', 'Editora']]

function Edição({ livro: initialBook = {}, onNavigate, endpoint = '/api/livros', classificacoesEndpoint = '/classificacoes' }) {
	const [livro, setLivro] = useState(initialBook)
	const [classificacoes, setClassificacoes] = useState([])
	const [status, setStatus] = useState('')

	useEffect(() => {
		fetch(classificacoesEndpoint)
			.then((response) => (response.ok ? response.json() : Promise.reject(new Error('Falha ao carregar classificacoes'))))
			.then(setClassificacoes)
			.catch(() => setClassificacoes([]))
	}, [classificacoesEndpoint])

	const classificacaoId = (valor) => {
		const classificacao = classificacoes.find((item) => item.idClassificacao === Number(valor) || item.id === Number(valor) || item.classificacao === String(valor))
		return classificacao?.idClassificacao ?? classificacao?.id ?? ''
	}
	const update = (key, value) => setLivro((current) => ({ ...current, [key]: value }))
	const submit = async (event) => {
		event.preventDefault(); setStatus('Salvando...')
		try { const id = livro.idLivro ?? livro.id; const dados = { ...livro, classificacao: classificacaoId(livro.classificacao) }; const response = await fetch(id ? `${endpoint}/${id}` : endpoint, { method: id ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dados) }); if (!response.ok) throw new Error('Falha ao salvar'); setStatus('Alterações salvas.'); onNavigate?.('edicao', id) } catch { setStatus('Não foi possível salvar agora.') }
	}

	return (
		<main className="min-h-dvh bg-cover bg-center px-4 py-10 text-[#f5df9a] sm:px-8" style={{ backgroundImage: `url(${fundo})` }}>
			<form onSubmit={submit} className="mx-auto max-w-5xl rounded-[1.5rem] border-2 border-[#b08a3c] bg-[#060d29]/95 p-7 shadow-2xl sm:p-12" style={{ borderImage: `url(${borda}) 28 round` }}>
				<div className="flex items-center justify-center gap-4">
					<img src={flores} alt="" className="h-20 w-20 object-contain" />
					<div className="text-center"><h1 className="font-serif text-3xl uppercase sm:text-4xl">Edição de Livro</h1><p className="mt-1 text-lg font-serif">Biblioteca de Amour</p></div>
					<img src={flores} alt="" className="h-20 w-20 -scale-x-100 object-contain" />
				</div>
				<img src={divisor} alt="" className="mx-auto h-30 w-full object-contain" />
				<div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
					{fields.map(([key, label, type = 'text']) => (
						<label key={key} className="block">
							<span className="mb-2 block font-serif text-sm uppercase">{label}</span>
							{key === 'classificacao' ? (
								<select value={classificacaoId(livro.classificacao)} onChange={(event) => update(key, event.target.value)} className="w-full border-b-2 border-[#b59750] bg-[#060d29] px-3 py-2 font-serif text-[#fff1bd] outline-none">
									<option value="">Selecione</option>
									{classificacoes.map(({ id, label: nome }) => <option key={id} value={id}>{nome}</option>)}
								</select>
							) : (
								<input type={type} step={key === 'preco' ? '0.01' : undefined} value={livro[key] ?? ''} onChange={(event) => update(key, event.target.value)} className="w-full border-b-2 border-[#b59750] bg-transparent px-3 py-2 font-serif text-[#fff1bd] outline-none"/>
							)}
						</label>
					))}
				</div>
				<label className="mt-7 block"><span className="mb-2 block font-serif text-sm uppercase">Sinopse</span><textarea value={livro.sinopse ?? ''} onChange={(event) => update('sinopse', event.target.value)} className="min-h-36 w-full resize-y rounded-3xl border-2 border-[#b59750] bg-[#ffe58a] p-5 font-serif text-[#25170e] outline-none" /></label>
				<div className="mt-8 flex flex-wrap items-center justify-center gap-5">
					<button type="submit" className="rounded-full border border-[#f4d36a] bg-gradient-to-r from-[#9a6518] to-[#ffe477] px-10 py-3 font-serif font-bold text-[#1b1209] hover:brightness-110">Confirmar</button>
					{status && <span className="font-serif text-sm">{status}</span>}
				</div>
			</form>
		</main>
	)
}

export default Edição
