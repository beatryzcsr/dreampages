import { useState } from 'react'
import borda from '../assets/borda.png'
import logo from '../assets/dreamPages.png'
import fundo from '../assets/fundo.png'

//Guarda as informações necessárias para criar os campos do formulário. name -> nome interno do campo; label -> texto que aparece pro ususário; placeholder -> exemplo que aparece dentro caixa de texto. 

const campos = [
	{ name: 'nome', label: 'Nome do livro', placeholder: 'Ex: Sherlock Holmes' },
	{ name: 'autor', label: 'Autor', placeholder: 'Ex: Arthur Conan Doyle' },
	{ name: 'livraria', label: 'Livraria', placeholder: 'Ex: Leitura' },
	{ name: 'classificacao', label: 'Classificação', type: 'select', options: ['Livre', '10', '12', '14', '16', '18'] },
	{ name: 'quantidade', label: 'Quantidade', placeholder: '1', type: 'number', min: '1' },
	{ name: 'preco', label: 'Preço', placeholder: 'Ex: 70,00', type: 'number', min: '0', step: '0.01' },
	{ name: 'genero', label: 'Gênero', placeholder: 'Ex: Suspense Policial' },
    { name: 'editora', label: 'Editora', placeholder: 'Ex: Sextante' },
]

//como cada elemento aparecerá antes do usuário digitar algo. "" significa que está vazio, 1 signfica que começa a partir do 1
const estadoInicial = {
	nome: '',
	autor: '',
	livraria: '',
	classificacao: '',
	quantidade: '1',
	preco: '',
	genero: '',
    editora: '',
}

//cria um componente Formulário cm props dentro dos {}, as props são informaões que outro componente manda para esse componente.

//onNavigate -> mudar de página
//onSelectBook ->quando o livro é selecionado para edição

