import { FaInstagram } from 'react-icons/fa'
import simboloRosa from '../assets/simboloRosa.png'
import { FaWhatsapp } from 'react-icons/fa'

function Footer() {
	return (
		<footer className="relative left-1/2 mt-0 flex w-screen -translate-x-1/2 -mb-5 border-t border-[#C9A04A]/50 bg-[#230304] px-6 py-6 text-[#E7E2C2] sm:-mb-8 lg:-mb-8">
			<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row sm:items-stretch">

                <div className="flex g-4 items-center font-serif text-3xl ">
                    <h1>DreamPages</h1>
				<div className="flex items-center gap-3">
					<img src={simboloRosa} alt="DreamPages" className="h-20 w-30 object-contain" />

				</div>
                </div>

				<div className="flex items-center sm:-my-6">

				<div className="mx-4 self-stretch border-l border-[#E7E2C2]"></div>
				<div className="mx-4 self-stretch border-l border-[#E7E2C2]"></div>

                <p className="font-slabo text-sm">© 2026 DreamPages. Todos os direitos reservados.</p>
                </div>

                <div className="flex flex-row gap-6 items-center">
					<FaInstagram /> <FaWhatsapp />
                </div>

			</div>
		</footer>
	)
}

export default Footer


