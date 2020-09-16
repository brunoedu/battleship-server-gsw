import Ship from './ship'
import Config from '../../configurations'
import { DomainError } from '../../shared'

export default class Destroyer extends Ship {
    constructor(positions){
        super(positions)
        HandlePositionsValidation(positions)
    }
}

function HandlePositionsValidation(positions){
    if(!positions || positions.length != Config.DestroyerShipSize)
        throw new DomainError(`Destroyer precisa ter ${Config.DestroyerShipSize} posiçōes`)
}