import React from 'react'
import Inform from '@/components/Inform'
import Sidebar from '@/components/Sidebar'
import { useItem } from '@/context/itemContext'
import TableRegisters from '@/components/TableRegisters'
import TableQuestions from '@/components/TableQuestions'

const Index = () => {

    const { item } = useItem()
    
    return (
        <div className='flex'>
            <Sidebar />
            <div className="p-4 mx-auto flex flex-col justify-center">
                <h1 className="text-center text-3xl text-primary font-bold"> Interacciones Evento Inmobiliario del año </h1>
                <h1 className="text-center text-3xl text-primary font-bold"> {new Date().toDateString()} </h1>
                {item == 0 ? <Inform endpoint='informeRegistros' /> : null}
                {item == 1 ? <Inform endpoint='informePreguntas' /> : null}
                {item == 2 ? <TableRegisters title="Total Registros" endpoint="getRegistros" /> : null}
                {item == 3 ? <TableQuestions title="Total Preguntas" endpoint="getPreguntas" /> : null}
            </div>
        </div>
    )
}

export default Index