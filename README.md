# Indexer Challenge
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
Next.js, Tailwind, Shadcn
The front end has three routes that exercise the entire system. Each route is embedded as an iframe in the root to make for an effective demo.

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
This is the blockchain node API, using hardhat simulated ethereum.


# TODO:
* mitigate reorgs
 * add confirmation count to subscriptions
 * integrate counting confirmations into indexer
* be resilient against webhookUrl outages
 * decouple webhook invocation from subscription matching
 * add a webhook-invocation-service to manage each webhook invocation
 * show invocation data in the subscription front-end.