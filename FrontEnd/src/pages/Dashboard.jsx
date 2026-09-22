import { useEffect, useState } from 'react'
import fundo from '../assets/fundo.png'
import { authFetch } from '../api.js'

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
                const resposta = await authFetch('/livros')

                if (!resposta.ok) {
                    throw new Error('Não foi possível carregar os livros.')
                }

                const livros = await resposta.json()
                const valoresUnicos = (campo) => new Set(livros.map((livro) => livro[campo]).filter(Boolean)).size
                const exemplares = livros.reduce((total, livro) => total + Number(livro.quantidade || 0), 0)

                setInformacoes([
                    { titulo: 'Exemplares', valor: valoresUnicos('titulo'), legenda: 'Em estoque' },
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
        <main className="relative min-h-dvh bg-cover bg-center bg-fixed px-3 py-4 text-[#AA723B] sm:px-6 sm:py-5 lg:px-10" style={{ backgroundImage: `url(${fundo})` }}>
            <div className="flex min-h-dvh items-center justify-center py-2 sm:py-3">
                <div className="mx-auto flex max-w-[1700px] flex-wrap items-center justify-center gap-4 sm:gap-5 xl:gap-7">
                    {informacoes.map((item) => (
                        <div key={item.titulo} className="w-[210px] rounded-[1.9rem] bg-[#051A50]/95 p-5 text-center shadow-2xl sm:w-[230px] sm:p-6 xl:w-[290px] xl:rounded-[2.2rem] xl:p-7">
                            <h2 className="font-serif text-[1.7rem] leading-none sm:text-[1.9rem] xl:text-[2.3rem]">{item.titulo}</h2>
                            <strong className="mt-2 block text-[3rem] leading-none sm:text-[3.5rem] xl:text-[4.5rem]">{carregando ? '...' : item.valor}</strong>
                            <p className="mt-2 font-serif text-[0.95rem] sm:text-[1.05rem] xl:text-[1.2rem]">{item.legenda}</p>
                        </div>
                    ))}
                </div>
            </div>
            {erro && (
                <p className="absolute inset-x-0 bottom-6 text-center font-serif text-lg font-bold text-[#051A50]">
                    {erro}
                </p>
            )}
        </main>
    )
}

export default Dashboard