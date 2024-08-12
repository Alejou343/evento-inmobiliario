import React from 'react';
import axios from 'axios';
import TableFooter from '@/components/TableFooter';

interface ComponentProps {
    endpoint: string
    title: string
}

const Index: React.FC<ComponentProps> = ({ endpoint, title }) => {

    const [page, setPage] = React.useState<number>(0)
    const [rows, setRows] = React.useState<any[]>([]);
    const [keys, setKeys] = React.useState<any[]>([]);
    const [error, setError] = React.useState<any>(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.BACK_LINK}/api/${endpoint}`);
                setRows(response?.data);
                const allKeys = response?.data?.flatMap((row: any) => Object.keys(row));
                const uniqueKeys = Array.from(new Set(allKeys));
                setKeys(uniqueKeys);
            } catch (err: any) {
                setError(err);
            }
        };

        fetchData();
    }, [endpoint]);

    return (
        <div className="bg-auxiliar w-[60rem] overflow-auto h-[40vh] py-1 my-4 rounded-md mx-auto">
            <h1 className="text-center mb-4 text-3xl font-bold text-secondary">{title}</h1>
            <div className="overflow-x-auto">
                <table className="table table-hover bg-auxiliar w-full h-[16.125rem]">
                    <thead className='bg-secondary text-white'>
                        <tr>
                            {keys.map(key => (
                                <th className='border px-2 font-bold' key={key}>{key}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.slice(page * 10, page * 10 + 10).map((row, id) => (
                            <tr key={id} className="hover:bg-slate-300 bg-slate-100 cursor-pointer">
                                {keys.map((key: any) => (
                                    <td className='border px-2 text-center text-sm' key={`${key}-${id}`}>
                                        {row[key] || ''}
                                    </td>
                                ))}
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
            number={10}
            />
        </div>
    );
};

export default Index;
