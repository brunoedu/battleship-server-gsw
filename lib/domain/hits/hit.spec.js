import chai from 'chai'
import Hit from './hit'
import { DomainError } from '../../shared'
import Position from '../positions'

const expect = chai.expect

describe('Hit domain', () => {
    it('When not given a position should throw an error', () => {
        // Arrange 
        const position = null

        // Act
        const hitCreation = () => {
            new Hit(position)
        }

        // Assert
        expect(hitCreation).to.throw(DomainError, 'Posição não pode ser nula')
    })

    it('When given a valid position and not ship hit should create', () => {
        // Arrange 
        const position = new Position(0, 0)

        // Act
        const hit = new Hit(position)

        // Assert
        expect(hit).to.not.be.null
        expect(hit.Position).to.be.equal(position)
        expect(hit.IsShipHit).to.be.false
    })

    it('When given a valid position and ship hit should create', () => {
        // Arrange 
        const position = new Position(0, 0)

        // Act
        const hit = new Hit(position, true)

        // Assert
        expect(hit).to.not.be.null
        expect(hit.Position).to.be.equal(position)
        expect(hit.IsShipHit).to.be.true
    })
})