import axios from 'axios';
import React from 'react'
import Loader from '@/components/Loader'

interface ComponentProps {
    id: number
    state: boolean
    setState: any
}

const Index: React.FC<ComponentProps> = ({ id, state, setState }) => {
    
    const [alert, setAlert] = React.useState<string>('');
    // const [name, setName] = React.useState<string>('')
    const [warning, setWarning] = React.useState<string>('');
    const [loaderActive, setLoaderActive  ] = React.useState<boolean>(false);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.BACK_LINK}/api/algo/${id}`)
                // setName(response?.data?.data?.fullName)
            } catch (err) {
                console.error('ERROR', err)
            }
        };

        fetchData();
    }, [id]);

    const eventSubmit = () => {
        setState(!state)
        setLoaderActive(false)
        setAlert('Las entradas se enviaron correctamente')
    }
    
    const eventSubmitFailed = () => {
        setLoaderActive(false)
        setWarning('Hubo un problema enviando las entradas')
    }

    const onFormatSubmit = (id: number) => {
        setAlert('')
        setWarning('')
        setLoaderActive(true)
        axios.delete(`${process.env.BACK_LINK}/api/${id}`)
        .then(() => eventSubmit())
        .catch(() => eventSubmitFailed())
    }

    return (
        <div className='Gray flex flex-col min-w-fit min-h-fit items-center p-6 pb-10'>
            <Loader active={loaderActive} />
            <div className='items-center flex flex-col p-6 pb-0 pt-0 text-center'>
                <p>¿Estás seguro de que deseas enviar las entradas al Whatsapp: <br /> <span className="font-bold"> {id} </span> ? </p>
                {alert && <p> Ocurrió algo inesperado... </p>}
                {warning && <p> Ocurrió algo inesperado... </p>}
            </div>
            <div className="mt-8 flex gap-6">
                <button className="rounded-full bg-slate-400 px-4 py-2 text-white font-bold" onClick={() => setState(!state)}>CANCELAR</button>
                <button className="rounded-full bg-primary px-4 py-2 text-white font-bold" onClick={() => onFormatSubmit(id)}>CONFIRMAR</button>
            </div>
        </div>
    )
}

export default Index