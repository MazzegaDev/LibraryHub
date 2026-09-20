'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Users, ArrowLeftRight, Library } from 'lucide-react';
import { LivrosService } from '@/services/livros';
import { AutoresService } from '@/services/autores';
import { EmprestimosService } from '@/services/emprestimos';
import { Header } from '@/components/layout/Header';
import { Livro, Autor, Emprestimo } from '@/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Dashboard() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [autores, setAutores] = useState<Autor[]>([]);
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [livrosData, autoresData, emprestimosData] = await Promise.all([
          LivrosService.consultar().catch(() => []),
          AutoresService.consultar().catch(() => []),
          EmprestimosService.consultar().catch(() => [])
        ]);

        setLivros(livrosData);
        setAutores(autoresData);
        setEmprestimos(emprestimosData);
      } catch (err) {
        setError('Falha ao conectar com o servidor. A API pode estar offline.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const livrosDisponiveis = livros.filter(l => l.livroDisponivel).length;
  const emprestimosAtivos = emprestimos.filter(e => e.empStatus === 'ATIVO').length;
  
  // Sort by ID to simulate "recent"
  const livrosRecentes = [...livros].sort((a, b) => b.livroId - a.livroId).slice(0, 5);
  const emprestimosRecentes = [...emprestimos].sort((a, b) => b.empId - a.empId).slice(0, 5);

  if (loading) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <BookOpen className="w-12 h-12 text-library-wood mb-4 opacity-50" />
          <p className="text-library-wood-dark font-serif text-lg">Carregando acervo...</p>
        </div>
      </div>
    );
  }

  if (error && !livros.length && !autores.length && !emprestimos.length) {
    return (
      <div className="flex-1 p-8">
        <Header title="Dashboard" />
        <div className="mt-8 bg-red-50 text-red-700 p-6 rounded-md border border-red-200">
          <h2 className="text-lg font-bold mb-2">Erro de Conexão</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header title="Visão Geral" />
      
      <div className="p-8 space-y-8">
        {/* Metric cards (minimalist style) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Metric title="Total de Livros" value={livros.length} icon={Library} />
          <Metric title="Livros Disponíveis" value={livrosDisponiveis} icon={BookOpen} />
          <Metric title="Autores Cadastrados" value={autores.length} icon={Users} />
          <Metric title="Empréstimos Ativos" value={emprestimosAtivos} icon={ArrowLeftRight} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Loans */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-library-paper-dark">
            <h2 className="text-xl font-serif font-semibold text-library-wood-dark mb-6 border-b border-gray-100 pb-2">
              Empréstimos Recentes
            </h2>
            {emprestimosRecentes.length === 0 ? (
              <p className="text-gray-500 italic">Nenhum empréstimo registrado.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-gray-500 border-b border-gray-100">
                      <th className="pb-3 font-medium">Livro</th>
                      <th className="pb-3 font-medium">Usuário</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emprestimosRecentes.map(emp => (
                      <tr key={emp.empId} className="border-b border-gray-50 last:border-0 hover:bg-library-paper/50 transition-colors">
                        <td className="py-3 font-medium text-library-graphite">{emp.empLivro?.livroTitulo || 'Desconhecido'}</td>
                        <td className="py-3 text-gray-600">{emp.empUsuario?.usuarioNome || 'Desconhecido'}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                            emp.empStatus === 'ATIVO' ? 'bg-library-olive/20 text-library-olive' :
                            emp.empStatus === 'DEVOLVIDO' ? 'bg-gray-100 text-gray-600' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {emp.empStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Recent Books */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-library-paper-dark">
            <h2 className="text-xl font-serif font-semibold text-library-wood-dark mb-6 border-b border-gray-100 pb-2">
              Últimos Livros Adicionados
            </h2>
            {livrosRecentes.length === 0 ? (
              <p className="text-gray-500 italic">Nenhum livro no acervo.</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {livrosRecentes.map(livro => (
                  <li key={livro.livroId} className="py-3 flex justify-between items-center group">
                    <div>
                      <h3 className="font-medium text-library-graphite group-hover:text-library-wood transition-colors">{livro.livroTitulo}</h3>
                      <p className="text-sm text-gray-500">Ano: {livro.livroAnoPublicacao} • ISBN: {livro.livroIsbn}</p>
                    </div>
                    <span className={`w-2 h-2 rounded-full ${livro.livroDisponivel ? 'bg-library-olive' : 'bg-red-500'}`} title={livro.livroDisponivel ? 'Disponível' : 'Emprestado'} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

function Metric({ title, value, icon: Icon }: { title: string, value: number | string, icon: any }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-library-paper-dark flex items-start justify-between">
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <p className="text-3xl font-serif font-bold text-library-wood-dark">{value}</p>
      </div>
      <div className="bg-library-paper p-3 rounded-md">
        <Icon className="w-6 h-6 text-library-wood" />
      </div>
    </div>
  );
}
