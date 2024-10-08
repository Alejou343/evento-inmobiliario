import axios from 'axios';
import React from 'react'
import Loader from '@/components/Loader'
import Image from 'next/image';

interface ComponentProps {
    id: number
    state: boolean
    setState: any
    offset: string
}

const Index: React.FC<ComponentProps> = ({ id, state, setState, offset }) => {

    const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp|tiff|svg)$/i    
    const [alert, setAlert] = React.useState<string>('');
    const [image, setImage] = React.useState<string>('')
    const [phone, setPhone] = React.useState<string>('')
    const [warning, setWarning] = React.useState<string>('');
    const [loaderActive, setLoaderActive  ] = React.useState<boolean>(false);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setWarning('');
                const response = await axios.post(`${process.env.BACK_LINK}/api/comprobante`, { numId: String(id), offset: offset });
                setImage(response?.data?.url);
                setPhone(response?.data?.phone);
            } catch (err) {
                console.error('ERROR', err);
                setWarning('Comprobante no encontrado');
            }
        };

        fetchData();
    }, [id, offset]);

    const eventSubmit = () => {
        setState(!state);
        setLoaderActive(false);
        setAlert('Las entradas se enviaron correctamente');
        window.location.reload()
    }
    
    const eventSubmitFailed = () => {
        setLoaderActive(false);
        setWarning('Hubo un problema enviando las entradas');
    }

    const onFormatSubmit = (phone: string, id: number) => {
        setAlert('');
        setWarning('');
        setLoaderActive(true);
        // Metodo para enviar mensaje de confirmación por Whatsapp
        axios.post(`${process.env.BACK_LINK}/api/sendMessageConfirm`, { phone: phone, numId: id })
        .then(() => eventSubmit())
        .catch(() => eventSubmitFailed());
    }

    return (
        <div className='Gray flex flex-col min-w-fit min-h-fit items-center p-6 pb-10'>
            <Loader active={loaderActive} />
            <div className='items-center flex flex-col p-6 pb-0 pt-0 text-center'>
                <p> Comprobante de Bancolombia del usuario: <br /> <span className="font-bold"> {id} </span></p>
                { imageExtensions.test(image) 
                    ? <Image 
                    src={image} 
                    alt={`Comprobante_${phone}.jpg`} 
                    width={200} 
                    height={200} 
                    /> 
                    : <p className='text-xs my-2 text-red-500 text-center'> Comprobante no encontrado </p>
                }
                <p>{alert}</p>
                <p>{warning}</p>
            </div>
            <div className="mt-8 flex gap-6">
                <button className="rounded-full bg-slate-400 px-4 py-2 text-white font-bold" onClick={() => setState(!state)}>CERRAR</button>
                <button className="rounded-full bg-secondary px-4 py-2 text-white font-bold" onClick={() => onFormatSubmit(phone, id)}>ENVIAR CONFIRMACION</button>
            </div>
        </div>
    )
}

export default Index;
