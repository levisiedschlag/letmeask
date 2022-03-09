import { useNavigate } from 'react-router-dom'
import { child, DataSnapshot, get, ref } from "firebase/database";
import { FormEvent, useState } from 'react'

import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase';

import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss'

export function Home() {
  const navigate = useNavigate()
  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState('')

  async function handleCreateRoom () {
    if (!user) {
      await signInWithGoogle()
    }
      navigate('/rooms/new')
  }

  // DECLARAR EVENTO AO USAR FORMULARIO
  async function handleJoinRoom (event: FormEvent) {
    event.preventDefault()
    if (roomCode.trim() === ''){
      return;
    }
    const dbRef = ref(database)
    get(child(dbRef, `rooms/${roomCode}`))
    .then((snapshot) => {
      if (!snapshot.exists()) {
        alert('Room could not be found');
        return;
      }
    navigate(`/rooms/${roomCode}`)
  })}


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
            <button className='create-room' onClick={handleCreateRoom}>
              <img src={googleIconImg} alt="Icon" />
              Crie sua sala com o Google
            </button>
            <div className='separator'>
              ou entre em uma sala
            </div>
            <form onSubmit={handleJoinRoom}>
              <input 
              type="text" 
              placeholder='Digite o código da sala'
              name="" 
              id="" 
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
              />
              <Button type='submit'>Entrar na sala</Button>
            </form>
          </div>
        </main>
    </div>
  )
}
