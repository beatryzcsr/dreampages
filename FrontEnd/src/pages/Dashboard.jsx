import fundo from '../assets/fundo.png'


function Dashboard() {
    return (
        <main className="min-h-dvh bg-cover bg-center bg-fixed px-3 py-12 text-[#E7E2C2] sm:px-6 sm:py-16 lg:px-10" style={{ backgroundImage: `url(${fundo})` }}>
            <section className="mx-auto max-w-6xl rounded-2xl bg-[#051A50]/95 p-8 text-center shadow-2xl sm:p-14">
                <h1 className="font-island text-6xl text-[#F4D36D] sm:text-8xl">Dashboard</h1>
                <p className="mt-4 font-serif text-lg">Acompanhe e organize sua biblioteca DreamPages.</p>
            </section>
        </main>
    )
}

export default Dashboard