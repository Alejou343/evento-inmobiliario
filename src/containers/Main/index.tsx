import React from 'react'
import Inform from '@/components/Inform'
import Sidebar from '@/components/Sidebar'
import { useItem } from '@/context/itemContext'
import TableRegisters from '@/components/TableRegisters'
import TableQuestions from '@/components/TableQuestions'
import CourtesyButton from '@/components/CourtesyButton'

const Index = () => {

    const { item } = useItem()
    
    return (
        <div className='flex'>
            <Sidebar />
            <div className="p-4 mx-auto flex flex-col justify-center">
                <h1 className="text-center text-3xl text-primary font-bold"> Interacciones Evento Inmobiliario del año </h1>
                <h1 className="text-center text-3xl text-primary font-bold"> {new Date().toDateString()} </h1>
                {item == 0 ? <TableRegisters title="Total Registros" endpoint="getRegistros" /> : null}
                {item == 1 ? <TableQuestions title="Total Preguntas" endpoint="getPreguntas" /> : null}
                {item == 2 ? <Inform endpoint='informeRegistros' /> : null}
                {item == 3 ? <Inform endpoint='informePreguntas' /> : null}
            </div>
            {item == 0 && <CourtesyButton />}
        </div>
    )
}

export default Index