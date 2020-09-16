import chai from 'chai'
import Board from './board'
import Hit from '../hits'
import Position from '../positions'

const expect = chai.expect

describe('Board domain', () => {
    describe('Creation', () => {
        it('When called constructor should create a board', () => {
            // Act
            const board = new Board()

            // Assert
            expect(board).to.not.be.null
            expect(board.Carrier).to.be.null
            expect(board.Battleship).to.be.null
            expect(board.Submarine).to.be.null
            expect(board.Destroyer).to.be.null
            expect(board.Cruiser).to.be.null
        })
    })
    describe('Set ships', () => {
        it('When not given ships should throw an error', () => {
            // Arrange
            const ships = null
            const board = new Board()

            // Act
            const setShipsFunction = () => {
                board.SetShips(ships)
            }

            // Assert
            expect(setShipsFunction).to.throw(Error, 'São necessários 5 navios para iniciar o jogo')
        })

        it('When not given 5 ships should throw an error', () => {
            // Arrange
            const ships = [
                { type: 'carrier', positions: [[0,0], [0,1]]}
            ]
            const board = new Board()

            // Act
            const setShipsFunction = () => {
                board.SetShips(ships)
            }

            // Assert
            expect(setShipsFunction).to.throw(Error, 'São necessários 5 navios para iniciar o jogo')
        })

        it('When given invalid ships types should throw an error', () => {
            // Arrange
            const ships = [
                { type: 'invalid_type', positions: [[0,0], [0,1]]},
                { type: 'invalid_type', positions: [[0,0], [0,1]]},
                { type: 'invalid_type', positions: [[0,0], [0,1]]},
                { type: 'invalid_type', positions: [[0,0], [0,1]]},
                { type: 'invalid_type', positions: [[0,0], [0,1]]}
            ]
            const board = new Board()

            // Act
            const setShipsFunction = () => {
                board.SetShips(ships)
            }

            // Assert
            expect(setShipsFunction).to.throw(Error, 'Existem tipos de navios inválidos')
        })

        it('When given repeated ships types should throw an error', () => {
            // Arrange
            const ships = [
                { type: 'carrier', positions: [[0,0], [0,1]]},
                { type: 'carrier', positions: [[0,0], [0,1]]},
                { type: 'carrier', positions: [[0,0], [0,1]]},
                { type: 'carrier', positions: [[0,0], [0,1]]},
                { type: 'carrier', positions: [[0,0], [0,1]]}
            ]
            const board = new Board()

            // Act
            const setShipsFunction = () => {
                board.SetShips(ships)
            }

            // Assert
            expect(setShipsFunction).to.throw(Error, 'Existem tipos de navios repetidos')
        })

        it('When given overlapping ships positions should throw an error', () => {
            // Arrange
            const ships = [
                { type: 'carrier', positions: [[0,0], [0,1], [0,2], [0,3], [0,4]]},
                { type: 'battleship', positions: [[0,0], [0,1], [0,2], [0,3]]},
                { type: 'submarine', positions: [[0,0], [0,1], [0,2]]},
                { type: 'destroyer', positions: [[0,0], [0,1], [0,2]]},
                { type: 'cruiser', positions: [[0,0], [0,1]]}
            ]
            const board = new Board()

            // Act
            const setShipsFunction = () => {
                board.SetShips(ships)
            }

            // Assert
            expect(setShipsFunction).to.throw(Error, 'Existem posições de navios sobrepostas')
        })

        it('When given ships should set with positions', () => {
            // Arrange
            const ships = [
                { type: 'carrier', positions: [[0,0], [0,1], [0,2], [0,3], [0,4]]},
                { type: 'battleship', positions: [[1,0], [1,1], [1,2], [1,3]]},
                { type: 'submarine', positions: [[2,0], [2,1], [2,2]]},
                { type: 'destroyer', positions: [[3,0], [3,1], [3,2]]},
                { type: 'cruiser', positions: [[4,0], [4,1]]}
            ]
            const board = new Board()

            // Act
            board.SetShips(ships)

            // Assert
            expect(board.Carrier).to.not.be.null
            expect(board.Battleship).to.not.be.null
            expect(board.Submarine).to.not.be.null
            expect(board.Destroyer).to.not.be.null
            expect(board.Cruiser).to.not.be.null
            expect(board.AreShipsSetted()).to.be.true
        })
    })
    describe('Receive Shoot', () => {
        it('When a shoot not hits a ship should mark board hit false', () => {
            // Arrange 
            const positionNotHit = [0, 5]
            const board = GetBoardWithShips()

            // Act
            board.ReceiveShoot(positionNotHit)

            // Assert
            expect(board.Hits[0].Position.Line).to.be.equal(0)
            expect(board.Hits[0].Position.Column).to.be.equal(5)
            expect(board.Hits[0].IsShipHit).to.be.false
        })

        it('When a shoot hits a ship should mark board hit true', () => {
            // Arrange 
            const positionHit = [0, 4]
            const board = GetBoardWithShips()

            // Act
            board.ReceiveShoot(positionHit)

            // Assert
            expect(board.Hits[0].Position.Line).to.be.equal(0)
            expect(board.Hits[0].Position.Column).to.be.equal(4)
            expect(board.Hits[0].IsShipHit).to.be.true
        })
    })
    describe('Is All Ships Down', () => {
        it('When remains ships position to hit sould return false', () => {
            // Arrange 
            const positionHit = [0, 4]
            const board = GetBoardWithShips()
            board.ReceiveShoot(positionHit)

            // Act
            const isAllShipsDown = board.IsAllShipsDown()

            // Assert
            expect(isAllShipsDown).to.be.false
        })
        it('When does not remains ships position to hit sould return true', () => {
            // Arrange 
            const board = GetBoardWithShipsHit()

            // Act
            const isAllShipsDown = board.IsAllShipsDown()

            // Assert
            expect(isAllShipsDown).to.be.true
        })
    })
})

function GetBoardWithShips(){
    const ships = [
        { type: 'carrier', positions: [[0,0], [0,1], [0,2], [0,3], [0,4]]},
        { type: 'battleship', positions: [[1,0], [1,1], [1,2], [1,3]]},
        { type: 'submarine', positions: [[2,0], [2,1], [2,2]]},
        { type: 'destroyer', positions: [[3,0], [3,1], [3,2]]},
        { type: 'cruiser', positions: [[4,0], [4,1]]}
    ]
    const board = new Board()
    board.SetShips(ships)
    return board
}

function GetBoardWithShipsHit(){
    const board = GetBoardWithShips()
    const hits = [
        [0,0], [0,1], [0,2], [0,3], [0,4],
        [1,0], [1,1], [1,2], [1,3],
        [2,0], [2,1], [2,2],
        [3,0], [3,1], [3,2],
        [4,0], [4,1]
    ]
    hits.forEach(hit => {
        board.ReceiveShoot(hit)
    })

    return board
}