import Position from '../positions'
import { DomainError } from '../../shared'

export default class Hit {
    constructor(position, isShipHit = false){
        HandleValidation(position)
        this.Position = position
        this.IsShipHit = isShipHit
    }
}

function HandleValidation(position){
    if(!position || !(position instanceof Position))
        throw new DomainError('Posição não pode ser nula', 400)
}