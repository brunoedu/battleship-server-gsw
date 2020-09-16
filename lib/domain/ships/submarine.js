import Ship from './ship'
import Config from '../../configurations'
import { DomainError } from '../../shared'

export default class Submarine extends Ship {
    constructor(positions){
        super(positions)
        HandlePositionsValidation(positions)
    }
}

function HandlePositionsValidation(positions){
    if(!positions || positions.length != Config.SubmarineShipSize)
        throw new DomainError(`Submarino precisa ter ${Config.SubmarineShipSize} posiçōes`)
}