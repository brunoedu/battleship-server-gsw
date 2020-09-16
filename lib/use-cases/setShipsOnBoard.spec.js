import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import SetShipsOnBoard from './setShipsOnBoard'
import GameRepository from '../data'
import { Game } from '../domain'
import { UseCaseError } from '../shared'

const expect = chai.use(chaiAsPromised).expect
let mock = null

describe('SetShipsOnBoard UseCase', () => {
    beforeEach(() => {
        mock = sinon.createSandbox();
    })
    
    afterEach(() => {
        mock.restore();
    });

    it('When not given a playerId should throws an error', async () => {
        // Arrange
        const requestObject = {
            ships: GetValidShips()
        }
        const setShipsOnBoardUseCase = new SetShipsOnBoard(GameRepository)

        // Act
        const useCaseHandle = setShipsOnBoardUseCase.Handle(requestObject)

        // Assert
        expect(useCaseHandle).to.be.rejectedWith(UseCaseError, 'Id de jogador inválido')
    })

    it('When not given ships should throws an error', async () => {
        // Arrange
        const requestObject = {
            playerId: GetValidPlayerId()
        }
        const setShipsOnBoardUseCase = new SetShipsOnBoard(GameRepository)

        // Act
        const useCaseHandle = setShipsOnBoardUseCase.Handle(requestObject)

        // Assert
        expect(useCaseHandle).to.be.rejectedWith(UseCaseError, 'São necessários 5 navios para posicionar')
    })

    it('When not exists an active game should throws an error', async () => {
        // Arrange
        mock.stub(GameRepository, 'GetActiveGame')
            .returns(null)
        const requestObject = {
            playerId: GetValidPlayerId(),
            ships: GetValidShips()
        }
        const setShipsOnBoardUseCase = new SetShipsOnBoard(GameRepository)

        // Act
        const useCaseHandle = setShipsOnBoardUseCase.Handle(requestObject)

        // Assert
        expect(useCaseHandle).to.be.rejectedWith(UseCaseError, 'Jogo ativo não encontrado')
    })

    it('When given valid request object should return game with player ships', async () => {
        // Arrange
        const gameAfterPlayerSetShips = GetNewGame()
        gameAfterPlayerSetShips.SetPlayerShips(GetValidPlayerId(), GetValidShips())

        mock.stub(GameRepository, 'GetActiveGame')
            .returns(GetNewGame())
        mock.stub(GameRepository, 'SaveGame')
            .returns(gameAfterPlayerSetShips)
            
        const requestObject = {
            playerId: GetValidPlayerId(),
            ships: GetValidShips()
        }
        const setShipsOnBoardUseCase = new SetShipsOnBoard(GameRepository)

        // Act
        const game = await setShipsOnBoardUseCase.Handle(requestObject)

        // Assert
        expect(game).to.be.not.null
        expect(game.PlayerOne.Board.Carrier).to.be.not.null
        expect(game.PlayerOne.Board.Battleship).to.be.not.null
        expect(game.PlayerOne.Board.Submarine).to.be.not.null
        expect(game.PlayerOne.Board.Destroyer).to.be.not.null
        expect(game.PlayerOne.Board.Cruiser).to.be.not.null
        expect(game.PlayerTurn).to.be.equal('player2')
    })
})

function GetNewGame(){
    return new Game()
}

function GetValidShips(){
    return [
        { type: 'carrier', positions: [[0,0], [0,1], [0,2], [0,3], [0,4]]},
        { type: 'battleship', positions: [[1,0], [1,1], [1,2], [1,3]]},
        { type: 'submarine', positions: [[2,0], [2,1], [2,2]]},
        { type: 'destroyer', positions: [[3,0], [3,1], [3,2]]},
        { type: 'cruiser', positions: [[4,0], [4,1]]}
    ]
}

function GetValidPlayerId(){
    return 'player1'
}