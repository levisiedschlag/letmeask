import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'



export function NewRoom() {

  const {user} = useContext(AuthContext)

  return (
    <div id='page-auth'>
        <aside>
            <img src={ilustrationImg} alt="Ilustração" />
            <strong>Crie salas de Q&amp;A ao vivo</strong>
            <p>Tirea as dúvidas da sua audiência em tempo real</p>
        </aside>
        <main>
          <div className='main-content'>
            <img src={logoImg} alt="letmeask" />
            <h2>Criar nova sala</h2>
            
            <form>
              <input 
              type="text" 
              placeholder='Nome da sala'
              />
              <Button type='submit'>Criar sala</Button>
            </form>
            <p>Deseja entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
          </div>
        </main>
    </div>
  )
}
