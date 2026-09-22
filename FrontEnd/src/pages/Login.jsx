import logo from '../assets/dreamPages.png'
import belaFera from '../assets/belaEFera.png'

function Login({ email, setEmail, senha, setSenha, onNavigate, onSubmit, mensagem, carregando }) 
// O componente recebe informações através das props.
//setSenha; Função para alterar a senha. ; onNavigate ; Muda de página ; onSubmit ; Executa a ação de login.
{
  return (
    <div className="flex min-h-dvh text-white lg:h-dvh lg:min-h-0 lg:overflow-hidden" style={{ backgroundColor: '#6F020D' }}>
      <div className="relative hidden overflow-hidden bg-stone-900 lg:block lg:h-full lg:w-1/2">
        <img src={belaFera} alt="Beauty and the Beast" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" /> 
        {/* Cria uma camada de degradê por cima da imagem. */}
      </div>


      <div className="flex min-h-dvh w-full items-center justify-center overflow-y-auto px-5 py-8 sm:px-10 sm:py-10 lg:h-full lg:min-h-0 lg:w-1/2 lg:px-16 lg:py-6">
        <div className="w-full max-w-md">
          <img src={logo} alt="DreamPages" className="mx-auto mb-6 h-auto w-36 object-contain sm:w-40" />
          <h1 className="font-island mb-6 text-center text-6xl leading-none tracking-tight text-[#E7E2C2] sm:text-7xl">Login</h1>

{/* Email */}

          <form className="space-y-4" onSubmit={onSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-slabo font-medium text-[#E7E2C2]">Email</span>
            <input
              className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            //   guarda esse valor
              placeholder="Digite seu e-mail"
            />
{/* type="email" → campo para email.
value={email} → mostra o email atual.
onChange → quando digitar, atualiza o email. */}

            </label>

            {mensagem && <p className="text-center text-sm font-medium text-rose-200" role="alert">{mensagem}</p>}

            <label className="block">
              <span className="mb-2 block text-sm font-slabo font-medium text-[#E7E2C2]">Senha</span>
            <input
              className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
              type="password"
              //faz com que a senha fique oculta
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              placeholder="Digite sua senha"
            />
            </label>

            <button type="button" className="text-sm font-slabo font-medium text-[#E7E2C2] transition hover:text-rose-700" onClick={() => onNavigate('recuperar')}>
              Esqueci a senha?
            </button>
            {/* vá para a página chamada recuperar. */}

            <button type="submit" disabled={carregando}
            className="w-full rounded-lg px-4 py-3 font-island mb-6 text-center text-4xl text-[#051A50] transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:[#051A50] focus:ring-offset-2" style={{ backgroundColor: '#E7E2C2' }}>
              {carregando ? 'Entrando...' : 'Login'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/90">
            Não tem uma conta?{' '}
            <button type="button" className="font-semibold text-rose-600 transition hover:text-rose-700" onClick={() => onNavigate('cadastro')}>
              Cadastre-se
            </button>
            {/* Vai para a tela de cadastro */}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login



