import React from 'react';
import axios from 'axios';
// import { useItem } from '@/context/ItemContext';
import Link from 'next/link';
// import { actions } from '@/utils/actionsArray';
import Image from 'next/image';
// import ModalGeneral from '@/containers/ModalGeneral';
// import DeleteContent from '@/components/DeleteContent';
import TableFooter from '@/components/TableFooter';

interface ComponentProps {
    endpoint: string
    title: string
}

const Index: React.FC<ComponentProps> = ({ title, endpoint }) => {

    // const { item } = useItem();
    const [deleteId, setDeleteId] = React.useState<number>(0);
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
                        Tiporesidencia: message.Tiporesidencia,
                        Habitaciones: message.Habitaciones,
                        Banos: message.Banos,
                        Parqueaderos: message.Parqueaderos,
                        Ciudad: message.Ciudad,
                        Barrio: message.Barrio,
                        Tiposervicio: message.Tiposervicio,
                        Areaconstruida: message.Areaconstruida,
                        Presupuesto: message.Presupuesto,
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

    const openDeleteModal = (id: number) => {
        setOpenModal(!openModal)
        setDeleteId(id)
    }

    return (
        <div className="bg-auxiliar min-w-[40rem] max-w-[90%] overflow-auto max-h-[80vh] py-1 my-4 rounded-md mx-auto">
            {/* <ModalGeneral state={openModal} setState={setOpenModal}>
                <DeleteContent endpoint={endpoint} id={deleteId} state={openModal} setState={setOpenModal} />
            </ModalGeneral> */}
            <h1 className="text-center mb-4 text-3xl font-bold text-secondary">{title}</h1>
            <div className="overflow-x-auto">
                <table className="table table-hover bg-auxiliar w-full">
                    <thead className='bg-secondary text-white'>
                        <tr>
                            {keys.map(key => (
                                <th className='border px-2 font-bold' key={key}>{key}
                                </th>
                            ))}
                            {endpoint == 'getRegistros' ? <th className='border px-2 font-bold'>Ver comprobante</th> : null}
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
                                {endpoint == 'getRegistros' ? <td className='border px-2 text-center text-sm'>
                                    {/* <Image src='/assets/delete.svg' alt={'/delete.svg'} width={15} height={15} className='mx-auto'  onClick={() => onFormatSubmit(row[keys[0]])} /> */}
                                    <Image src='/assets/open.svg' alt={'/open.svg'} width={15} height={15} className='mx-auto'  onClick={() => openDeleteModal(row[keys[0]])} />
                                </td>: null}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            { error && <p> Hubo un error mostrando la información </p>}
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
