import chai from 'chai'
import sinon from 'sinon'
import { CreateGameUseCase } from '../use-cases'
import CreateGameControllerBuilder from './createGameController'
import { Game } from '../domain'
import { DomainError } from '../shared'
import { Response } from '../helpers'

const CreateGameController = CreateGameControllerBuilder(CreateGameUseCase, Response)

const expect = chai.expect
let mock = null

function GetNewGame(){
    return new Game()
}

describe('Create Game Controller', () => {
    beforeEach(() => {
        mock = sinon.createSandbox();
    })
    
    afterEach(() => {
        mock.restore();
    });

    it('When use case has success should return 201', async () => {
        // Arrange
        mock.stub(CreateGameUseCase, 'Handle')
            .returns(GetNewGame())
        
        // Act
        const response = await CreateGameController({})

        // Assert
        expect(response.statusCode).to.be.equal(201)
    })

    it('When use case throws a domain error should return 400', async () => {
        // Arrange
        mock.stub(CreateGameUseCase, 'Handle')
            .throws(new DomainError('erro'))
        
        // Act
        const response = await CreateGameController({})

        // Assert
        expect(response.statusCode).to.be.equal(400)
    })

    it('When use case throws an error should return 500', async () => {
        // Arrange
        mock.stub(CreateGameUseCase, 'Handle')
            .throws(new Error('erro'))
        
        // Act
        const response = await CreateGameController({})

        // Assert
        expect(response.statusCode).to.be.equal(500)
    })
})