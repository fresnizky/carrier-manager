# Carrier Manager

## Usage

You can bootstrap and start all required services using the provided script:

```
chmod +x start.sh
./start.sh
```

You can access the UI on `http://localhost:5173`

## Servers

- Postgres:

  - running on port `5432`
  - username: `postgres`
  - password: `my-password`
  - Databases:
    - `consumer`
    - `producer`

- Kafka

  - running on port `9092` with default configuration

- Producer service

  - running on port `3001`
  - GraphQL endpoint running on `http://localhost:3001/graphql`

- Consumer service

  - running on port `3002`
  - GraphQL endpoint running on `http://localhost:3002/graphql`

- UI
  - running on `http://localhost:5173`
