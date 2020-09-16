class Response {
    Ok(body){
        return {
            headers: GetHeaders(),
            statusCode: 200,
            body: body
        }
    }

    Created(body){
        return {
            headers: GetHeaders(),
            statusCode: 201,
            body: body
        }
    }
    
    Error(error){
        return {
            headers: GetHeaders(),
            statusCode: error.statusCode || 500,
            body: {
                error: error.message
            }
        }
    }
}

function GetHeaders(){
    return {
        'Content-Type': 'application/json'
    }
}

export default new Response()