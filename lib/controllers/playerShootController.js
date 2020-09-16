export default function PlayerShootControllerBuilder (PlayerShootUseCase, Response) {
    return async function PlayerShootController (httpRequest) {
      try {
        const game = await PlayerShootUseCase.Handle(httpRequest.body)
        return Response.Ok(game)
      } catch (error) {
        return Response.Error(error)
      }
    }
  }