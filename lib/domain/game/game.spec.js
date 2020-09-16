import chai from 'chai'
import { Game, GameStatus } from './index'

const expect = chai.expect

describe('Game domain', () => {
    describe('Creation', () => {
        it('When constructor called should create a game instance', () => {
            // Act
            const game = new Game()
        
            // Assert
            expect(game).to.not.be.null
            expect(game.CreationDate).to.not.be.null
            expect(game.Status).to.equal(GameStatus.InProgress)
            expect(game.PlayerTurn).to.equal('player1')
        })
    })

    describe('Set player ships', () => {
        it('When given a player id not in turn should trhow an error', () => {
            // Assert
            const playerId = 'player2'
            const ships = []
            const game = new Game()

            // Act
            const setPlayerShipsFunction = () => {
                game.SetPlayerShips(playerId, ships) 
            }
    
            // Assert
            expect(setPlayerShipsFunction).to.throw(Error, 'Espere sua vez para efetuar uma ação')
        })
    })

    describe('Player shoot', () => {
        it('When given a player id not in turn should trhow an error', () => {
            // Assert
            const playerId = 'player2'
            const position = [0,0]
            const game = new Game()

            // Act
            const playerShootFunction = () => {
                game.PlayerShoot(playerId, position) 
            }
    
            // Assert
            expect(playerShootFunction).to.throw(Error, 'Espere sua vez para efetuar uma ação')
        })

        it('When given a position hit and game not finish should toggle turn and persist status', () => {
            // Assert
            const playerId = 'player1'
            const position = [0,0]
            const game = new Game()

            // Act
            game.PlayerShoot(playerId, position)

            // Assert
            expect(game.PlayerTurn).to.be.equal('player2')
            expect(game.Status).to.be.equal(GameStatus.InProgress)
            expect(game.Winner).to.be.null
        })

        it('When given a position hit and game finish should change game status and set winner', () => {
            // Assert
            const playerId = 'player1'
            const position = [4,1]
            const game = GetGameAlmostFinished()

            // Act
            game.PlayerShoot(playerId, position)

            // Assert
            expect(game.Status).to.be.equal(GameStatus.Finished)
            expect(game.Winner).to.be.equal(playerId)
        })
    })
})

const shoots = [
    [0,0], [0,1], [0,2], [0,3], [0,4],
    [1,0], [1,1], [1,2], [1,3],
    [2,0], [2,1], [2,2],
    [3,0], [3,1], [3,2],
    [4,0]
]

function GetGameAlmostFinished(){
    const game = new Game()
    game.SetPlayerShips('player1', GetShips())
    game.SetPlayerShips('player2', GetShips())

    for(let turn = 0; turn < 16; turn++){
        game.PlayerShoot('player1', shoots[turn])
        game.PlayerShoot('player2', shoots[turn])
    }

    return game
}

function GetShips(){
    return [
        { type: 'carrier', positions: [[0,0], [0,1], [0,2], [0,3], [0,4]]},
        { type: 'battleship', positions: [[1,0], [1,1], [1,2], [1,3]]},
        { type: 'submarine', positions: [[2,0], [2,1], [2,2]]},
        { type: 'destroyer', positions: [[3,0], [3,1], [3,2]]},
        { type: 'cruiser', positions: [[4,0], [4,1]]}
    ]
}