import { useState } from 'react'
import Cadastro from './pages/Cadastro.jsx'
import Login from './pages/Login.jsx'
import RecuperarSenha from './pages/RecuperarSenha.jsx'

function App() {
  const [pagina, setPagina] = useState('login')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
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
