export default function GetActiveGameControllerBuilder (GetActiveGameUseCase, Response) {
    return async function GetActiveGameController (httpRequest) {
      try {
        const game = await GetActiveGameUseCase.Handle()
        return Response.Ok(game)
      } catch (error) {
        return Response.Error(error)
      }
    }
  }