import chai from 'chai'
import Player from './player'

const expect = chai.expect

describe('Player domain', () => {
    it('When given an invalid playerId should throw an error', () => {
        // Arrange 
        const invalidPlayerId = ''

        // Act
        const playerCreation = () => {
            new Player(invalidPlayerId)
        }

        // Assert
        expect(playerCreation).to.throw(Error, 'Id de jogador não pode ser nulo ou vazio')
    })

    it('When given a playerId should create a player instance', () => {
        // Arrange
        const id = 'playerid'
    
        // Act
        const player = new Player(id)
    
        // Assert
        expect(player).to.not.be.null
        expect(player.Id).to.equal(id)
    })
})