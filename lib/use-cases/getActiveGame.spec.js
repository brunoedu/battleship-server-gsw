import chai from 'chai'
import sinon from 'sinon'
import GetActiveGame from './getActiveGame'
import GameRepository from '../data'
import { Game } from '../domain'

const expect = chai.expect
let mock = null

function GetNewGame(){
    return new Game()
}

describe('GetActiveGame UseCase', () => {
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

        const getActiveGameUseCase = new GetActiveGame(GameRepository)

        // Act
        const game = await getActiveGameUseCase.Handle()

        // Assert
        expect(game).to.not.be.null
    })

    it('When not exists an active game should return null', async () => {
        // Arrange
        mock.stub(GameRepository, 'GetActiveGame')
            .returns(null)

        const getActiveGameUseCase = new GetActiveGame(GameRepository)

        // Act
        const game = await getActiveGameUseCase.Handle()

        // Assert
        expect(game).to.be.null
    })
})