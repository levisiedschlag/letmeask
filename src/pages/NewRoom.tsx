import { Link, useNavigate } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'
import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth';
import { ref, set } from "firebase/database";

export function NewRoom() {
  const {user} = useAuth()
  const [newRoom, setNewRoom] = useState('')
  const navigate = useNavigate()

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault()
    if (newRoom.trim() === '') {
      return;
    }
    await set(ref(database, 'rooms/' + newRoom + user?.id), {
      title: newRoom,
      authorId: user?.id,
    })
    navigate(`/rooms/${newRoom + user?.id}`)
  }

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
            
            <form onSubmit={handleCreateRoom}>
              <input 
              type="text" 
              placeholder='Nome da sala'
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
              />
              <Button type='submit'>Criar sala</Button>
            </form>
            <p>Deseja entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
          </div>
        </main>
    </div>
  )
}
