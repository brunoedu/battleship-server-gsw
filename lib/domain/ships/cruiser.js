import Ship from './ship'
import Config from '../../configurations'
import { DomainError } from '../../shared'

export default class Cruiser extends Ship {
    constructor(positions){
        super(positions)
        HandlePositionsValidation(positions)
    }
}

function HandlePositionsValidation(positions){
    if(!positions || positions.length != Config.CruiserShipSize)
        throw new DomainError(`Cruzador precisa ter ${Config.CruiserShipSize} posiçōes`)
}