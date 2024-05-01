# Indexer Challenge
This repo contains a demo application showing an example architecture
supporting indexer-as-aservice.  

## Front End
Next.js, Tailwind, Shadcn
The front end has three routes, exercising each part of the architecture. Each route is embedded as an iframe in the root, to fascilitate easy demo.

### Subscriptions
Subscription Management. This would be our portal, like the AWS console for our indexer-as-service.  It talks to the gateway, which fronts all of the microservices that will support the UI.  It only talks to the gateway.

### Dapp
This is a stand-in for a client's dapp that would submit transactions.

### Feed
This a stand-in for the client's administrative back-end that receives subscribed transactions. 

## Gateway
This is a graphql federation service.  It stitches together schemas from multiple back-end services to support the front-end. As additional features are added, they can be encapsulated in microservices and added to the federator.  

## Subscriptions
This manages the subscription info provided by the user.  It would not, for example, store webhook callback history or DLQ. When that becomes supported, we'd add another microservice and add it to the federator.

## Indexer
Polls for new blocks, finds related subscriptions, and invokes their webhook.

## Sample App
This takes the place of an application that would be subscribing to
transactions.  It just stores the transactions and presents them as
a feed to the front end.

## Node
For this demo, just use ganache.  
```
                     ┌────────────────┐                          
                     │                │   get subscriptions      
                     │ Subscriptions  ◄────────────────────┐     
                     │                │                    │     
                     └────────┬───────┘                    │     
                              │                            │     
                              │                            │     
                              │                            │     
┌─────────────┐        ┌──────┴─────┐               ┌──────┴────┐
│             │        │            │               │           │
│  Front End  ├────────┤  Gateway   │               │  Indexer  │
│             │        │            │               │           │
└───┬────┬────┘        └────────────┘               └────┬───┬──┘
    │    │                                               │   │   
    │    │                                               │   │   
    │    │                                               │   │   
    │    │                                               │   │   
    │    │            ┌──────────────┐                   │   │   
    │    │  get feed  │              │   invoke webhook  │   │   
    │    └────────────►  Sample App  ◄───────────────────┘   │   
    │                 │              │                       │   
    │                 └──────────────┘                       │   
    │                                                        │   
    │                    ┌────────┐                          │   
    │                    │        │    get blocks and txs    │   
    │  send transaction  │  Node  │◄─────────────────────────┘   
    └────────────────────►        │                              
                         └────────┘                              
```
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
* write a script to run everything
* subscription service
    - add confirmation count to subscription
* indexer
    - handle cold starts / missed blocks by persisting most recently processed block
    - be resilient against subscriber outages by pushing notifcations into a high availability queue service instead of directly invoking webhook
    - support configurable confirmation count before invoking webhook
* add queing solution
    - store trailing history of webhook invocation stats
    - provide DLQ for webhook (trailing history)