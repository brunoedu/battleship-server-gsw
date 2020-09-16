import { DomainError } from '../../shared'
import Position from '../positions';

export default class Ship {
  constructor(positions, isFromModel = false) {
    if(!isFromModel)
      DefaultConstructor(this, new.target, positions)
    else
      this.Positions = positions
  }

  static ShipCreationFromModel(positions){
    let positionsObjects = positions.map(position => new Position(position.Line, position.Column))
    return new Ship(positionsObjects, true)
  }

  HasOverlappingPositions(positions){
    let hasOverlappingPositions = false
    this.Positions.forEach(shipPosition => {
      positions.forEach(position => {
        if(shipPosition.IsOverlappingPosition(position)){
          hasOverlappingPositions = true
          return
        }
        if(hasOverlappingPositions)
          return
      })
    })

    return hasOverlappingPositions
  }
}

function DefaultConstructor(context, target, positions){
  context.Positions = positions
  HandleAbstractCreation(target)
  if(positions && positions.length)
    HandlePositionsValidations(context, positions)
}

function HandleAbstractCreation(target){
  if (target === Ship) {
    throw new TypeError('Não é possível instanciar um navio abstrato')
  }
}

function HandlePositionsValidations(context, positions){
  positions.forEach(position => {
      let length = context.Positions.filter(_position => {
          return position.Line == _position.Line && position.Column == _position.Column
      }).length
      if(length != 1)
        throw new DomainError('Não é possível criar um navio com posições repetidas')
  })

  if(!ArePositionsInSequence(positions))
    throw new DomainError('As posições precisam estar em sequência')
}

function ArePositionsInSequence(positions){
  const lines = GetLinesFromPosition(positions)
  const isAllSameLine = IsAllSameItems(lines) 
  const isLineInSequence = AreItemsInSequence(lines) 

  const columns = GetColumnsFromPosition(positions)
  const isAllSameColumn = IsAllSameItems(columns) 
  const isColumnInSequence = AreItemsInSequence(lines) 

  return (isAllSameLine && isColumnInSequence) || (isAllSameColumn && isLineInSequence)
}

function GetLinesFromPosition(positions){
  return positions.map(position => position.Line)
}

function GetColumnsFromPosition(positions){
  return positions.map(position => position.Column)
}

function IsAllSameItems(array){
  const removedDuplicateds = new Set(array)
  return removedDuplicateds.size == 1 
}

function AreItemsInSequence(array){  
  for (let i = 1, len = array.length; i < len; i++) 
    if (array[i] < array[i - 1]) 
      return false
      
  return true
}