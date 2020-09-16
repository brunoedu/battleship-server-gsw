import { GameStatus, Game, Ship } from '../../domain'
import GameSchema from '../schemas'

export default class GameRepository {
    constructor() {
        this._model = GameSchema
    }

    async GetActiveGame(){
        const result = await this._model.findOne({Status: GameStatus.InProgress})
        return ConvertModelToDomain(result)
    }

    async SaveGame(game){
        const existentGame = await this.GetActiveGame()
        if(existentGame)
            await this._model.updateOne({Status: GameStatus.InProgress}, game)
        else
            await this._model.create(game)
        
        const result = this.GetActiveGame()

        return result
    }
}

function GetShipAssign(ship, modelShip){
    if(!modelShip) return null

    if(!ship)
        ship = Ship.ShipCreationFromModel(modelShip.Positions)

    return Object.assign(ship, modelShip, {
        Positions: Object.assign([], ship.Positions)
    })
}

function ConvertModelToDomain(model){
    if(!model) return null
    
    let game = new Game()
    let convertedGame = Object.assign(game, model, {
        CreationDate: model.CreationDate,
        Status: model.Status,
        PlayerTurn: model.PlayerTurn,
        PlayerOne: Object.assign(game.PlayerOne, model.PlayerOne, {
            Board: Object.assign(game.PlayerOne.Board, model.PlayerOne.Board, {
                Carrier: GetShipAssign(game.PlayerOne.Board.Carrier, model.PlayerOne.Board.Carrier),
                Battleship: GetShipAssign(game.PlayerOne.Board.Battleship, model.PlayerOne.Board.Battleship),
                Submarine: GetShipAssign(game.PlayerOne.Board.Submarine, model.PlayerOne.Board.Submarine),
                Destroyer: GetShipAssign(game.PlayerOne.Board.Destroyer, model.PlayerOne.Board.Destroyer),
                Cruiser: GetShipAssign(game.PlayerOne.Board.Cruiser, model.PlayerOne.Board.Cruiser),
                Hits: Object.assign(game.PlayerOne.Board.Hits, model.PlayerOne.Board.Hits)
            })
        }),
        PlayerTwo: Object.assign(game.PlayerTwo, model.PlayerTwo, {
            Board: Object.assign(game.PlayerTwo.Board, model.PlayerTwo.Board, {
                Carrier: GetShipAssign(game.PlayerTwo.Board.Carrier, model.PlayerTwo.Board.Carrier),
                Battleship: GetShipAssign(game.PlayerTwo.Board.Battleship, model.PlayerTwo.Board.Battleship),
                Submarine: GetShipAssign(game.PlayerTwo.Board.Submarine, model.PlayerTwo.Board.Submarine),
                Destroyer: GetShipAssign(game.PlayerTwo.Board.Destroyer, model.PlayerTwo.Board.Destroyer),
                Cruiser: GetShipAssign(game.PlayerTwo.Board.Cruiser, model.PlayerTwo.Board.Cruiser),
                Hits: Object.assign(game.PlayerTwo.Board.Hits, model.PlayerTwo.Board.Hits)
            })
        })
    })

    delete convertedGame.$__
    delete convertedGame.isNew
    delete convertedGame._doc
    delete convertedGame.$locals
    delete convertedGame.$init

    return convertedGame
}