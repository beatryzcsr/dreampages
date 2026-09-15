import { useState } from 'react'
import Cadastro from './pages/Cadastro.jsx'
import Login from './pages/Login.jsx'
import RecuperarSenha from './pages/RecuperarSenha.jsx'
import Edição from './pages/Edição.jsx'
import Home from './pages/Home.jsx'
import Listagem from './pages/Listagem.jsx'
import Detalhes from './pages/Detalhes.jsx'
import Formulario from './pages/Formulario.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const [pagina, setPagina] = useState('login')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [livroSelecionado, setLivroSelecionado] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    setPagina('home')
  }

  if (pagina === 'cadastro') {
    return (
      <Cadastro
        email={email}
        setEmail={setEmail}
        senha={senha}
        setSenha={setSenha}
        onNavigate={setPagina}
        onSubmit={handleSubmit}
      />
    )
  }

  if (pagina === 'recuperar') {
    return (
      <RecuperarSenha
        senha={senha}
        setSenha={setSenha}
        onNavigate={setPagina}
        onSubmit={handleSubmit}
      />
    )
  }

  if (pagina === 'home' || pagina === 'listagem' || pagina === 'detalhes' || pagina === 'edicao' || pagina === 'formulario') {
    let conteudo

    if (pagina === 'home') conteudo = <Home onNavigate={setPagina} />
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
      onSubmit={handleSubmit}
    />
  )
}

export default App
