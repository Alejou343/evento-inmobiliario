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
    const [modalContent, setModalContent] = React.useState<number | null>(null)
    const [page, setPage] = React.useState<number>(0)
    const [rows, setRows] = React.useState<any[]>([]);
    const [keys, setKeys] = React.useState<any[]>([]);
    const [error, setError] = React.useState<any>(null);
    const [openModal, setOpenModal] = React.useState<boolean>(false);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.BACK_LINK}/api/${endpoint}`);

                const tableInfo = response.data.map((item: any) => {
                    const message = JSON.parse(item.message);
                    return {
                        phone: item.phone,
                        tipoId: message.tipoId,
                        numId: message.numId,
                        name: message.name,
                        email: message.email,
                        cel: message.cel,
                        tipoAsistencia: message.tipoAsistencia,
                        creationdate: item.creationdate
                    };
                });
                setKeys(Object.keys(tableInfo[0]));
                setRows(tableInfo);
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
        <div className="bg-auxiliar min-w-[40rem] max-w-[90%] overflow-auto max-h-[80vh] py-1 my-4 rounded-md mx-auto">
            <ModalGeneral state={openModal} setState={setOpenModal}>
                <ComprobanteContent id={selectedItem} state={openModal} setState={setOpenModal} offset='0' />
            </ModalGeneral>
            <h1 className="text-center mb-4 text-3xl font-bold text-secondary">{title}</h1>
            <div className="overflow-x-auto">
                <table className="table table-hover bg-auxiliar w-full">
                    <thead className='bg-secondary text-white'>
                        <tr>
                            {keys.map(key => (
                                <th className='border px-2 font-bold' key={key}>{key}
                                </th>
                            ))}
                            <th className='border px-2 font-bold'>Comprobante</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.slice(page * 20, page * 20 + 20).map((row, id) => (
                            <tr key={id} className="hover:bg-slate-300 bg-slate-100 cursor-pointer">
                                {keys.map((key: any) => (
                                    <td className='border px-2 text-center text-sm' key={`${key}-${id}`}>
                                        {row[key] || ''}
                                    </td>
                                ))}
                                <td className='border px-2 text-center text-sm'>
                                    <Image src='/assets/open.svg' alt={'/open.svg'} width={15} height={15} className='mx-auto'  onClick={() => openContentModal(row[keys[0]])} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <TableFooter 
            param={rows} 
            text="Total:" 
            page={page} 
            setPage={setPage} 
            number={20}
            />
        </div>
    );
};

export default Index;
