import fundoHome from '../assets/fundoHome.png'
import livroHome from '../assets/livroHome.png'

function Home({ onNavigate }) {
	return (
		<main className="min-h-dvh bg-[#1f0306] text-[#f7e6c1]">
			<section className="flex min-h-[78dvh] items-center bg-cover bg-center px-6 py-16 sm:px-12 lg:px-24" style={{ backgroundImage: `linear-gradient(90deg, rgba(18, 2, 4, .86), rgba(18, 2, 4, .2)), url(${fundoHome})` }}>
				<div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1.15fr_.85fr]">
					<div>
						<p className="mb-4 text-sm uppercase tracking-[.35em] text-[#e6b65c]">Biblioteca DreamPages</p>
						<h1 className="font-island text-7xl leading-[.8] text-[#f6dfb0] sm:text-8xl lg:text-9xl">DreamPages</h1>
						<p className="mt-8 max-w-xl font-serif text-xl leading-relaxed text-[#f8ebd0] sm:text-2xl">Onde cada página guarda um encanto e cada história encontra um novo lar.</p>
						<button type="button" onClick={() => onNavigate?.('listagem')} className="mt-9 border border-[#e6b65c] bg-[#6f020d] px-7 py-3 font-serif text-sm uppercase tracking-[.2em] text-[#ffeab5] transition hover:bg-[#970b1b]">Explorar estante</button>
					</div>
					<button type="button" onClick={() => onNavigate?.('listagem')} className="group mx-auto max-w-xs text-left">
						<img src={livroHome} alt="Livro em destaque" className="w-full shadow-2xl transition duration-500 group-hover:-translate-y-2" />
						<span className="mt-4 block text-center font-serif text-sm uppercase tracking-[.25em] text-[#e6b65c]">Livro em destaque</span>
					</button>
				</div>
			</section>
			<section className="border-t border-[#8d5d38] bg-[#6f020d] px-6 py-14 text-center sm:px-12"><p className="mx-auto max-w-2xl font-serif text-lg leading-8 text-[#f9e8c1]">Uma biblioteca feita para descobrir autores, guardar histórias e manter vivas as páginas que nos transformam.</p></section>
		</main>
	)
}

export default Home
