import chai from 'chai'
import { Destroyer } from '.'
import Config from '../../configurations'
import Position from '../positions'
import { DomainError } from '../../shared'

const expect = chai.expect

const invalidSizeErrorMessage = `Destroyer precisa ter ${Config.DestroyerShipSize} posiçōes`

describe('Destroyer Ship domain', () => {
    it('When not given positions should throw an error', () => {
        // Arrange
        const invalidPositions = null

        // Act
        const invalidPositionsDestroyerCreation = () => {
            new Destroyer(invalidPositions)
        }

        // Assert
        expect(invalidPositionsDestroyerCreation).to.throw(DomainError, invalidSizeErrorMessage)
    })

    it('When given invalid size positions should throw an error', () => {
        // Arrange
        const invalidPositions = [
            new Position(0, 0)
        ]

        // Act
        const invalidPositionsDestroyerCreation = () => {
            new Destroyer(invalidPositions)
        }

        // Assert
        expect(invalidPositionsDestroyerCreation).to.throw(DomainError, invalidSizeErrorMessage)
    })

    it('When given positions should create a Destroyer ship', () => {
        // Arrange
        const positions = [
            new Position(0, 0),
            new Position(0, 1),
            new Position(0, 2)
        ]

        // Act
        const destroyer = new Destroyer(positions)

        // Assert
        expect(destroyer).to.not.be.null
    })
})