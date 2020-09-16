import Ship from './ship'
import Config from '../../configurations'
import { DomainError } from '../../shared'

export default class Carrier extends Ship {
    constructor(positions){
        super(positions)
        HandlePositionsValidation(positions)
    }
}

function HandlePositionsValidation(positions){
    if(!positions || positions.length != Config.CarrierShipSize)
        throw new DomainError(`Porta-avião precisa ter ${Config.CarrierShipSize} posiçōes`)
}