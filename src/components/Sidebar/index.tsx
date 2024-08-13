"use client"
import React from 'react'
import Button from '@/components/Button'
import { useRouter } from 'next/navigation'
import { useItem } from '@/context/itemContext'
import Cookies from 'js-cookie'
import SideHeader from '@/components/SideHeader'
import UserInfo from '@/components/UserInfo'

const Index = () => {

    const router = useRouter()
    const styles: string[] = ['bg-secondary hover:bg-auxiliar hover:text-secondary text-xs w-1/2', 'bg-white hover:bg-auxiliar !text-black text-xs w-1/2']
    const [user, setUser] = React.useState<any>()
    const { item, setItem } = useItem()

    React.useEffect(() => {
      try {
        const userLogged = localStorage.getItem('USERNAME')
        if (userLogged) {
          setUser(userLogged)
        }
      } catch (error) {
        console.error('Error al renderizar --> ', error)
      }
    }, [])

    const handleLogout = () => {
      Cookies.remove('SessionInfo')
      setTimeout(() => {
        router.push('/')
      }, 2000);
    }

    const handleChange = (id: number) => {
      router.push('/main')
      setItem(id)
    }

  return (
    <aside className="bg-primary w-[40vh] h-screen relative py-12 rounded-r-[4rem]">
      <SideHeader to="/main" />
      <div className="buttons flex flex-col gap-4">
      <Button 
          onClick={() => handleChange(0)} 
          type="button" 
          className={`${item == 0 ? styles[0] : styles[1]}`} 
        >
          Pagos Exitosos
        </Button>
        <Button 
          onClick={() => handleChange(1)} 
          type="button" 
          className={`${item == 1 ? styles[0] : styles[1]}`} 
        >
          Pagos No Exitosos
        </Button>
        <Button 
          onClick={() => handleChange(2)} 
          type="button" 
          className={`${item == 2 ? styles[0] : styles[1]}`} 
        >
          Informe Registros
        </Button>
        <Button 
          onClick={() => handleChange(3)} 
          type="button" 
          className={`${item == 3 ? styles[0] : styles[1]}`} 
        >
          Informe Preguntas
        </Button>
      </div>
      <UserInfo props = {{user, handleLogout}} />
    </aside>
  )
}

export default Index