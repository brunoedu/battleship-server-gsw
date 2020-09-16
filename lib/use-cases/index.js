import GameRepository from '../data'
import CreateGame from './createGame'
import GetActiveGame from './getActiveGame'
import SetShipsOnBoard from './setShipsOnBoard'
import PlayerShoot from './playerShoot'

const CreateGameUseCase = new CreateGame(GameRepository)
const GetActiveGameUseCase = new GetActiveGame(GameRepository)
const SetShipsOnBoardUseCase = new SetShipsOnBoard(GameRepository)
const PlayerShootUseCase = new PlayerShoot(GameRepository)

export {
    CreateGameUseCase,
    GetActiveGameUseCase,
    SetShipsOnBoardUseCase,
    PlayerShootUseCase
}