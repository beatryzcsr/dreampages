import fundoHome from '../assets/fundoHome.png'
import livroHome from '../assets/livroHome.png'
import borda from '../assets/borda.png'

function Home({ onNavigate }) {
	return (
		<main className="min-h-dvh bg-[#1f0306] text-[#f7e6c1]">
			<section className="flex min-h-[78dvh] items-center bg-cover bg-center px-6 py-16 sm:px-12 lg:px-24" style={{ backgroundImage: `linear-gradient(90deg, rgba(18, 2, 4, .86), rgba(18, 2, 4, .2)), url(${fundoHome})` }}>
				<div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1.15fr_.85fr]">
					<div>
						<h1 className="font-serif text-5xl leading-[.8] text-[#f6dfb0] sm:text-7xl lg:text-8xl">DREAMPAGES</h1>
						<p className="mt-8 max-w-xl font-serif text-xl leading-relaxed text-[#f8ebd0] sm:text-2xl">Onde cada página guarda um encanto e cada história encontra um novo lar.</p>
					</div>
					<button type="button" onClick={() => onNavigate?.('listagem')} className="group mx-auto max-w-xs text-left">
						
					</button>
				</div>
			</section>
			<section className="border-t border-[#8d5d38] bg-[#6f020d] px-6 py-14 sm:px-12">
				<div className="relative mx-auto grid max-w-6xl items-center gap-8 overflow-hidden border border-[#d5bb83] px-6 py-12 sm:px-12 md:grid-cols-[.75fr_1.25fr] md:gap-4 lg:px-16">
					<img src={borda} alt="" aria-hidden="true" className="absolute left-0 top-0 h-24 w-24" />
					<img src={borda} alt="" aria-hidden="true" className="absolute right-0 top-0 h-24 w-24 -scale-x-100" />
					<img src={borda} alt="" aria-hidden="true" className="absolute bottom-0 left-0 h-24 w-24 -scale-y-100" />
					<img src={borda} alt="" aria-hidden="true" className="absolute bottom-0 right-0 h-24 w-24 -scale-x-100 -scale-y-100" />
					<img src={livroHome} alt="Livro aberto" className="relative mx-auto w-full max-w-sm object-contain md:-ml-8" />
					<div className="relative text-center font-serif text-base leading-7 text-[#f9e8c1] sm:text-lg sm:leading-8">
						<h2 className="font-serif text-3xl uppercase text-[#e6d09e] sm:text-4xl">Sobre nós</h2>
						<hr className="mx-auto my-3 w-64 border-t border-[#e6d09e]" />
						<p>A DreamPages nasceu para transformar a leitura em uma experiência encantadora. Somos uma biblioteca feita para quem acredita que cada livro guarda um universo próprio, cheio de descobertas, emoções e histórias esperando para serem encontradas. Aqui, reunimos livros, leitores e mundos diferentes em um só lugar — porque, às vezes, basta abrir uma página para encontrar uma nova aventura.
</p>
					</div>
				</div>
			</section>
		</main>
	)
}

export default Home
