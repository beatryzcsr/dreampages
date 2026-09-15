import logo from '../assets/dreamPages.png'

const navigationItems = [
	{ label: 'Home', page: 'home' },
	{ label: 'Dashboard', page: 'dashboard' },
	{ label: 'Estante', page: 'listagem' },
	{ label: 'Cadastro', page: 'formulario' },
	{ label: 'Login', page: 'login' },
]

const leftNavigationItems = navigationItems.slice(0, 3)
const rightNavigationItems = navigationItems.slice(3)

function Header({ onNavigate }) {
	const handleNavigation = (event, page) => {
		event.preventDefault()
		onNavigate?.(page)
	}

	return (
		<header className="relative z-10 flex min-h-[132px] items-end justify-center overflow-hidden bg-[#250003] px-2 pb-10 pt-16 sm:min-h-[154px] sm:pb-11 sm:px-4">
			<nav
				aria-label="Navegação principal"
				className="grid w-full max-w-[790px] grid-cols-[minmax(0,1fr)_clamp(150px,28vw,245px)_minmax(0,1fr)] items-center bg-[#8d0010] px-1 py-1 sm:px-2"
			>
				<div className="flex min-w-0 items-center justify-end gap-0.5 sm:gap-1">
					{leftNavigationItems.map(({ label, page }) => (
						<a key={page} href={`#${page}`} onClick={(event) => handleNavigation(event, page)} className="whitespace-nowrap px-1.5 py-1 text-[9px] font-serif uppercase text-[#f9e9c5] transition-colors hover:bg-[#b52c3a] hover:text-white sm:px-3 sm:text-xs">
							{label}
						</a>
					))}
				</div>

				<div aria-hidden="true" />

				<div className="flex min-w-0 items-center justify-start gap-0.5 sm:gap-1">
					{rightNavigationItems.map(({ label, page }) => (
						<a key={page} href={`#${page}`} onClick={(event) => handleNavigation(event, page)} className={`whitespace-nowrap px-1.5 py-1 text-[9px] font-serif uppercase text-[#f9e9c5] transition-colors hover:bg-[#b52c3a] hover:text-white sm:px-3 sm:text-xs ${page === 'login' ? 'rounded-md bg-[#ad3040]' : ''}`}>
							{label}
						</a>
					))}
				</div>
			</nav>

			<a
				href="#home"
				onClick={(event) => handleNavigation(event, 'home')}
				aria-label="Ir para Home"
				className="absolute left-1/2 top-1 -translate-x-1/2 transition-transform hover:scale-[1.03]"
			>
				<img src={logo} alt="DreamPages Biblioteca" className="h-auto w-40 sm:w-52" />
			</a>
		</header>
	)
}

export default Header
