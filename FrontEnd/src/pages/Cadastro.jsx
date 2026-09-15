import logo from '../assets/dreamPages.png'
import belaFera from '../assets/belaEFera.png'

function Cadastro({ email, setEmail, senha, setSenha, onNavigate, onSubmit }) {
  return (
    <div className="flex min-h-dvh text-white lg:h-dvh lg:min-h-0 lg:overflow-hidden" style={{ backgroundColor: '#6F020D' }}>
      <div className="relative hidden overflow-hidden bg-stone-900 lg:block lg:h-full lg:w-1/2">
        <img src={belaFera} alt="Beauty and the Beast" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />
      </div>

      <div className="flex min-h-dvh w-full items-center justify-center overflow-y-auto px-5 py-8 sm:px-10 sm:py-10 lg:h-full lg:min-h-0 lg:w-1/2 lg:px-16 lg:py-6">
        <div className="w-full max-w-md">
          <img src={logo} alt="DreamPages" className="mx-auto mb-6 h-auto w-36 object-contain sm:w-40" />
          <h1 className="font-island mb-6 text-center text-6xl leading-none tracking-tight text-[#E7E2C2] sm:text-7xl">Cadastro</h1>

          <form className="space-y-4" onSubmit={onSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-slabo font-medium text-[#E7E2C2]">Email</span>
            <input
              className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Digite seu e-mail"
            />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-slabo font-medium text-[#E7E2C2]">Senha</span>
            <input
              className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
              type="password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              placeholder="Crie uma senha"
            />
            </label>

            <button type="submit" className="w-full rounded-lg px-4 py-3 font-island text-4xl text-[#051A50]  transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"style={{ backgroundColor: '#E7E2C2' }}>
              Criar
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/90">
            Já tem uma conta?{' '}
            <button type="button" className="font-semibold text-rose-600 transition hover:text-rose-700" onClick={() => onNavigate('login')}>
              Entre
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Cadastro