import React from 'react'
import axios from 'axios'
import Loader from '@/components/Loader'

interface ComponentProps {
  endpoint: string
}

const Index: React.FC<ComponentProps> = ({ endpoint }) => {

  const [content, setContent] = React.useState<string>('')
  const [loaderActive, setLoaderActive] = React.useState<boolean>(false)

  const handleResponse = (message: string) => {
    setContent(message)
    setLoaderActive(false)
  }

  const handleResponseFailed = (message: string) => {
    setContent(message)
    setLoaderActive(false)
  }

  React.useEffect(() => {
    setLoaderActive(true)
    try {
      axios.get(`${process.env.BACK_LINK}/api/${endpoint}`)
      .then((res) => handleResponse(res.data.answer))
      .catch((err) => handleResponseFailed('Error consultando la información'))
    } catch(err) {
      console.error(err)
    }
  }, [endpoint])

  return (
    <div className='w-7/12 max-h-[50rem] border-2 border-purple-300 mx-auto overflow-y-auto'>
      <Loader active={loaderActive} />
      <pre className='p-2'>
        {content}
      </pre>
    </div>
  )
}

export default Index