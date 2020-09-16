import chai from 'chai'
import sinon from 'sinon'
import CreateGame from './createGame'
import GameRepository from '../data'
import { Game } from '../domain'

const expect = chai.expect
let mock = null

function GetNewGame(){
    return new Game()
}

describe('CreateGame UseCase', () => {
    beforeEach(() => {
        mock = sinon.createSandbox();
    })
    
    afterEach(() => {
        mock.restore();
    });

    it('When exists an active game should return existing game instance', async () => {
        // Arrange
        mock.stub(GameRepository, 'GetActiveGame')
            .returns(GetNewGame())

        const createGameUseCase = new CreateGame(GameRepository)

        // Act
        const game = await createGameUseCase.Handle()

        // Assert
        expect(game).to.not.be.null
    })

    it('When not exists an active game should return new game instance', async () => {
        // Arrange
        mock.stub(GameRepository, 'GetActiveGame')
            .returns(undefined)
        mock.stub(GameRepository, 'SaveGame')
            .returns(GetNewGame())

        const createGameUseCase = new CreateGame(GameRepository)

        // Act
        const game = await createGameUseCase.Handle()

        // Assert
        expect(game).to.not.be.null
    })
})