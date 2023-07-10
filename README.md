# Pendulum Squids

This repository contains the code for the subsquid indexers that we deploy for our three networks Pendulum, Amplitude, and Foucoco. 

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

Squids within each Aquarium account are grouped into organizations. The first step to deploying a squid into an organization is to authenticate with the deployment key.

To do this, first register/login to [Aquarium](https://app.subsquid.io/) and follow the instructions to get your deployment key.

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
sqd prod amplitude-squid@{version}
sqd prod foucoco-squid@{version}
```

## Development flow

The first thing to do is to make changes in the schema of the squid and define entities that we would like to track. These changes are done in the `schema.graphql` file.

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

In our case, we have two typegen files: `typegen-amplitude.json` and `typegen-foucoco.json`. The previous command should be replaced by

```shell
sqd typegen:amplitude
```

Or

```shell
sqd typegen:foucoco
```

Now it is time to start with the database migration. First, we need to make sure that the database is at blank state:

```shell
sqd down
sqd up
```

Then, we replace the old migrations with the new one. It is recommended to delete the old migration files before running this command.

```shell
sqd migration:generate
```

Finally, we apply the migration.

```shell
sqd migration:apply
```

Now, to deploy the squid into an Aquarium organization, run the following command. This command is and example using the foucoco manifest.

```shell
sqd deploy --org pendulum . -m squid-foucoco.yaml
```
