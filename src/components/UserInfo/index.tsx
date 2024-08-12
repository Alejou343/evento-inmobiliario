import React from 'react'
import Image from 'next/image'
import axios from 'axios'

interface ComponentProps {
    props: { 
        handleLogout: React.MouseEventHandler<HTMLDivElement>
        user: string  
    }
}


const Index: React.FC<ComponentProps> = ({ props }) => {

    const [items, setItems] = React.useState<number>(0)
    
    React.useEffect(() => {
        try {
            axios.get(`${process.env.BACK_LINK}/api/getRegistros`)
            .then((response: any) => setItems(response.data.length))
            .catch((err: any) => console.log(err))
        } catch (err) {
            console.error(err)
        }
    }, [])

    return (
        <div className="flex justify-center items-center">
            <div className="w-5/6 text-center absolute bottom-8">
            <div className="bg-auxiliar rounded-lg">
                <span className='text-primary p-2 text-xl font-bold mb-2 flex justify-between'>Consultas: <p className='text-secondary'>{80 + items}</p></span>
                <span className='text-primary p-2 text-xl font-bold mb-4 flex justify-between'>Registros Exitosos: <p className='text-secondary'>{items}</p></span>
            </div>
                <div onClick={props?.handleLogout} className="w-[4rem] mx-auto cursor-pointer aspect-square rounded-full bg-auxiliar flex mb-4 hover:w-[4.2rem]" title='Cerrar sesión'>
                    <Image src="/assets/logout.svg" alt="logout.svg" width={20} height={20} className='my-4 mx-auto w-auto' />
                </div>
                <p className='text-white text-md font-bold'>{props?.user}</p>
            </div>
        </div>
    )
}

export default Index