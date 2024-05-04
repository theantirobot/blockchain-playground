# Blockchain Indexer Challenge
This repo contains a UI application demonstrating the following:
* Subscription service for defining what addresses to invoke a webhook for
* An indexer that polls for blocks, finds matched subscriptions, and invokes their webhooks
* A sample-client that receives the webhook.

# Video Demo

TODO: Demo new subscription history service
https://github.com/theantirobot/blockchain-playground/assets/2140031/460e8de6-4f57-44e9-8030-550516ee8725

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
                      └────────▲───────┘                    │       
                               │                            │       
                               │store subscriptions         │       
                               │                            │       
 ┌─────────────┐        ┌──────┴─────┐                ┌─────┴─────┐ 
 │             │        │            │                │           │ 
 │  Front End  ├────────┤  Gateway   │                │  Indexer  │ 
 │             │        │            │                │           │ 
 └───┬────┬────┘        └──────┬─────┘                └───┬───┬───┘ 
     │    │                    │                          │   │     
     │    │                    │read hook history         │   │     
     │    │                    │                          │   │     
     │    │              ┌─────▼─────┐                    │   │     
     │    │              │           │  invoke hook async │   │     
     │    │              │   Hooks   ◄────────────────────┘   │     
     │    │              │           │                        │     
     │    │              └─────┬─────┘                        │     
     │    │                    │                              │     
     │    │                    │invoke hook                   │     
     │    │                    │                              │     
     │    │            ┌───────▼──────┐                       │     
     │    │  get feed  │              │                       │     
     │    └────────────►  Sample App  │                       │     
     │                 │              │                       │     
     │                 └──────────────┘                       │     
     │                                                        │     
     │                    ┌────────┐                          │     
     │                    │        │                          │     
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
This is a graphql federation service.  It stitches together schemas from multiple back-end services to support the front-end. 

## Subscriptions
This manages the subscription info provided by the user.  

## Hooks
Async worker that invokes webhooks and stores a history of it. 

## Indexer
Polls for new blocks, finds related subscriptions, and invokes their webhook.

## Sample App
This takes the place of an application that would be subscribing to
transactions.  It just stores the transactions and presents them as
a feed to the front end.

## Node
This is the blockchain node API, using hardhat simulated ethereum.


# TODO:
* end-to-end tests
* subscription audit log