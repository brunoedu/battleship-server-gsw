import chai from 'chai'
import { Submarine } from '.'
import Config from '../../configurations'
import Position from '../positions'
import { DomainError } from '../../shared'

const expect = chai.expect

const invalidSizeErrorMessage = `Submarino precisa ter ${Config.SubmarineShipSize} posiçōes`

describe('Submarine Ship domain', () => {
    it('When not given positions should throw an error', () => {
        // Arrange
        const invalidPositions = null

        // Act
        const invalidPositionsSubmarineCreation = () => {
            new Submarine(invalidPositions)
        }

        // Assert
        expect(invalidPositionsSubmarineCreation).to.throw(DomainError, invalidSizeErrorMessage)
    })

    it('When given invalid size positions should throw an error', () => {
        // Arrange
        const invalidPositions = [
            new Position(0, 0)
        ]

        // Act
        const invalidPositionsSubmarineCreation = () => {
            new Submarine(invalidPositions)
        }

        // Assert
        expect(invalidPositionsSubmarineCreation).to.throw(DomainError, invalidSizeErrorMessage)
    })

    it('When given positions should create a Submarine ship', () => {
        // Arrange
        const positions = [
            new Position(0, 0),
            new Position(0, 1),
            new Position(0, 2)
        ]

        // Act
        const submarine = new Submarine(positions)

        // Assert
        expect(submarine).to.not.be.null
    })
})