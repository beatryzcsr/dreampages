import { useEffect, useState } from 'react'
import fundo from '../assets/fundo.png'

const informacoesIniciais = [
    { titulo: 'Exemplares', valor: 0, legenda: 'Em estoque' },
    { titulo: 'Autores', valor: 0, legenda: 'No acervo' },
    { titulo: 'Gêneros', valor: 0, legenda: 'Cadastrados'},
    { titulo: 'Editoras', valor: 0, legenda: 'Cadastrados' },
    { titulo: 'Livrarias', valor: 0, legenda: 'Cadastrados' },
]

function Dashboard() {
    const [informacoes, setInformacoes] = useState(informacoesIniciais)
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState('')

    useEffect(() => {
        async function carregarLivros() {
            try {
                const resposta = await fetch('http://localhost:5000/livros')

                if (!resposta.ok) {
                    throw new Error('Não foi possível carregar os livros.')
                }

                const livros = await resposta.json()
                const valoresUnicos = (campo) => new Set(livros.map((livro) => livro[campo]).filter(Boolean)).size
                const exemplares = livros.reduce((total, livro) => total + Number(livro.quantidade || 0), 0)

                setInformacoes([
                    { titulo: 'Exemplares', valor: exemplares, legenda: 'Em estoque' },
                    { titulo: 'Autores', valor: valoresUnicos('autor'), legenda: 'No acervo' },
                    { titulo: 'Gêneros', valor: valoresUnicos('genero'), legenda: 'Cadastrados' },
                    { titulo: 'Editoras', valor: valoresUnicos('editora'), legenda: 'Cadastrados' },
                    { titulo: 'Livrarias', valor: valoresUnicos('livraria'), legenda: 'Cadastrados' },
                ])
            } catch (error) {
                setErro(error.message)
            } finally {
                setCarregando(false)
            }
        }

        carregarLivros()
    }, [])

    return (
        <main className="min-h-dvh bg-cover bg-center bg-fixed px-3 py-12 text-[#AA723B] sm:px-6 sm:py-16 lg:px-10" style={{ backgroundImage: `url(${fundo})` }}>
            <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-8 ">
                {informacoes.map((item) => (
                    <div key={item.titulo} className="w-52 rounded-4xl bg-[#051A50]/95 p-6 text-center shadow-2xl">
                        <h2 className="font-serif text-2xl">{item.titulo}</h2>
                        <strong className="mt-2 block text-4xl">{carregando ? '...' : item.valor}</strong>
                        <p className="mt-2 font-serif text-sm">{item.legenda}</p>
                    </div>
                ))}
            </div>
            {erro && <p className="mt-8 text-center font-serif text-lg text-white">{erro}</p>}
        </main>
    )
}

export default Dashboard