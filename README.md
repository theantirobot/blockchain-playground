This is a demo showing an indexer-as-a-service
TODO:
* support cold starts and backfills of the indexer
* decouple block processing from callbacks to be resilient against subscriber outages
* implement queing 

# To start
run ganache for local blockchain support
navigate to each of these subdirectory and run yarn start
* subscription-service
* gateway
* indexer

run yarn dev in the front-end folder
