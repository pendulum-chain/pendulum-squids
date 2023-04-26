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
