import React from 'react'
import Button from '@/components/Button'
import ModalGeneral from '@/containers/ModalGeneral'
import CourtesyForm from '@/components/CourtesyForm'

const Index = () => {

    const [openModal, setOpenModal] = React.useState(false)

  return (
    <>
        <ModalGeneral state={openModal} setState={setOpenModal} >
            <CourtesyForm state={openModal} setState={setOpenModal} />
        </ModalGeneral>
        <Button onClick={() => setOpenModal(!openModal)} type='button' className='bg-primary hover:bg-auxiliar hover:text-secondary text-xs h-[5rem] !rounded-full w-[5rem] absolute bottom-[3rem] right-[3rem]'>
            Cortesías
        </Button>
    </>
  )
}

export default Index