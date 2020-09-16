import chai from 'chai'
import sinon from 'sinon'
import { GetActiveGameUseCase } from '../use-cases'
import GetActiveGameControllerBuilder from './getActiveGameController'
import { Game } from '../domain'
import { DomainError } from '../shared'
import { Response } from '../helpers'

const GetActiveGameController = GetActiveGameControllerBuilder(GetActiveGameUseCase, Response)

const expect = chai.expect
let mock = null

function GetNewGame(){
    return new Game()
}

describe('Get Active Game Controller', () => {
    beforeEach(() => {
        mock = sinon.createSandbox();
    })
    
    afterEach(() => {
        mock.restore();
    });

    it('When use case has success should return 200', async () => {
        // Arrange
        mock.stub(GetActiveGameUseCase, 'Handle')
            .returns(GetNewGame())
        
        // Act
        const response = await GetActiveGameController({})

        // Assert
        expect(response.statusCode).to.be.equal(200)
    })

    it('When use case throws a domain error should return 400', async () => {
        // Arrange
        mock.stub(GetActiveGameUseCase, 'Handle')
            .throws(new DomainError('erro'))
        
        // Act
        const response = await GetActiveGameController({})

        // Assert
        expect(response.statusCode).to.be.equal(400)
    })

    it('When use case throws an error should return 500', async () => {
        // Arrange
        mock.stub(GetActiveGameUseCase, 'Handle')
            .throws(new Error('erro'))
        
        // Act
        const response = await GetActiveGameController({})

        // Assert
        expect(response.statusCode).to.be.equal(500)
    })
})