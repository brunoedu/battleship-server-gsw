import chai from 'chai'
import { Battleship } from '.'
import Config from '../../configurations'
import Position from '../positions'
import { DomainError } from '../../shared'

const expect = chai.expect

const invalidSizeErrorMessage = `Encouraçado precisa ter ${Config.BattleshipShipSize} posiçōes`

describe('Battleship Ship domain', () => {
    it('When not given positions should throw an error', () => {
        // Arrange
        const invalidPositions = null

        // Act
        const invalidPositionsBattleshipCreation = () => {
            new Battleship(invalidPositions)
        }

        // Assert
        expect(invalidPositionsBattleshipCreation).to.throw(DomainError, invalidSizeErrorMessage)
    })

    it('When given invalid size positions should throw an error', () => {
        // Arrange
        const invalidPositions = [
            new Position(0, 0)
        ]

        // Act
        const invalidPositionsBattleshipCreation = () => {
            new Battleship(invalidPositions)
        }

        // Assert
        expect(invalidPositionsBattleshipCreation).to.throw(DomainError, invalidSizeErrorMessage)
    })

    it('When given positions should create a Battleship ship', () => {
        // Arrange
        const positions = [
            new Position(0, 0),
            new Position(0, 1),
            new Position(0, 2),
            new Position(0, 3)
        ]

        // Act
        const battleship = new Battleship(positions)

        // Assert
        expect(battleship).to.not.be.null
    })
})