import { UseCaseError } from '../shared';

export default class PlayerShoot {
    constructor(gameRepository){
        this._gameRepository = gameRepository
    }

    async Handle({playerId, position}){
        HandleRequestObjectValidation({playerId, position})

        let game = await this._gameRepository.GetActiveGame()
        if(!game)
            throw new UseCaseError('Jogo ativo não encontrado', 404)

        game.PlayerShoot(playerId, position)

        game = await this._gameRepository.SaveGame(game)

        return game
    }
}

function HandleRequestObjectValidation({playerId, position}){
    if(!playerId)
        throw new UseCaseError('Id de jogador inválido', 400)
    if(!position || position.length != 2)
        throw new UseCaseError('É necessário uma posição válida para atirar', 400)
}