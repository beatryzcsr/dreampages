import fundo from '../assets/fundo.png'

function Dashboard {
    return (
        <main
                    className="min-h-dvh bg-cover bg-center bg-fixed px-3 py-5 text-[#E7E2C2] sm:px-6 sm:py-8 lg:px-10"
                    style={{ backgroundImage: `url(${fundo})` }}
                ></main>
    )
}