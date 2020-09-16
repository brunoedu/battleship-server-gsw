import { Game } from '../domain'

export default class CreateGame {
    constructor(gameRepository){
        this._gameRepository = gameRepository
    }

    async Handle(){
        const activeGame = await this._gameRepository.GetActiveGame()
        if(activeGame)
            return activeGame

        const newGame = new Game()
        await this._gameRepository.SaveGame(newGame)

        return newGame
    }
}