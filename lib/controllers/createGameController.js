export default function CreateGameControllerBuilder (CreateGameUseCase, Response) {
    return async function CreateGameController (httpRequest) {
      try {
        const game = await CreateGameUseCase.Handle(httpRequest.body)
        return Response.Created(game)
      } catch (error) {
        return Response.Error(error)
      }
    }
  }