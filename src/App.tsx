import { useState } from 'react'
import Button from './components/core/Button'
import Modal from './components/core/Modal'
import Tooltip from './components/core/Tooltip'

function App() {
  const [state, setState] = useState(false)

  return (
    <div className='App'>
      <Button
        className='border-2'
        onClick={() => {
          setState(!state)
        }}
      >
        <p className=''>Hihihi</p>
      </Button>
      <Modal open={state} onClose={() => setState(false)}>
        <div className='bg-white rounded-lg w-24 h-24 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          Hehehehehe
        </div>
      </Modal>
      <Tooltip title='Ai lop diu so much luon a' placement='right'>
        <p>Con ga den</p>
      </Tooltip>
    </div>
  )
}

export default App
