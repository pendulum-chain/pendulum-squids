# Amplitude Squid

## Prerequisites

-   node 16.x
-   docker
-   npm -- note that `yarn` package manager is not supported

## Quickly running the sample

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
sqd process

# 5. The command above will block the terminal
#    being busy with fetching the chain data,
#    transforming and storing it in the target database.
#
#    To start the graphql server open the separate terminal
#    and run
sqd serve
```

## Development flow

The files in `src/types/*` and `src/model/*` are auto-generated and should not be touched manually.
You can generate the models with the following command:

```shell
# Generate the models based on the schema.graphql file
npx squid-typeorm-codegen

# Generate the typescript types
sqd build
```

The types are generated automatically based on the contents of the `typegen.json` file.
If you want to change the events, storage or calls that are indexed, you need to update the `typegen.json` file and
run

```shell
npx squid-substrate-typegen typegen.json
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
# Build the project, remove any old migrations, then run `npx squid-typeorm-migration generate`
sqd migration:generate

# Run npx squid-typeorm-migration apply
sqd migration:apply
```

This will generate a new migration file in `db/migrations`.
You can replace the existing migrations with that new file.
In fact, you probably have to delete all other migration files and only keep the latest one.

## Deployment

To set up your machine for the squid deployment you should follow the steps
in [this](https://docs.subsquid.io/deploy-squid/quickstart/) document.
Deploying the squid is done by running the following command:

```shell
# Deploying the amplitude squid
sqd deploy . -m squid-amplitude.yaml
# Deploying the foucoco squid
sqd deploy . -m squid-foucoco.yaml
```

The previous command will deploy the squid to a URL based on its name and version number.
To switch between squid versions without downtime and updates of the downstream clients, there are production aliases.
To deploy the squid to the production environment you should run the following command:

```shell
# Replace {version} with the version you define in the `squid.yaml` file
sqd prod amplitude-squid@{version}
```
