import { UseCaseError } from '../shared';

export default class SetShipsOnBoard {
    constructor(gameRepository){
        this._gameRepository = gameRepository
    }

    async Handle({playerId, ships}){
        HandleRequestObjectValidation({playerId, ships})

        let game = await this._gameRepository.GetActiveGame()
        if(!game)
            throw new UseCaseError('Jogo ativo não encontrado', 404)

        game.SetPlayerShips(playerId, ships)

        game = await this._gameRepository.SaveGame(game)

        return game
    }
}

function HandleRequestObjectValidation({playerId, ships}){
    if(!playerId)
        throw new UseCaseError('Id de jogador inválido', 400)
    if(!ships || ships.length != 5)
        throw new UseCaseError('São necessários 5 navios para posicionar', 400)
}