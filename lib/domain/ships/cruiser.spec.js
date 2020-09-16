import chai from 'chai'
import { Cruiser } from '.'
import Config from '../../configurations'
import Position from '../positions'
import { DomainError } from '../../shared'

const expect = chai.expect

const invalidSizeErrorMessage = `Cruzador precisa ter ${Config.CruiserShipSize} posiçōes`

describe('Cruiser Ship domain', () => {
    it('When not given positions should throw an error', () => {
        // Arrange
        const invalidPositions = null

        // Act
        const invalidPositionsCruiserCreation = () => {
            new Cruiser(invalidPositions)
        }

        // Assert
        expect(invalidPositionsCruiserCreation).to.throw(DomainError, invalidSizeErrorMessage)
    })

    it('When given invalid size positions should throw an error', () => {
        // Arrange
        const invalidPositions = [
            new Position(0, 0)
        ]

        // Act
        const invalidPositionsCruiserCreation = () => {
            new Cruiser(invalidPositions)
        }

        // Assert
        expect(invalidPositionsCruiserCreation).to.throw(DomainError, invalidSizeErrorMessage)
    })

    it('When given positions should create a Cruiser ship', () => {
        // Arrange
        const positions = [
            new Position(0, 0),
            new Position(0, 1)
        ]

        // Act
        const cruiser = new Cruiser(positions)

        // Assert
        expect(cruiser).to.not.be.null
    })
})