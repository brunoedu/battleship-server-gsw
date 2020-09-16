import chai from 'chai'
import Position from './position'

const expect = chai.expect

describe('Position domain', () => {
    describe('Creation', () => {
        it('When given a line less than 0 should throw an error', () => {
            // Arrange
            const line = -1
            const column = 0

            // Act
            const invalidLinePositionCreation = () => {
                new Position(line, column)
            }

            // Assert
            expect(invalidLinePositionCreation).to.throw(Error, 'Linha não pode ser menor do que 0')
        })

        it('When given a column less than 0 should throw an error', () => {
            // Arrange
            const column = -1
            const line = 0

            // Act
            const invalidColumnPositionCreation = () => {
                new Position(line, column)
            }

            // Assert
            expect(invalidColumnPositionCreation).to.throw(Error, 'Coluna não pode ser menor do que 0')
        })

        it('When given a line greater than 9 should throw an error', () => {
            // Arrange
            const line = 10
            const column = 0

            // Act
            const invalidLinePositionCreation = () => {
                new Position(line, column)
            }

            // Assert
            expect(invalidLinePositionCreation).to.throw(Error, 'Linha não pode ser maior do que 9')
        })

        it('When given a column less than 0 should throw an error', () => {
            // Arrange
            const column = 10
            const line = 0

            // Act
            const invalidColumnPositionCreation = () => {
                new Position(line, column)
            }

            // Assert
            expect(invalidColumnPositionCreation).to.throw(Error, 'Coluna não pode ser maior do que 9')
        })

        it('When called constructor should create a position', () => {
            // Arrange
            const line = 0
            const column = 0

            // Act
            const position = new Position(line, column)

            // Assert
            expect(position).to.not.be.null
            expect(position.Line).to.be.equal(line)
            expect(position.Column).to.be.equal(column)
        })
    })

    describe('Is Overlapping Position', () => {
        it('When given an overlaping position should return true', () => {
            // Arrange
            const line = 0
            const column = 0
            const position = new Position(line, column)
            const overlappingPosition = new Position(line, column)

            // Act
            const isOverlappingPosition = position.IsOverlappingPosition(overlappingPosition)

            // Assert
            expect(isOverlappingPosition).to.be.true
        })

        it('When given a not overlaping position return false', () => {
            // Arrange
            const line = 0
            const lineTwo = 1
            const column = 0
            const columnTwo = 1
            const position = new Position(line, column)
            const overlappingPosition = new Position(lineTwo, columnTwo)

            // Act
            const isOverlappingPosition = position.IsOverlappingPosition(overlappingPosition)

            // Assert
            expect(isOverlappingPosition).to.be.false
        })
    })
})