import React from 'react'
import axios from 'axios'

const Index = () => {

  const [content, setContent] = React.useState<string>('')

  React.useEffect(() => {
    try {
      axios.get(`${process.env.BACK_LINK}/api/informePreguntas`)
      .then((res) => setContent(res.data.answer))
      .catch((err) => setContent('Error consultando la información'))
    } catch(err) {
      console.error(err)
    }
  }, [])

  return (
    <div className='w-1/3 border-2 border-purple-300 mx-auto aspect-square'>
      {content}
    </div>
  )
}

export default Index