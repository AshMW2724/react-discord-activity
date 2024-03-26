# React Discord Activity

Because I like React :)

## Setup

First rename `.env.example` to `.env`, then add your bot's client ID.

### API

For this activity to work properly you need an API for OAUTH2. Map your API to the `/api` route.

#### Basic API

The route `/token` (On the client we will use `/api/token`) will be used to `POST`:

```json
// application/json
{
  "code": "... discord oauth2 code ..."
}
```

Your API should respond with

```json
// application/json
{
  "access_token": "... discord access token ..."
}
```

Keep in mind, this is for the bare minimum. If you need any more data on the client side you should return more and store it in a state.
