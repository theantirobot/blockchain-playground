import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CallbackInstructions = {
  payload: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  callback: WebhookInvocationHistory;
};


export type MutationCallbackArgs = {
  instructions: CallbackInstructions;
  subscriptionId: Scalars['ID']['input'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  webhookInvocationHistory: WebhookInvocationHistoryConnection;
};


export type QueryWebhookInvocationHistoryArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  subscriptionId: Scalars['ID']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  id: Scalars['ID']['output'];
  webhookInvocationHistory: WebhookInvocationHistoryConnection;
};


export type SubscriptionWebhookInvocationHistoryArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  id: Scalars['ID']['output'];
  payload: Scalars['String']['output'];
  timestamp: Scalars['String']['output'];
};

export type WebhookInvocation = {
  __typename?: 'WebhookInvocation';
  endTimestamp: Scalars['String']['output'];
  startTimestamp: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type WebhookInvocationHistory = {
  __typename?: 'WebhookInvocationHistory';
  id: Scalars['ID']['output'];
  instructions?: Maybe<CallbackInstructions>;
  subscriptionId: Scalars['ID']['output'];
  webhookInvocation?: Maybe<WebhookInvocation>;
};

export type WebhookInvocationHistoryConnection = {
  __typename?: 'WebhookInvocationHistoryConnection';
  edges: Array<WebhookInvocationHistoryEdge>;
  pageInfo: PageInfo;
};

export type WebhookInvocationHistoryEdge = {
  __typename?: 'WebhookInvocationHistoryEdge';
  cursor: Scalars['String']['output'];
  node: WebhookInvocationHistory;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CallbackInstructions: CallbackInstructions;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  Transaction: ResolverTypeWrapper<Transaction>;
  WebhookInvocation: ResolverTypeWrapper<WebhookInvocation>;
  WebhookInvocationHistory: ResolverTypeWrapper<WebhookInvocationHistory>;
  WebhookInvocationHistoryConnection: ResolverTypeWrapper<WebhookInvocationHistoryConnection>;
  WebhookInvocationHistoryEdge: ResolverTypeWrapper<WebhookInvocationHistoryEdge>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CallbackInstructions: CallbackInstructions;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  PageInfo: PageInfo;
  Query: {};
  String: Scalars['String']['output'];
  Subscription: {};
  Transaction: Transaction;
  WebhookInvocation: WebhookInvocation;
  WebhookInvocationHistory: WebhookInvocationHistory;
  WebhookInvocationHistoryConnection: WebhookInvocationHistoryConnection;
  WebhookInvocationHistoryEdge: WebhookInvocationHistoryEdge;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  callback?: Resolver<ResolversTypes['WebhookInvocationHistory'], ParentType, ContextType, RequireFields<MutationCallbackArgs, 'instructions' | 'subscriptionId'>>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  webhookInvocationHistory?: Resolver<ResolversTypes['WebhookInvocationHistoryConnection'], ParentType, ContextType, RequireFields<QueryWebhookInvocationHistoryArgs, 'subscriptionId'>>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  id?: SubscriptionResolver<ResolversTypes['ID'], "id", ParentType, ContextType>;
  webhookInvocationHistory?: SubscriptionResolver<ResolversTypes['WebhookInvocationHistoryConnection'], "webhookInvocationHistory", ParentType, ContextType, Partial<SubscriptionWebhookInvocationHistoryArgs>>;
};

export type TransactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  payload?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WebhookInvocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['WebhookInvocation'] = ResolversParentTypes['WebhookInvocation']> = {
  endTimestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  startTimestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WebhookInvocationHistoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['WebhookInvocationHistory'] = ResolversParentTypes['WebhookInvocationHistory']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  instructions?: Resolver<Maybe<ResolversTypes['CallbackInstructions']>, ParentType, ContextType>;
  subscriptionId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  webhookInvocation?: Resolver<Maybe<ResolversTypes['WebhookInvocation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WebhookInvocationHistoryConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['WebhookInvocationHistoryConnection'] = ResolversParentTypes['WebhookInvocationHistoryConnection']> = {
  edges?: Resolver<Array<ResolversTypes['WebhookInvocationHistoryEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WebhookInvocationHistoryEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['WebhookInvocationHistoryEdge'] = ResolversParentTypes['WebhookInvocationHistoryEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['WebhookInvocationHistory'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
  WebhookInvocation?: WebhookInvocationResolvers<ContextType>;
  WebhookInvocationHistory?: WebhookInvocationHistoryResolvers<ContextType>;
  WebhookInvocationHistoryConnection?: WebhookInvocationHistoryConnectionResolvers<ContextType>;
  WebhookInvocationHistoryEdge?: WebhookInvocationHistoryEdgeResolvers<ContextType>;
};

