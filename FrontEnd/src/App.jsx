import { useState } from 'react'
import Cadastro from './pages/Cadastro.jsx'
import Login from './pages/Login.jsx'
import RecuperarSenha from './pages/RecuperarSenha.jsx'
import Edição from './pages/Edição.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Listagem from './pages/Listagem.jsx'
import Detalhes from './pages/Detalhes.jsx'
import Formulario from './pages/Formulario.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { apiUrl } from './api.js'

function App() {
  const [pagina, setPagina] = useState('login')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [livroSelecionado, setLivroSelecionado] = useState(null)
  const [mensagem, setMensagem] = useState('')
  const [carregando, setCarregando] = useState(false)

  const enviarAutenticacao = async (event, rota, aoSucesso = 'home') => {
    event.preventDefault()
    setMensagem('')
    setCarregando(true)

    try {
      const resposta = await fetch(apiUrl(rota), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      })
      const dados = await resposta.json()
      if (!resposta.ok) throw new Error(dados.mensagem || 'Não foi possível concluir a operação.')

      if (dados.token) localStorage.setItem('token', dados.token)
      setSenha('')
      setMensagem(dados.mensagem || '')
      setPagina(aoSucesso)
    } catch (error) {
      setMensagem(error.message)
    } finally {
      setCarregando(false)
    }
  }

  if (pagina === 'cadastro') {
    return (
      <Cadastro
        email={email}
        setEmail={setEmail}
        senha={senha}
        setSenha={setSenha}
        onNavigate={setPagina}
        onSubmit={(event) => enviarAutenticacao(event, '/auth/register')}
        mensagem={mensagem}
        carregando={carregando}
      />
    )
  }

  if (pagina === 'recuperar') {
    return (
      <RecuperarSenha
        email={email}
        setEmail={setEmail}
        senha={senha}
        setSenha={setSenha}
        onNavigate={setPagina}
        onSubmit={(event) => enviarAutenticacao(event, '/auth/recover', 'login')}
        mensagem={mensagem}
        carregando={carregando}
      />
    )
  }

  if (pagina === 'home' || pagina === 'dashboard' || pagina === 'listagem' || pagina === 'detalhes' || pagina === 'edicao' || pagina === 'formulario') {
    let conteudo

    if (pagina === 'home') conteudo = <Home onNavigate={setPagina} />
    if (pagina === 'dashboard') conteudo = <Dashboard onNavigate={setPagina} />
    if (pagina === 'listagem') {
      conteudo = <Listagem onNavigate={setPagina} onSelectBook={setLivroSelecionado} />
    }
    if (pagina === 'detalhes') {
      conteudo = <Detalhes livro={livroSelecionado} onNavigate={setPagina} />
    }
    if (pagina === 'edicao') {
      conteudo = <Edição livro={livroSelecionado} onNavigate={setPagina} />
    }
    if (pagina === 'formulario') {
      conteudo = (
        <Formulario
          onNavigate={setPagina}
          onSelectBook={(book) => {
            setLivroSelecionado({
              ...book,
              titulo: book.titulo ?? book.nome,
              genero: book.genero ?? book.categoria,
            })
            setPagina('edicao')
          }}
        />
      )
    }

    return (
      <>
        <Header onNavigate={setPagina} />
        {conteudo}
        <Footer />
      </>
    )
  }

  return (
    <Login
      email={email}
      setEmail={setEmail}
      senha={senha}
      setSenha={setSenha}
      onNavigate={setPagina}
      onSubmit={(event) => enviarAutenticacao(event, '/auth/login')}
      mensagem={mensagem}
      carregando={carregando}
    />
  )
}

export default App
