import chai from 'chai'
import Ship from './ship'
import Position from '../positions'
import { DomainError } from '../../shared'

const expect = chai.expect

class TestShip extends Ship{
    constructor(positions){
        super(positions)
    }
}

describe('Ship domain', () => {
    describe('Creation', () => {
        it('When called constructor of an abstract ship should trhow an error', () => {
            // Act
            const shipAbstractCreation = () => {
                new Ship()
            }

            // Assert
            expect(shipAbstractCreation).to.throw(TypeError, 'Não é possível instanciar um navio abstrato')
        })

        it('When given repeated positions should throw an error', () => {
            // Arrange
            const repeatedPositions = [
                new Position(0, 0),
                new Position(0, 0)
            ]

            // Act
            const repeatedPositionsCreation = () => {
                new TestShip(repeatedPositions)
            }

            // Assert
            expect(repeatedPositionsCreation).to.throw(DomainError, 'Não é possível criar um navio com posições repetidas')
        })

        it('When given positions not in sequence should throw an error', () => {
            // Arrange
            const notInSequencePositions = [
                new Position(0, 0),
                new Position(3, 5)
            ]

            // Act
            const notInSequencePositionsCreation = () => {
                new TestShip(notInSequencePositions)
            }

            // Assert
            expect(notInSequencePositionsCreation).to.throw(DomainError, 'As posições precisam estar em sequência')
        })
    })

    describe('Has Overlapping Positions', () => {
        it('When given overlaping positions should return true', () => {
            // Arrange
            const positions = [
                new Position(0, 0),
                new Position(0, 1)
            ]
            const ship = new TestShip(positions)
            const overlappingPositions = [
                new Position(0, 1)
            ]

            // Act
            const hasOverlappingPosition = ship.HasOverlappingPositions(overlappingPositions)

            // Assert
            expect(hasOverlappingPosition).to.be.true
        })
        it('When given not overlaping positions should return false', () => {
            // Arrange
            const positions = [
                new Position(0, 0),
                new Position(0, 1)
            ]
            const ship = new TestShip(positions)
            const notOverlappingPositions = [
                new Position(1, 1)
            ]

            // Act
            const hasOverlappingPosition = ship.HasOverlappingPositions(notOverlappingPositions)

            // Assert
            expect(hasOverlappingPosition).to.be.false
        })
    })
})