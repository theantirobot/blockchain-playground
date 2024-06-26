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

export type Block = {
  __typename?: 'Block';
  id: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  subscribe?: Maybe<Sub>;
  unsubscribe?: Maybe<Scalars['Boolean']['output']>;
  updateSubscription?: Maybe<Sub>;
};


export type MutationSubscribeArgs = {
  input: SubscribeInput;
};


export type MutationUnsubscribeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateSubscriptionArgs = {
  id: Scalars['ID']['input'];
  input: SubscribeInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  subscription?: Maybe<Sub>;
  subscriptions?: Maybe<SubscriptionConnection>;
};


export type QuerySubscriptionArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySubscriptionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<SubscriptionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type Sub = {
  __typename?: 'Sub';
  address?: Maybe<Scalars['String']['output']>;
  confirmationCount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  revisions?: Maybe<SubscriptionRevisionConnection>;
  webhookUrl?: Maybe<Scalars['String']['output']>;
};


export type SubRevisionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type SubscribeInput = {
  address: Scalars['String']['input'];
  confirmationCount: Scalars['Int']['input'];
  webhookUrl: Scalars['String']['input'];
};

export type SubscriptionConnection = {
  __typename?: 'SubscriptionConnection';
  edges?: Maybe<Array<Maybe<SubscriptionEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type SubscriptionEdge = {
  __typename?: 'SubscriptionEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Sub>;
};

export type SubscriptionFilter = {
  addresses?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type SubscriptionRevision = {
  __typename?: 'SubscriptionRevision';
  changeSummary: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  subscription: Sub;
  timestamp: Scalars['String']['output'];
};

export type SubscriptionRevisionConnection = {
  __typename?: 'SubscriptionRevisionConnection';
  edges?: Maybe<Array<Maybe<SubscriptionRevisionEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type SubscriptionRevisionEdge = {
  __typename?: 'SubscriptionRevisionEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<SubscriptionRevision>;
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
  Block: ResolverTypeWrapper<Block>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Sub: ResolverTypeWrapper<Sub>;
  SubscribeInput: SubscribeInput;
  SubscriptionConnection: ResolverTypeWrapper<SubscriptionConnection>;
  SubscriptionEdge: ResolverTypeWrapper<SubscriptionEdge>;
  SubscriptionFilter: SubscriptionFilter;
  SubscriptionRevision: ResolverTypeWrapper<SubscriptionRevision>;
  SubscriptionRevisionConnection: ResolverTypeWrapper<SubscriptionRevisionConnection>;
  SubscriptionRevisionEdge: ResolverTypeWrapper<SubscriptionRevisionEdge>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Block: Block;
  Boolean: Scalars['Boolean']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  PageInfo: PageInfo;
  Query: {};
  String: Scalars['String']['output'];
  Sub: Sub;
  SubscribeInput: SubscribeInput;
  SubscriptionConnection: SubscriptionConnection;
  SubscriptionEdge: SubscriptionEdge;
  SubscriptionFilter: SubscriptionFilter;
  SubscriptionRevision: SubscriptionRevision;
  SubscriptionRevisionConnection: SubscriptionRevisionConnection;
  SubscriptionRevisionEdge: SubscriptionRevisionEdge;
};

export type BlockResolvers<ContextType = any, ParentType extends ResolversParentTypes['Block'] = ResolversParentTypes['Block']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  subscribe?: Resolver<Maybe<ResolversTypes['Sub']>, ParentType, ContextType, RequireFields<MutationSubscribeArgs, 'input'>>;
  unsubscribe?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUnsubscribeArgs, 'id'>>;
  updateSubscription?: Resolver<Maybe<ResolversTypes['Sub']>, ParentType, ContextType, RequireFields<MutationUpdateSubscriptionArgs, 'id' | 'input'>>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  subscription?: Resolver<Maybe<ResolversTypes['Sub']>, ParentType, ContextType, RequireFields<QuerySubscriptionArgs, 'id'>>;
  subscriptions?: Resolver<Maybe<ResolversTypes['SubscriptionConnection']>, ParentType, ContextType, Partial<QuerySubscriptionsArgs>>;
};

export type SubResolvers<ContextType = any, ParentType extends ResolversParentTypes['Sub'] = ResolversParentTypes['Sub']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  confirmationCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  revisions?: Resolver<Maybe<ResolversTypes['SubscriptionRevisionConnection']>, ParentType, ContextType, Partial<SubRevisionsArgs>>;
  webhookUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionConnection'] = ResolversParentTypes['SubscriptionConnection']> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['SubscriptionEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionEdge'] = ResolversParentTypes['SubscriptionEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Sub']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionRevisionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionRevision'] = ResolversParentTypes['SubscriptionRevision']> = {
  changeSummary?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  subscription?: Resolver<ResolversTypes['Sub'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionRevisionConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionRevisionConnection'] = ResolversParentTypes['SubscriptionRevisionConnection']> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['SubscriptionRevisionEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionRevisionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionRevisionEdge'] = ResolversParentTypes['SubscriptionRevisionEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['SubscriptionRevision']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Block?: BlockResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Sub?: SubResolvers<ContextType>;
  SubscriptionConnection?: SubscriptionConnectionResolvers<ContextType>;
  SubscriptionEdge?: SubscriptionEdgeResolvers<ContextType>;
  SubscriptionRevision?: SubscriptionRevisionResolvers<ContextType>;
  SubscriptionRevisionConnection?: SubscriptionRevisionConnectionResolvers<ContextType>;
  SubscriptionRevisionEdge?: SubscriptionRevisionEdgeResolvers<ContextType>;
};

