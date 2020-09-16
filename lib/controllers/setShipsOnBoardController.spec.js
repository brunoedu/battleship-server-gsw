import chai from 'chai'
import sinon from 'sinon'
import { SetShipsOnBoardUseCase } from '../use-cases'
import SetShipsOnBoardControllerBuilder from './setShipsOnBoardController'
import { Game } from '../domain'
import { UseCaseError } from '../shared'
import { Response } from '../helpers'

const SetShipsOnBoardController = SetShipsOnBoardControllerBuilder(SetShipsOnBoardUseCase, Response)

const expect = chai.expect
let mock = null

function GetNewGame(){
    return new Game()
}

describe('Set Ships Controller', () => {
    beforeEach(() => {
        mock = sinon.createSandbox();
    })
    
    afterEach(() => {
        mock.restore();
    });

    it('When use case has success should return 200', async () => {
        // Arrange
        mock.stub(SetShipsOnBoardUseCase, 'Handle')
            .returns(GetNewGame())
        
        // Act
        const response = await SetShipsOnBoardController({})

        // Assert
        expect(response.statusCode).to.be.equal(200)
    })

    it('When use case throws a domain error should return 400', async () => {
        // Arrange
        mock.stub(SetShipsOnBoardUseCase, 'Handle')
            .throws(new UseCaseError('erro'))
        
        // Act
        const response = await SetShipsOnBoardController({})

        // Assert
        expect(response.statusCode).to.be.equal(400)
    })

    it('When use case throws an error should return 500', async () => {
        // Arrange
        mock.stub(SetShipsOnBoardUseCase, 'Handle')
            .throws(new Error('erro'))
        
        // Act
        const response = await SetShipsOnBoardController({})

        // Assert
        expect(response.statusCode).to.be.equal(500)
    })
})