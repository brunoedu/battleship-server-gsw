import Ship from './ship'
import Config from '../../configurations'
import { DomainError } from '../../shared'

export default class Battleship extends Ship {
    constructor(positions){
        super(positions)
        HandlePositionsValidation(positions)
    }
}

function HandlePositionsValidation(positions){
    if(!positions || positions.length != Config.BattleshipShipSize)
        throw new DomainError(`Encouraçado precisa ter ${Config.BattleshipShipSize} posiçōes`)
}