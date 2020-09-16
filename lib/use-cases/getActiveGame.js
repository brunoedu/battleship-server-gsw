export default class GetActiveGame {
    constructor(gameRepository){
        this._gameRepository = gameRepository
    }

    async Handle(){
        const activeGame = await this._gameRepository.GetActiveGame()
        return activeGame
    }
}