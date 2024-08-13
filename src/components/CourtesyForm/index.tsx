import React from 'react'
import axios from 'axios'
import FormSection from '@/components/FormSection'
import FormSelect from '@/components/FormSelect'
import Button from '@/components/Button'

interface FormDataProps {
    tipoId: string;
    numId: string;
    name: string;
    email: string;
    tipoAsistencia: string;
    cel: string;
    status: number
}

interface ComponentProps {
    state: boolean
    setState: any
}

const Index: React.FC<ComponentProps> = ({ state,  setState}) => {

    const [formData, setFormData] = React.useState<FormDataProps>({ tipoId: '', numId: '', name: '', email: '', tipoAsistencia: '', cel: '', status: 1 })

    const registerCourtesy = async (info: FormDataProps) => {
        // console.log(`${process.env.BACK_LINK}/api/createAsistencia`)
        // console.log(info)
        return await axios.post(`${process.env.BACK_LINK}/api/createAsistencia`, info)
        .then(() => successCourtesy())
    }

    const successCourtesy = () => {
        setState(!state)
        window.location.reload()
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({
        ...formData,
        [id]: value,
        });
    };

  return (
    <div className='w-[25rem]'>
        <h1 className="text-2xl font-bold mb-4 text-center text-primary">Registrar cortesías Evento Inmobiliario del Año</h1>
        <FormSelect 
        id="tipoId"
        label="Tipo de documento"
        value={formData.tipoId}
        list={['CC', 'TI', 'PP', 'PEP', 'DIE', 'NIT']} 
        onChange={handleInputChange}
        />
        <FormSection  
        label="Número identificación"
        type="text"
        id="numId"
        placeholder="Número identificación"
        onChange={handleInputChange}
        value={formData.numId}
        />
        <FormSection  
        label="Nombre Completo"
        type="text"
        id="name"
        placeholder="Nombre Completo"
        onChange={handleInputChange}
        value={formData.name}
        />
        <FormSection  
        label="Correo electrónico"
        type="text"
        id="email"
        placeholder="Correo electrónico"
        onChange={handleInputChange}
        value={formData.email}
        />
        <FormSelect 
        id="tipoAsistencia"
        label="Tipo de asistente"
        value={formData.tipoAsistencia}
        list={['Independiente', 'Inmobiliaria']} 
        onChange={handleInputChange}
        />
        <FormSection  
        label="Celular"
        type="text"
        id="cel"
        placeholder="Celular"
        onChange={handleInputChange}
        value={formData.cel}
        />
        <div className="flex mx-auto">
            <Button type='button' onClick={() => registerCourtesy(formData)} className='bg-primary my-[1rem] text-auxiliar'> Registrar Cortesía </Button>
        </div>
    </div>
  )
}

export default Index