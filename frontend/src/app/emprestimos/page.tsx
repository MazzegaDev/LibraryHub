'use client';

import { useState, useEffect } from 'react';
import { Emprestimo, Livro, Usuario } from '@/types';
import { EmprestimosService } from '@/services/emprestimos';
import { LivrosService } from '@/services/livros';
import { UsuariosService } from '@/services/usuarios';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { EmprestimoFormModal } from '@/components/emprestimos/EmprestimoFormModal';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Plus, ArrowLeftRight, CheckCircle2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export default function EmprestimosPage() {
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [livros, setLivros] = useState<Livro[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [emprestimoToReturn, setEmprestimoToReturn] = useState<Emprestimo | null>(null);
  const [isReturning, setIsReturning] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [empData, livData, usuData] = await Promise.all([
        EmprestimosService.consultar(),
        LivrosService.consultar(),
        UsuariosService.consultar()
      ]);
      setEmprestimos(empData);
      setLivros(livData);
      setUsuarios(usuData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReturn = async () => {
    if (!emprestimoToReturn) return;
    try {
      setIsReturning(true);
      await EmprestimosService.realizarDevolucao(emprestimoToReturn.empId);
      await fetchData();
      setEmprestimoToReturn(null);
    } catch (err) {
      console.error(err);
      alert('Não foi possível registrar a devolução.');
    } finally {
      setIsReturning(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    try {
      // The backend returns an array like [2026, 9, 20] instead of ISO string because Jackson LocalDate serializes as array by default if not configured.
      // Let's handle both string and array just in case.
      if (Array.isArray(dateString)) {
         return `${String(dateString[2]).padStart(2, '0')}/${String(dateString[1]).padStart(2, '0')}/${dateString[0]}`;
      }
      return format(parseISO(dateString), 'dd/MM/yyyy');
    } catch (e) {
      return dateString.toString(); // Fallback
    }
  };

  return (
    <>
      <Header title="Empréstimos">
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Novo Empréstimo
        </Button>
      </Header>

      <div className="p-8">
        <div className="bg-white rounded-lg shadow-sm border border-library-paper-dark overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-500 animate-pulse">Carregando empréstimos...</div>
          ) : emprestimos.length === 0 ? (
            <div className="p-12 text-center text-gray-500 flex flex-col items-center">
              <ArrowLeftRight className="w-12 h-12 mb-4 opacity-50" />
              <p>Nenhum empréstimo registrado.</p>
              <Button variant="secondary" className="mt-4" onClick={() => setIsFormOpen(true)}>Registrar Primeiro Empréstimo</Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-library-paper">
                  <tr className="text-library-wood-dark border-b border-gray-200">
                    <th className="px-6 py-4 font-semibold">ID</th>
                    <th className="px-6 py-4 font-semibold">Livro</th>
                    <th className="px-6 py-4 font-semibold">Usuário</th>
                    <th className="px-6 py-4 font-semibold">Data Empréstimo</th>
                    <th className="px-6 py-4 font-semibold">Data Devolução</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {emprestimos.map((emp) => (
                    <tr key={emp.empId} className="hover:bg-library-paper/30 transition-colors">
                      <td className="px-6 py-4 text-gray-500">#{emp.empId}</td>
                      <td className="px-6 py-4 font-medium text-library-graphite">{emp.empLivro?.livroTitulo || 'Desconhecido'}</td>
                      <td className="px-6 py-4 text-gray-600">{emp.empUsuario?.usuarioNome || 'Desconhecido'}</td>
                      <td className="px-6 py-4 text-gray-500">{formatDate(emp.empData as any)}</td>
                      <td className="px-6 py-4 text-gray-500">{formatDate(emp.empDevolucao as any)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          emp.empStatus === 'ATIVO' ? 'bg-library-olive/20 text-library-olive' :
                          emp.empStatus === 'DEVOLVIDO' ? 'bg-gray-100 text-gray-600' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {emp.empStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {emp.empStatus === 'ATIVO' && (
                          <Button 
                            variant="secondary"
                            onClick={() => setEmprestimoToReturn(emp)}
                            className="text-xs py-1 px-2 h-auto"
                          >
                            <CheckCircle2 className="w-4 h-4 mr-1" /> Devolver
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <EmprestimoFormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSuccess={fetchData} 
        livros={livros}
        usuarios={usuarios}
      />

      <ConfirmDialog 
        isOpen={!!emprestimoToReturn}
        onClose={() => setEmprestimoToReturn(null)}
        onConfirm={handleReturn}
        title="Confirmar Devolução"
        message={`Confirmar a devolução do livro "${emprestimoToReturn?.empLivro?.livroTitulo}" por ${emprestimoToReturn?.empUsuario?.usuarioNome}?`}
        isLoading={isReturning}
      />
    </>
  );
}
