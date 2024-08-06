import React from 'react'
import Image from 'next/image'
import './index.css'

interface ComponentProps {
    children: JSX.Element
    state: boolean
    setState: React.Dispatch<React.SetStateAction<boolean>>
}

const Index: React.FC<ComponentProps> = ({ children, state, setState}) => {

    return (
        <>
            { state &&
                <div className='modal-general'>
                    <main className='relative modal shadow-lg bg-auxiliar p-6'>
                        <button 
                            className='close-modal-icon cursor-pointer'
                            onClick={() => setState(!state)}
                        > 
                            <Image src='/assets/close-icon.svg' width={25} height={25} alt='cerrar' />
                        </button>
                        <div className='h-full w-full px-12'>
                            {children}
                        </div>
                    </main>
                </div>
            }
        </>
    )
}

export default Index