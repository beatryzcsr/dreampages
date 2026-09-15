import { useEffect, useState } from 'react'
import fundo from '../assets/fundo.png'

const informacoesIniciais = [
    { titulo: 'Exemplares', valor: 0, legenda: 'Em estoque' },
    { titulo: 'Autores', valor: 0, legenda: 'No acervo' },
    { titulo: 'Gêneros', valor: 0, legenda: 'Cadastrados'},
    { titulo: 'Editoras', valor: 0, legenda: 'Cadastradas' },
    { titulo: 'Livrarias', valor: 0, legenda: 'Cadastradas' },
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
                    { titulo: 'Editoras', valor: valoresUnicos('editora'), legenda: 'Cadastradas' },
                    { titulo: 'Livrarias', valor: valoresUnicos('livraria'), legenda: 'Cadastradas' },
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
        <main className="relative min-h-dvh bg-cover bg-center bg-fixed px-3 py-8 text-[#AA723B] sm:px-6 sm:py-10 lg:px-10" style={{ backgroundImage: `url(${fundo})` }}>
            <div className="flex min-h-dvh items-center justify-center">
                <div className="mx-auto flex max-w-[1600px] items-center justify-center gap-6 xl:gap-8">
                    {informacoes.map((item) => (
                        <div key={item.titulo} className="w-[235px] rounded-[2rem] bg-[#051A50]/95 p-6 text-center shadow-2xl xl:w-[275px] xl:p-7">
                            <h2 className="font-serif text-[1.9rem] leading-none xl:text-[2.2rem]">{item.titulo}</h2>
                            <strong className="mt-3 block text-[3.4rem] leading-none xl:text-[4.2rem]">{carregando ? '...' : item.valor}</strong>
                            <p className="mt-3 font-serif text-[1.05rem] xl:text-[1.15rem]">{item.legenda}</p>
                        </div>
                    ))}
                </div>
            </div>
            {erro && (
                <p className="absolute inset-x-0 bottom-6 text-center font-serif text-lg text-white">
                    {erro}
                </p>
            )}
        </main>
    )
}

export default Dashboard