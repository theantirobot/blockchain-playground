# Blockchain Indexer Challenge
This repo contains a UI application demonstrating the following:
* Subscription service for defining what addresses to invoke a webhook for
* An indexer that polls for blocks, finds matched subscriptions, and invokes their webhooks
* A sample-client that receives the webhook.

# How To Run The Demo
1. Ensure [Docker](https://docs.docker.com/get-docker/) is installed.
2. From the root of the project, issue:
```
docker-compose -f docker-compose.yml -f docker-compose.override.yml up --build
```
3. navigate to localhost:3000

# Architecture

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
## Front End
The front exercises the entire system by:
* Managing subscriptions
* Submitting transactions
* Showing feed of matched transactions

## Gateway
This is a graphql federation service.  It stitches together schemas from multiple back-end services to support the front-end. Subsequent work will include more services in the federation.

## Subscriptions
This manages the subscription info provided by the user.  

## Indexer
Polls for new blocks, finds related subscriptions, and invokes their webhook.

## Sample App
This takes the place of an application that would be subscribing to
transactions.  It just stores the transactions and presents them as
a feed to the front end.

## Node
This is the blockchain node API, using hardhat simulated ethereum.


# TODO:
* mitigate reorgs
  * add confirmation count to subscriptions
  * integrate counting confirmations into indexer
* be resilient against webhookUrl outages
  * decouple webhook invocation from subscription matching
  * add a webhook-invocation-service to manage each webhook invocation
  * show invocation data in the subscription front-end.
* end-to-end tests