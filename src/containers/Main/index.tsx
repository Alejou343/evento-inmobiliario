import React from 'react'
import Button from '@/components/Button'
import Inform from '@/components/Inform'

const Index = () => {

    const [item, setItem] = React.useState<number | null>(null)

    return (
        <main className="flex flex-col p-4">
            <h1 className="text-center"> Interacciones Evento Inmobiliario del año </h1>
            <h1 className="text-center"> {new Date().toDateString()} </h1>
            <div className="flex">
                <Button onClick={() => setItem(0)} type='button' className='bg-black'>Registros</Button>
                <Button onClick={() => setItem(1)} type='button' className='bg-black'>Preguntas</Button>
            </div>
            {item == 0 ? <Inform /> : null}
            {item == 1 ? <Inform /> : null}
        </main>
    )
}

export default Index