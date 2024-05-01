This is a demo showing an indexer-as-a-service

# To start
run ganache for local blockchain support
navigate to each of these subdirectory and run yarn start
* subscription-service
* gateway
* indexer
* sample-app

run yarn dev in the front-end folder

Navigate to localhost:3000
* Add a subscription 
    - 0xD5F46Ef9e3acdE9f4AAEBD37F37c4B2EC90D51F1
    - http://localhost:3001/onTransaction
* Send a transaction to 0xD5F46Ef9e3acdE9f4AAEBD37F37c4B2EC90D51F1

TODO:
* subscription service
    - add confirmation count to subscription
* indexer
    - handle cold starts / missed blocks by persisting most recently processed block
    - be resilient against subscriber outages by pushing notifcations into a high availability queue service instead of directly invoking webhook
    - support configurable confirmation count before invoking webhook
* add queing solution
    - store trailing history of webhook invocation stats
    - provide DLQ for webhook (trailing history)