import { 
    CreateGameUseCase, 
    GetActiveGameUseCase, 
    SetShipsOnBoardUseCase,
    PlayerShootUseCase 
} from '../use-cases'
import { Response } from '../helpers'
import CreateGameControllerBuilder from './createGameController'
import GetActiveGameControllerBuilder from './getActiveGameController'
import SetShipsOnBoardControllerBuilder from './setShipsOnBoardController'
import PlayerShootControllerBuilder from './playerShootController'

const CreateGameController = CreateGameControllerBuilder(CreateGameUseCase, Response)
const GetActiveGameController = GetActiveGameControllerBuilder(GetActiveGameUseCase, Response)
const SetShipsOnBoardController = SetShipsOnBoardControllerBuilder(SetShipsOnBoardUseCase, Response)
const PlayerShootController = PlayerShootControllerBuilder(PlayerShootUseCase, Response)

export { 
    CreateGameController,
    GetActiveGameController,
    SetShipsOnBoardController,
    PlayerShootController
}