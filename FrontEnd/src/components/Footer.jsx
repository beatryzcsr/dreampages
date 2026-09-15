import { FaInstagram } from 'react-icons/fa'
import simboloRosa from '../assets/simboloRosa.png'
import { FaWhatsapp } from 'react-icons/fa'

function Footer() {
	return (
		<footer className="w-full border-t border-[#C9A04A]/50 bg-[#230304] px-4 py-6 text-[#E7E2C2] sm:px-6">
			<div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-5 sm:flex-row sm:items-stretch">

                <div className="flex items-center gap-4 font-serif text-3xl">
                    <h1>DreamPages</h1>
				<div className="flex items-center gap-3">
					<img src={simboloRosa} alt="DreamPages" className="h-20 w-30 object-contain" />

				</div>
                </div>

				<div className="flex max-w-full items-center sm:-my-6">

				<div className="mx-3 self-stretch border-l border-[#E7E2C2] sm:mx-4"></div>
				<div className="mx-3 self-stretch border-l border-[#E7E2C2] sm:mx-4"></div>

                <p className="text-center font-slabo text-sm">© 2026 DreamPages. Todos os direitos reservados.</p>
                </div>

                <div className="flex items-center gap-6">
					<FaInstagram /> <FaWhatsapp />
                </div>

			</div>
		</footer>
	)
}

export default Footer


