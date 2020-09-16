import CallbackHandler from '../adapters/express-callback-handler'
import { 
    CreateGameController, 
    GetActiveGameController, 
    SetShipsOnBoardController, 
    PlayerShootController 
} from '../controllers'

export default function SetUpRoutes(app){
    app.get('/game', CallbackHandler(GetActiveGameController))
    app.post('/game', CallbackHandler(CreateGameController))
    app.put('/game/ships', CallbackHandler(SetShipsOnBoardController))
    app.put('/game/shoot', CallbackHandler(PlayerShootController))
}