import React from 'react';
import axios from 'axios';
import Image from 'next/image';
import ModalGeneral from '@/containers/ModalGeneral';
import ModalContent from '@/components/ModalContent';
import ComprobanteContent from '@/components/ComprobanteContent';
import TableFooter from '@/components/TableFooter';

interface ComponentProps {
    endpoint: string
    title: string
}

const Index: React.FC<ComponentProps> = ({ title, endpoint }) => {

    const [selectedItem, setSelectedItem] = React.useState<number>(0);
    const [page, setPage] = React.useState<number>(0)
    const [rows, setRows] = React.useState<any[]>([]);
    const [error, setError] = React.useState<any>(null);
    const [openModal, setOpenModal] = React.useState<boolean>(false);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.BACK_LINK}/api/${endpoint}`);
                setRows(response.data);
            } catch (err: any) {
                setError(err);
            }
        };

        fetchData();
    }, [openModal, endpoint]); // Dependencia modificada para que el efecto se dispare solo cuando cambie `endpoint`

    const openContentModal = (id: number) => {
        setOpenModal(!openModal)
        setSelectedItem(id)
    }

    return (
        <div className="bg-auxiliar w-[75rem] overflow-auto h-[44vh] py-1 my-4 rounded-md mx-auto">
            <ModalGeneral state={openModal} setState={setOpenModal}>
                <ComprobanteContent id={selectedItem} state={openModal} setState={setOpenModal} offset='0' />
            </ModalGeneral>
            <h1 className="text-center mb-4 text-3xl font-bold text-secondary">{title}</h1>
            <div className="overflow-x-auto">
                <table className="table table-hover bg-auxiliar w-full h-[16.125rem]">
                    <thead className='bg-secondary text-white'>
                        <tr>
                            <th className='border px-2 font-bold'>Tipo id</th>
                            <th className='border px-2 font-bold'>Número id</th>
                            <th className='border px-2 font-bold'>Nombre</th>
                            <th className='border px-2 font-bold'>Correo</th>
                            <th className='border px-2 font-bold'>Tipo Asistente</th>
                            <th className='border px-2 font-bold'>Celular</th>
                            <th className='border px-2 font-bold'>Fecha de Creación</th> 
                            <th className='border px-2 font-bold'>Comprobante</th>
                            <th className='border px-2 font-bold'>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length ? rows?.slice(page * 10, page * 10 + 10).map((row, id) => (
                            <tr key={id} className="hover:bg-slate-300 bg-slate-100 cursor-pointer">
                                    <td className='border px-2 text-center text-sm'>{row.tipoId}</td>
                                    <td className='border px-2 text-center text-sm'>{row.numId}</td>
                                    <td className='border px-2 text-center text-sm'>{row.name}</td>
                                    <td className='border px-2 text-center text-sm'>{row.email}</td>
                                    <td className='border px-2 text-center text-sm'>{row.tipoAsistencia}</td>
                                    <td className='border px-2 text-center text-sm'>{row.cel}</td>
                                    <td className='border px-2 text-center text-sm'>{row.creationdate}</td>
                                <td className='border px-2 text-center text-sm'>
                                    {row.phoneTalk == 'Cortesía'
                                        ? <Image src='/assets/ticket.svg' alt={'/ticket.svg'} width={25} height={25} className='mx-auto' title={`Cortesía de ${row.name}`} />
                                        : <Image src='/assets/open.svg' alt={'/open.svg'} width={25} height={25} className='mx-auto' title={`Ver comprobante de ${row.name}`} onClick={() => openContentModal(row.numId)} />}
                                </td>
                                <td className='border px-2 text-center text-sm'>
                                    <input type='checkbox' checked={row.state} readOnly />
                                </td>
                            </tr>
                        )) : <tr className="hover:bg-slate-300 bg-slate-100 cursor-pointer">
                                <td className='border px-2 text-center text-sm'></td>
                                <td className='border px-2 text-center text-sm'></td>
                                <td className='border px-2 text-center text-sm'></td>
                                <td className='border px-2 text-center text-sm'></td>
                                <td className='border px-2 text-center text-sm'></td>
                                <td className='border px-2 text-center text-sm'></td>
                                <td className='border px-2 text-center text-sm'></td>
                                <td className='border px-2 text-center text-sm'></td>
                            </tr>}
                    </tbody>
                </table>
            </div>
            <TableFooter 
            param={rows} 
            text="Total:" 
            page={page} 
            setPage={setPage} 
            number={10}
            />
        </div>
    );
};

export default Index;
