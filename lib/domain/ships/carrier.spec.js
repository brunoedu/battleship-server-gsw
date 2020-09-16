import chai from 'chai'
import { Carrier } from '.';
import Config from '../../configurations'
import Position from '../positions'
import { DomainError } from '../../shared'

const expect = chai.expect

const invalidSizeErrorMessage = `Porta-avião precisa ter ${Config.CarrierShipSize} posiçōes`

describe('Carrier Ship domain', () => {
    it('When not given positions should throw an error', () => {
        // Arrange
        const invalidPositions = null

        // Act
        const invalidPositionsCarrierCreation = () => {
            new Carrier(invalidPositions)
        }

        // Assert
        expect(invalidPositionsCarrierCreation).to.throw(DomainError, invalidSizeErrorMessage)
    })

    it('When given invalid size positions should throw an error', () => {
        // Arrange
        const invalidPositions = [
            new Position(0, 0)
        ]

        // Act
        const invalidPositionsCarrierCreation = () => {
            new Carrier(invalidPositions)
        }

        // Assert
        expect(invalidPositionsCarrierCreation).to.throw(DomainError, invalidSizeErrorMessage)
    })

    it('When given positions should create a Carrier ship', () => {
        // Arrange
        const positions = [
            new Position(0, 0),
            new Position(0, 1),
            new Position(0, 2),
            new Position(0, 3),
            new Position(0, 4)
        ]

        // Act
        const carrier = new Carrier(positions)

        // Assert
        expect(carrier).to.not.be.null
    })
})