import React from 'react'
import Button from '@/components/Button'
import Inform from '@/components/Inform'
import TableRegisters from '@/components/TableRegisters'
import TableQuestions from '@/components/TableQuestions'
import { useItem } from '@/context/itemContext'
import Sidebar from '@/components/Sidebar'

const Index = () => {

    const item = useItem()
    
    return (
        <div className='flex'>
            <Sidebar />
            <main className="p-4 mx-auto">
                <h1 className="text-center"> Interacciones Evento Inmobiliario del año </h1>
                <h1 className="text-center"> {new Date().toDateString()} </h1>
                {item == 0 ? <Inform endpoint='informeRegistros' /> : null}
                {item == 1 ? <Inform endpoint='informePreguntas' /> : null}
                {item == 2 ? <TableRegisters title="Total Registros" endpoint="getRegistros" /> : null}
                {item == 3 ? <TableQuestions title="Total Preguntas" endpoint="getPreguntas" /> : null}
            </main>
        </div>
    )
}

export default Index