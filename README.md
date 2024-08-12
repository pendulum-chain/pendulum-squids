# Pendulum Squids

This repository contains the code for the subsquid indexers that we deploy for our three networks Pendulum, Amplitude,
and Foucoco.

The production deployments of our squids are available at:

-   https://squid.subsquid.io/pendulum-squid/graphql
-   https://squid.subsquid.io/amplitude-squid/graphql
-   https://squid.subsquid.io/foucoco-squid/graphql

## Prerequisites

-   node 16.x
-   docker
-   npm -- note that `yarn` package manager is not supported

### Quickly running the sample

Example commands below use [make(1)](https://www.gnu.org/software/make/).
Please, have a look at commands in [Makefile](Makefile) if your platform doesn't support it.

```bash
# 1. Update Squid SDK and install dependencies
npm run update
npm ci

# 2. Compile typescript files
sqd build

# 3. Start target Postgres database and detach
sqd up

# 4. Start the processor
# For amplitude you would use
sqd process:pendulum
# For amplitude you would use
sqd process:amplitude
# For foucoco you would use
sqd process:foucoco

# 5. The command above will block the terminal
#    being busy with fetching the chain data,
#    transforming and storing it in the target database.
#
#    To start the graphql server open the separate terminal
#    and run
sqd serve
```

## Context

### Organizations

Squids within each Aquarium account are grouped into organizations. The first step to deploying a squid into an
organization is to authenticate with the deployment key.

To do this, first register/login to [Aquarium](https://app.subsquid.io/) and follow the instructions to get your
deployment key.

Note that in order to properly deploy the squids, you need to be part of the `pendulum` organization in subsquid.

To authenticate yourself in the terminal, run the following command:

```shell
sqd auth -r <your_deployment_key>
```

Here is an example of a command to deploy a squid into our organization using the Foucoco squid manifest:

```shell
sqd deploy --org pendulum . -m squid-foucoco.yaml
```

### List all the Substrate archives

In order to list all the archives information, run the next command:

```shell
npx squid-archive-registry -t substrate
```

### Database migrations

When the schema changes, the underlying database needs to be updated as well.
Before following the next steps, make sure that the database is clean and no other migration has been applied.
So before generating the migrations, close the existing database (if any) and re-start it, by running:

```shell
# This will shut down the database
sqd down
# This will re-build the project
sqd build
# This will create a new database
sqd up
```

Now, to generate the migrations, run:

```shell
# [Optional] Clean previous migrations
sqd migration:clean

# Build the project, remove any old migrations, then run `npx squid-typeorm-migration generate`
sqd migration:generate

# Run npx squid-typeorm-migration apply
sqd migration:apply
```

This will generate a new migration file in `db/migrations`.
You can replace the existing migrations with that new file.
In fact, you probably have to delete all other migration files and only keep the latest one.

### Deployment

To set up your machine for the squid deployment you should follow the steps
in [this](https://docs.subsquid.io/deploy-squid/quickstart/) document.
Deploying the squid to the `pendulum` organization is done by running the following command:

```shell
# Deploying the pendulum squid
sqd deploy --org pendulum . -m squid-pendulum.yaml
# Deploying the amplitude squid
sqd deploy --org pendulum . -m squid-amplitude.yaml
# Deploying the foucoco squid
sqd deploy --org pendulum . -m squid-foucoco.yaml
```

The previous command will deploy the squid to a URL based on its name and version number.
To switch between squid versions without downtime and updates of the downstream clients, there are production aliases.
To deploy the squid to the production environment you should run the following command:

```shell
# Replace {version} with the version you define in the `squid.yaml` file
sqd prod pendulum-squid@{version}
sqd prod amplitude-squid@{version}
sqd prod foucoco-squid@{version}
```

#### Versioning

The squid version is defined in the `squid.yaml` file.
For each new version or bug fix, you should update the version number in the `squid.yaml` file and deploy the squid to
the production environment.
Even though a bug fix or feature might be specific to a specific network, it is recommended to keep the version number
consistent across all networks.

## Development flow

The first thing to do is to make changes in the schema of the squid and define entities that we would like to track.
These changes are done in the `schema.graphql` file.

The files in `src/types/*` and `src/model/*` are auto-generated and should not be touched manually.
You can generate the models with the following command:

```shell
# Generate the models based on the schema.graphql file
sqd codegen
```

The types are generated automatically based on the contents of the `typegen.json` file.
If you want to change the events, storage or calls that are indexed, you need to update the `typegen.json` file and
run

```shell
# Generate the typescript types
sqd typegen
```

In our case, we have three typegen files: `typegen-amplitude.json`, `typegen-foucoco.json` and `typegen-pendulum.json`.
The previous command should be replaced by

```shell
sqd typegen:pendulum
```

Or

```shell
sqd typegen:amplitude
```

Or

```shell
sqd typegen:foucoco
```

In order to generate the types for the contracts, we use the command

```shell
npx squid-ink-typegen --abi nabla-abi/{contract}.json --output src/abi/{contract}.ts
```

We must ensure that the contract's ABI is generated properly and added to the `nabla-abi`
directory.
It is possible to obtain the ABI upon compilation of the ink! contract.
The ABI is contained in the `.contract` file.
You can copy the contents of that file as is to a new `.json` file but make sure to remove
the `"source": { "wasm": <0x...> }` field from the JSON object as it's not needed and too large to be included in the
ABI.

To generate the types for all the ABI's contained in `nabla-abi`, run:

```shell
sqd typegen:abi
```

Be sure to name the `.json` file with the ABI with the corresponding name desired in src/abi.

NOTE: Eventually the generated ABI files may produce code which typescript may reject, for instance a missing function
variable name, or a wrongly defined type.
Please correct this manually if they appear, or use a different ABI.

Now it is time to start with the database migration. First, we need to make sure that the database is at blank state:

```shell
sqd down
sqd up
```

Then, we replace the old migrations with the new one. It is recommended to delete the old migration files before running
this command.

```shell
sqd migration:generate
```

Finally, we apply the migration.

```shell
sqd migration:apply
```

Now, to deploy the squid into an Aquarium organization, run the following command. This command is and example using the
foucoco manifest.

```shell
sqd deploy --org pendulum . -m squid-foucoco.yaml
```

## Regenerate types before enactment of runtime upgrade

In the past we noticed that the metadata changes introduced by runtime upgrades make our indexers unable to decode some
of the events properly. Therefore, in order to reduce the indexer downtime whenever a runtime upgrade happens, we can
regenerate the types by providing the runtime that is going to be used for the upgrade.

### Prerequisites

You need to have [subwasm](https://github.com/chevdor/subwasm) installed.
You can find the installation instructions [here](https://github.com/chevdor/subwasm?tab=readme-ov-file#install).

You also need to have access to the binary of the compiled wasm runtime that will be used for the upgrade.

### Preparing the types for the upcoming runtime upgrade

To generate the types for the upcoming runtime upgrade, you can use the following command:

```
sqd generate-types-from-runtime-binary <runtime_name> <path_to_runtime_binary>
```

with `runtime_name` being either `pendulum`, `amplitude` or `foucoco` and `path_to_runtime_binary` being the path to the
compiled runtime binary.

When running the above command, the following will happen (in order):

-   `subwasm` is ran against a local runtime binary at `<path_to_runtime_binary>` which produces
    a `<runtime_name>.metadata` file containing the hex+scale encoded metadata.
-   The corresponding `typegen-<runtime_name>.json` is updated to contain the local archive endpoint URL on the
    specVersions field i.e. `http://localhost:3000`.
-   Local archive endpoint is started at `http://localhost:3000`.
-   `sqd typegen:<runtime_name>` command is ran which in turn will spawn a process that will make a request to the URL
    found in the specVersions field of `typegen-<runtime_name>.json`.
-   Server receives request, fetches the original metadata file
    from `https://v2.archive.subsquid.io/metadata/<runtime_name>`, increments the last specVersion found in the original
    file, adds it to the new custom metadata file along with the subwasm generated metadata and then serves the
    concatenated original metadata + custom metadata files.
-   After types are generated successfully based on the new metadata file, `typegen-<runtime_name>.json` is updated again
    with the old URL value for `specVersions` field i.e. `https://v2.archive.subsquid.io/metadata/<runtime_name>` and
    server gracefully shuts down.

## Subscribe to specific events

[Here](./scripts/subscribeTransfer.js) you can find a link to an example JavaScript snippet that can be used to
subscribe to specific events.

The first step is to create a new client:

```javascript
const port = process.env.GQL_PORT || 4350
const host = process.env.GQL_HOST || 'localhost'
const proto = process.env.GQL_PROTO || 'ws'

const client = createClient({
    webSocketImpl: WebSocket,
    url: `${proto}://${host}:${port}/graphql`,
})
```

In the code above, `proto` represents the protocol to be used, `host` is the squid host and `port` is the exposed port.

Here is an example of a client subscription to tokenTransfers events:

```javascript
client.subscribe(
    {
        query: `
    subscription {
        tokenTransfers(limit: 2, orderBy: timestamp_DESC) {
          from
          to
          amount
          currencyId
        }
    }
    `,
    },
    {
        next: (data) => {
            console.log(`New token transfers: ${JSON.stringify(data)}`)
        },
        error: (error) => {
            console.error('error', error)
        },
        complete: () => {
            console.log('done!')
        },
    }
)
```

In this example, we're simply logging the query result when new events are registered in the squid. You can choose to
handle these events in a different way, for example, by automating processes based on specific events.

As seen in the previous example, the query structure is similar to graphql queries that we use in the squid graphql
endpoint. The only difference is that it is wrapped inside a subscription statement:

```
subscription {
        tokenTransfers(limit: 2, orderBy: timestamp_DESC) {
          from
          to
          amount
          currencyId
        }
    }
```

You subscribe to multiple events in the same process by calling client.subscribe (Refer to
the [example file](./scripts/subscribeTransfer.js) if you have any doubts about how it works).
