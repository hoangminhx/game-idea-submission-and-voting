import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import MainLayout from './features/layouts/MainLayout'
import GameIdeasPage from './features/game-ideas/GameIdeasPage'

function App() {
  return (
    <MainLayout>
      <GameIdeasPage />
    </MainLayout>
  )
}

export default App
