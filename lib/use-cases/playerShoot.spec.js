import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import PlayerShoot from './playerShoot'
import GameRepository from '../data'
import { Game } from '../domain'
import { UseCaseError } from '../shared'

const expect = chai.use(chaiAsPromised).expect
let mock = null

describe('PlayerShoot UseCase', () => {
    beforeEach(() => {
        mock = sinon.createSandbox();
    })
    
    afterEach(() => {
        mock.restore();
    });

    it('When not given a playerId should throws an error', async () => {
        // Arrange
        const requestObject = {
            position: GetValidPosition()
        }
        const playerShootUseCase = new PlayerShoot(GameRepository)

        // Act
        const useCaseHandle = playerShootUseCase.Handle(requestObject)

        // Assert
        expect(useCaseHandle).to.be.rejectedWith(UseCaseError, 'Id de jogador inválido')
    })

    it('When not given position should throws an error', async () => {
        // Arrange
        const requestObject = {
            playerId: GetValidPlayerId()
        }
        const playerShootUseCase = new PlayerShoot(GameRepository)

        // Act
        const useCaseHandle = playerShootUseCase.Handle(requestObject)

        // Assert
        expect(useCaseHandle).to.be.rejectedWith(UseCaseError, 'É necessário uma posição válida para atirar')
    })

    it('When not exists an active game should throws an error', async () => {
        // Arrange
        mock.stub(GameRepository, 'GetActiveGame')
            .returns(null)
        const requestObject = {
            playerId: GetValidPlayerId(),
            position: GetValidPosition()
        }
        const playerShootUseCase = new PlayerShoot(GameRepository)

        // Act
        const useCaseHandle = playerShootUseCase.Handle(requestObject)

        // Assert
        expect(useCaseHandle).to.be.rejectedWith(UseCaseError, 'Jogo ativo não encontrado')
    })

    it('When given valid request object should return game with player ships', async () => {
        // Arrange
        const gameAfterPlayerSetShips = GetGameWithShipsPlaced()
        gameAfterPlayerSetShips.PlayerShoot(GetValidPlayerId(), GetValidPosition())

        mock.stub(GameRepository, 'GetActiveGame')
            .returns(GetNewGame())
        mock.stub(GameRepository, 'SaveGame')
            .returns(gameAfterPlayerSetShips)
            
        const requestObject = {
            playerId: GetValidPlayerId(),
            position: GetValidPosition()
        }
        const playerShootUseCase = new PlayerShoot(GameRepository)

        // Act
        const game = await playerShootUseCase.Handle(requestObject)

        // Assert
        expect(game).to.be.not.null
        expect(game.PlayerTwo.Board.Hits).to.be.not.empty
        expect(game.PlayerTwo.Board.Hits[0].Position.Line).to.be.equal(0)
        expect(game.PlayerTwo.Board.Hits[0].Position.Column).to.be.equal(0)
        expect(game.PlayerTwo.Board.Hits[0].IsShipHit).to.be.true
        expect(game.PlayerTurn).to.be.equal('player2')
    })
})

function GetNewGame(){
    return new Game()
}

function GetValidPosition(){
    return [0,0]
}

function GetValidPlayerId(){
    return 'player1'
}

function GetShips(){
    return [
        { type: 'carrier', positions: [[0,0], [0,1], [0,2], [0,3], [0,4]]},
        { type: 'battleship', positions: [[1,0], [1,1], [1,2], [1,3]]},
        { type: 'submarine', positions: [[2,0], [2,1], [2,2]]},
        { type: 'destroyer', positions: [[3,0], [3,1], [3,2]]},
        { type: 'cruiser', positions: [[4,0], [4,1]]}
    ]
}

function GetGameWithShipsPlaced(){
    const game = new Game()
    game.SetPlayerShips('player1', GetShips())
    game.SetPlayerShips('player2', GetShips())
    return game
}