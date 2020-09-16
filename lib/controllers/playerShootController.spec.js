import chai from 'chai'
import sinon from 'sinon'
import { PlayerShootUseCase } from '../use-cases'
import PlayerShootControllerBuilder from './playerShootController'
import { Game } from '../domain'
import { UseCaseError } from '../shared'
import { Response } from '../helpers'

const PlayerShootController = PlayerShootControllerBuilder(PlayerShootUseCase, Response)

const expect = chai.expect
let mock = null

function GetNewGame(){
    return new Game()
}

describe('Player Shoot Controller', () => {
    beforeEach(() => {
        mock = sinon.createSandbox();
    })
    
    afterEach(() => {
        mock.restore();
    });

    it('When use case has success should return 200', async () => {
        // Arrange
        mock.stub(PlayerShootUseCase, 'Handle')
            .returns(GetNewGame())
        
        // Act
        const response = await PlayerShootController({})

        // Assert
        expect(response.statusCode).to.be.equal(200)
    })

    it('When use case throws a domain error should return 400', async () => {
        // Arrange
        mock.stub(PlayerShootUseCase, 'Handle')
            .throws(new UseCaseError('erro'))
        
        // Act
        const response = await PlayerShootController({})

        // Assert
        expect(response.statusCode).to.be.equal(400)
    })

    it('When use case throws an error should return 500', async () => {
        // Arrange
        mock.stub(PlayerShootUseCase, 'Handle')
            .throws(new Error('erro'))
        
        // Act
        const response = await PlayerShootController({})

        // Assert
        expect(response.statusCode).to.be.equal(500)
    })
})