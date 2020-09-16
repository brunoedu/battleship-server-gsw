import { ShipsTypes, Carrier, Battleship, Submarine, Destroyer, Cruiser } from '../ships'
import Position from '../positions'
import { DomainError } from '../../shared'
import Hit from '../hits'
import Configs from '../../configurations'

export default class Board{
    constructor(){
        this.Carrier = null
        this.Battleship = null
        this.Submarine = null
        this.Destroyer = null
        this.Cruiser = null
        this.Hits = []
    }

    SetShips(ships){
        HandleShipsInputValidation(ships)
        CreateShips(this, ships)
    }

    AreShipsSetted(){
        return this.Carrier != null &&
        this.Battleship != null &&
        this.Submarine != null &&
        this.Destroyer != null &&
        this.Cruiser != null
    }

    ReceiveShoot(position){
        const positionObject = GetPositionObject(position)
        const shootHitShomeShip = ShootHitSomeShip(this, positionObject)
        this.Hits.push(new Hit(positionObject, shootHitShomeShip))
    }

    IsAllShipsDown(){
        return this
            .Hits
            .filter(hit => hit.IsShipHit)
            .length == Configs.AllShipsDownCount
    }
}

function HandleShipsInputValidation(ships){
    if(!ships || ships.length != 5)
        throw new DomainError('São necessários 5 navios para iniciar o jogo')
    
    if(!IsAllShipsTypesValid(ships))
        throw new DomainError('Existem tipos de navios inválidos')
    
    if(HasRepeatedShipsTypes(ships))
        throw new DomainError('Existem tipos de navios repetidos')
}

function IsAllShipsTypesValid(ships){
    return ships.every(IsValidShipType)
}

function IsValidShipType(element){
    switch(element.type){
        case ShipsTypes.Carrier:
        case ShipsTypes.Battleship:
        case ShipsTypes.Submarine:
        case ShipsTypes.Destroyer:
        case ShipsTypes.Cruiser:
            return true
        default:
            return false
    }
}

function HasRepeatedShipsTypes(ships){
    const shipsTypes = ships.map(GetTypeFromShip)
    const notRepeatedShipsTypes = [...new Set(shipsTypes)]

    return notRepeatedShipsTypes.length != 5
}

function GetTypeFromShip(ship){
    return ship.type
}

function CreateShips(context, ships){
    ships.forEach(ship => {
        CreateShipByTypeAndPositions(context, ship.type, ship.positions)
    })
}

function CreateShipByTypeAndPositions(context, type, positions){
    switch(type){
        case ShipsTypes.Carrier:
            CreateCarrier(context, positions)
            break
        case ShipsTypes.Battleship:
            CreateBattleship(context, positions)
            break
        case ShipsTypes.Submarine:
            CreateSubmarine(context, positions)
            break
        case ShipsTypes.Destroyer:
            CreateDestroyer(context, positions)
            break
        case ShipsTypes.Cruiser:
            CreateCruiser(context, positions)
            break
    }
}

function HasCarrierOverlappingPositions(context, positions){
    if(!context.Carrier)
        return false

    return context.Carrier.HasOverlappingPositions(positions)
}

function HasBattleshipOverlappingPositions(context, positions){
    if(!context.Battleship)
        return false

    return context.Battleship.HasOverlappingPositions(positions)
}

function HasSubmarineOverlappingPositions(context, positions){
    if(!context.Submarine)
        return false

    return context.Submarine.HasOverlappingPositions(positions)
}

function HasDestroyerOverlappingPositions(context, positions){
    if(!context.Destroyer)
        return false

    return context.Destroyer.HasOverlappingPositions(positions)
}

function HasCruiserOverlappingPositions(context, positions){
    if(!context.Cruiser)
        return false

    return context.Cruiser.HasOverlappingPositions(positions)
}

function HandleShipOverlappingPositions(context, positions){
    if(HasCarrierOverlappingPositions(context, positions) ||
       HasBattleshipOverlappingPositions(context, positions) ||
       HasSubmarineOverlappingPositions(context, positions) ||
       HasDestroyerOverlappingPositions(context, positions) ||
       HasCruiserOverlappingPositions(context, positions))
        throw new DomainError('Existem posições de navios sobrepostas')
}

function GetPositionObject(position){
    return new Position(position[0], position[1])
}

function GetPositionsObjects(positions){
    return positions.map(position => GetPositionObject(position))
}

function CreateCarrier(context, positions){
    HandleShipOverlappingPositions(context, GetPositionsObjects(positions))
    context.Carrier = new Carrier(GetPositionsObjects(positions))
}

function CreateBattleship(context, positions){
    HandleShipOverlappingPositions(context, GetPositionsObjects(positions))
    context.Battleship = new Battleship(GetPositionsObjects(positions))
}

function CreateSubmarine(context, positions){
    HandleShipOverlappingPositions(context, GetPositionsObjects(positions))
    context.Submarine = new Submarine(GetPositionsObjects(positions))
}

function CreateDestroyer(context, positions){
    HandleShipOverlappingPositions(context, GetPositionsObjects(positions))
    context.Destroyer = new Destroyer(GetPositionsObjects(positions))
}

function CreateCruiser(context, positions){
    HandleShipOverlappingPositions(context, GetPositionsObjects(positions))
    context.Cruiser = new Cruiser(GetPositionsObjects(positions))
}

function ShootHitSomeShip(context, position){
    const positions = [position]
    return HasCarrierOverlappingPositions(context, positions) ||
        HasBattleshipOverlappingPositions(context, positions) ||
        HasSubmarineOverlappingPositions(context, positions) ||
        HasDestroyerOverlappingPositions(context, positions) ||
        HasCruiserOverlappingPositions(context, positions)
}