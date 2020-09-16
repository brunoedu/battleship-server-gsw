export default function SetShipsOnBoardControllerBuilder (SetShipsOnBoardUseCase, Response) {
    return async function SetShipsOnBoardController (httpRequest) {
      try {
        const game = await SetShipsOnBoardUseCase.Handle(httpRequest.body)
        return Response.Ok(game)
      } catch (error) {
        return Response.Error(error)
      }
    }
  }