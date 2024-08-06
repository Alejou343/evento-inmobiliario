import React from 'react'
import Button from '@/components/Button'
import Inform from '@/components/Inform'
import TableRegisters from '@/components/TableRegisters'
import TableQuestions from '@/components/TableQuestions'
import Sidebar from '@/components/Sidebar'

const Index = () => {

    const [item, setItem] = React.useState<number | null>(null)

    return (
        <div className='flex'>
            <Sidebar />
            <main className="p-4 mx-auto">
                <h1 className="text-center"> Interacciones Evento Inmobiliario del año </h1>
                <h1 className="text-center"> {new Date().toDateString()} </h1>
                {/* <div className="flex">
                    <Button onClick={() => setItem(0)} type='button' className={item == 0 ? 'bg-primary text-auxiliar' : 'bg-auxiliar text-primary'} >Informe Registros</Button>
                    <Button onClick={() => setItem(1)} type='button' className={item == 1 ? 'bg-primary text-auxiliar' : 'bg-auxiliar text-primary'} >Informe Preguntas</Button>
                    <Button onClick={() => setItem(2)} type='button' className={item == 2 ? 'bg-primary text-auxiliar' : 'bg-auxiliar text-primary'} >Total Registros</Button>
                    <Button onClick={() => setItem(3)} type='button' className={item == 3 ? 'bg-primary text-auxiliar' : 'bg-auxiliar text-primary'} >Total Preguntas</Button>
                </div> */}
                {item == 0 ? <Inform endpoint='informeRegistros' /> : null}
                {item == 1 ? <Inform endpoint='informePreguntas' /> : null}
                {item == 2 ? <TableRegisters title="Total Registros" endpoint="getRegistros" /> : null}
                {item == 3 ? <TableQuestions title="Total Preguntas" endpoint="getPreguntas" /> : null}
            </main>
        </div>
    )
}

export default Index