function Formulario({ onNavigate, onSelectBook }) {
    //guarda dados que estão sendo armazenados no formulário 
	const [livro, setLivro] = useState(estadoInicial)
	const [livros, setLivros] = useState([])
    //livro-> informação atual
    //setLivro -> modifica os dados atuais
    //[] lista vazia

	const handleChange = (event) => {
		const { name, value } = event.target
		setLivro((livroAtual) => ({ ...livroAtual, [name]: value }))
        //...livroAtual mantém as informações q já estavam preenchidas
        //[name]: value atualiza somente o que acabou de ser alterado
	}
    //handleChange = (event) => {} essa função é executada quando o usuário digita algo

    //ao clicar cadastrar livro
	const handleSubmit = (event) => {
		event.preventDefault()
        //impede o comportamento padrão do formulário de atualizar sozinho

		if (!livro.nome.trim() || !livro.autor.trim()) return
        //verifica se o usuário colocou nome do livro, autor. Trim remove espaços desnecessários. Se algum dos campos não estiver concluído, a consição n é feita.

		setLivros((livrosAtuais) => [...livrosAtuais, { ...livro }])
        //...livrosAtuais mantém livros antigos
        //...livro adiciona novo
        //adciona novo livro na lista

		setLivro({ ...estadoInicial })
        //limpa o formulário e volta para os valores iniciais.
	}

	const handleEdit = (index) => {
        //recebe a posição do livro na lista
		onSelectBook?.(livros[index])
	}//Pega o livro escolhido e só executa se onSelectBook existir.

	const handleDelete = (index) => {
		const livroParaExcluir = livros[index]
		const confirmou = window.confirm(`Excluir o livro "${livroParaExcluir.nome}"?`)

		if (!confirmou) return

		setLivros((livrosAtuais) => livrosAtuais.filter((_, livroIndex) => livroIndex !== index))

	}//Função responsável por excluir livros. Depois cria uma nova lista sem o livro escolhido.

	const tituloLivro = livro.nome.trim() || 'Seu livro aparecerá aqui'
    //se o usuário digitou um nome, mostrará onde está escrito "Seu livro aparecerá aqui", se não a frase permanecerá.
	const autorLivro = livro.autor.trim() || 'Preencha o autor'
    //mesma lógica
	const quantidade = Number(livro.quantidade) || 0
    //mesma lógica
	const preco = Number(livro.preco) || 0
    //mesma lógica
	const total = preco * quantidade
    //mesma lógica
	const formatarMoeda = (valor) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })//mesma lógica

	return (
		<main
			className="min-h-dvh bg-cover bg-center bg-fixed px-3 py-5 text-[#E7E2C2] sm:px-6 sm:py-8 lg:px-10"
			style={{ backgroundImage: `url(${fundo})` }}
		>
			<section className="mx-auto max-w-6xl overflow-hidden rounded-[1.5rem] border border-[#C9A04A]/60 bg-[#051A50]/95 shadow-2xl shadow-black/50">
				<header className="border-b border-[#C9A04A]/50 px-5 py-5 text-center sm:px-10 sm:py-7">
					<img src={logo} alt="DreamPages" className="mx-auto mb-3 h-auto w-32 sm:w-40" />
					<p className="font-slabo text-xs uppercase tracking-[0.28em] text-[#E7E2C2] sm:text-sm">
						Biblioteca DreamPages
					</p>
					<h1 className="font-island mt-2 text-5xl leading-none text-[#E7E2C2] sm:text-7xl">
						Cadastro de livros
					</h1>
				</header>

				<div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:gap-12 lg:p-12">
					<form className="font-slabo" onSubmit={handleSubmit}>
						<div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
							{campos.map((campo) => (
								<label key={campo.name} className="block">
									<span className="mb-2 block text-xs uppercase tracking-[0.14em] text-[#E7E2C2]/85">
										{campo.label}
									</span>
									{campo.type === 'select' ? (
										<select
											className="w-full border-b border-[#C9A04A] bg-[#071331]/80 px-3 py-2 text-sm text-[#E7E2C2] outline-none transition focus:border-[#F4D36D] focus:bg-[#0a1d49] focus:ring-1 focus:ring-[#F4D36D]"
											name={campo.name}
											value={livro[campo.name]}
											onChange={handleChange}
										>
											<option value="" className="bg-[#071331]">Selecione</option>
											{campo.options.map((option) => (
												<option key={option} value={option} className="bg-[#071331]">
													{option === 'Livre' ? option : `${option} anos`}
												</option>
											))}
										</select>
									) : (
										<input
											className="w-full border-b border-[#C9A04A] bg-[#071331]/80 px-3 py-2 text-sm text-[#E7E2C2] outline-none transition placeholder:text-[#E7E2C2]/45 focus:border-[#F4D36D] focus:bg-[#0a1d49] focus:ring-1 focus:ring-[#F4D36D]"
											type={campo.type || 'text'}
											min={campo.min}
											step={campo.step}
											name={campo.name}
											value={livro[campo.name]}
											onChange={handleChange}
											placeholder={campo.placeholder}
											required={['nome', 'autor', 'preco'].includes(campo.name)}
										/>
									)}
								</label>
							))}
						</div>

					<div className="mt-8 flex grid place-items-center gap-3">
					<button type="submit" className="rounded-full border border-[#f4d36a] bg-gradient-to-r from-[#9a6518] to-[#ffe477] px-10 py-3 font-serif font-bold text-[#1b1209] hover:brightness-110">Cadastrar Livro</button>

					</div>
					</form>

{/* Ela mostra:

livro;
autor;
quantidade;
preço;
frete;
total. */}

					<aside className="relative min-h-[24rem] overflow-hidden border border-[#C9A04A]/80 bg-[#F4E8CC] p-6 text-[#17213D] shadow-xl sm:min-h-[26rem] sm:p-7">
						<img src={borda} alt="" aria-hidden="true" className="pointer-events-none absolute left-2 top-2 z-0 h-14 w-14 object-contain" />
						<img src={borda} alt="" aria-hidden="true" className="pointer-events-none absolute right-2 top-2 z-0 h-14 w-14 rotate-90 object-contain" />
						<img src={borda} alt="" aria-hidden="true" className="pointer-events-none absolute bottom-2 left-2 z-0 h-14 w-14 -rotate-90 object-contain" />
						<img src={borda} alt="" aria-hidden="true" className="pointer-events-none absolute bottom-2 right-2 z-0 h-14 w-14 rotate-180 object-contain" />

						<div className="relative z-10 flex h-full min-h-[21rem] flex-col sm:min-h-[23rem]">
							<h2 className="font-serif text-center text-lg font-bold uppercase tracking-wide sm:text-xl">
								Resumo do pedido
							</h2>

							<section className="mt-6">
								<h3 className="font-serif text-lg font-bold uppercase">Itens:</h3>
								<div className="font-serif mt-4 flex items-start justify-between gap-3 text-sm">
									<div>
										<p>{quantidade}x {tituloLivro}</p>
										<p className="font-serif mt-1 text-sm text-[#17213D]/75">{autorLivro}</p>
									</div>
									<strong className="whitespace-nowrap text-base font-serif">{formatarMoeda(preco)}</strong>
								</div>
							</section>

							<section className="mt-6">
								<h3 className="font-serif text-lg font-bold uppercase">Frete:</h3>
								<p className="font-serif mt-3 text-xs">Grátis - Real Express</p>
							</section>

							<div className="mt-auto border-t border-[#B48B3C]/70 pt-5">
								<div className="flex items-center justify-between gap-4 font-serif text-lg font-bold uppercase">
									<span>Total:</span>
									<span className="font-normal">{formatarMoeda(total)}</span>
								</div>
							</div>
						</div>
					</aside>
				</div>

				{livros.length > 0 && (
					<section className="border-t border-[#C9A04A]/50 px-5 py-6 sm:px-8">
						<h2 className="font-island mb-4 text-4xl text-[#E7E2C2]">Listagem</h2>
						<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
							{livros.map((item, index) => (
								<article key={`${item.nome}-${index}`} className="border border-[#C9A04A]/60 bg-[#071331]/80 p-4 font-slabo">
									<h3 className="font-bold text-[#E7E2C2]">{item.nome}</h3>
									<p className="mt-1 text-sm text-[#E7E2C2]/75">{item.autor}</p>
									<p className="mt-3 text-xs text-[#C9A04A]">
										{item.categoria || 'Sem categoria'} · {item.quantidade} unidade(s) · {formatarMoeda(Number(item.preco) || 0)}
									</p>
									<div className="mt-4 flex gap-2">
										<button
											type="button"
											onClick={() => handleEdit(index)}
											className="flex-1 rounded border border-[#C9A04A] px-3 py-2 text-xs font-bold text-[#E7E2C2] transition hover:bg-[#172b5c] focus:outline-none focus:ring-2 focus:ring-[#F4D36D]"
										>
											Editar
										</button>
                                        {/* chama handleEdit() passando a posição daquele livro. */}
										<button
											type="button"
											onClick={() => handleDelete(index)}
											className="flex-1 rounded border border-red-300/70 px-3 py-2 text-xs font-bold text-red-200 transition hover:bg-red-950/60 focus:outline-none focus:ring-2 focus:ring-red-300"
										>
											Excluir
										</button>
                                        {/* chama handleDelete() com a posição do livro. */}
									</div>
								</article>
							))}
						</div>
					</section>
				)}
			</section>
		</main>
	)
}

export default Formulario
