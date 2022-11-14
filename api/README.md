# ZKP Api Server

## Workflow

1. `npm i`
1. `npm test`
1. `npm start`

For production builds, run `npm run build`.

## API

### Post: /verification

Request Body:

- quiz, a json object
- solution, a json object
- circuit, the name of the circuit used

Note: the quiz & solution are the input signals of a circuit.

Response Body:

- verified, a boolean value for passed or not.

For example:

```shell
curl -X POST -H 'Content-Type: application/json' -i 'http://127.0.0.1:3006/verification' --data '{
  "quiz": {"c":18},
  "solution": {"a":3, "b":15},
  "circuit": "adder"
}'
```

## Configuration

`SETTINGS` in [src/constant.ts](./src/constant.ts) inlcudes all required configurations. In it, you can do:

- manage your circuits: adding or removing.
- change your json rpc url
