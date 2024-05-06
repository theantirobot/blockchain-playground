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

export type AddressSubscription = {
  __typename?: 'AddressSubscription';
  address?: Maybe<Scalars['String']['output']>;
  confirmationCount?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  revisions?: Maybe<AddressSubscriptionRevisionConnection>;
  webhookUrl?: Maybe<Scalars['String']['output']>;
};


export type AddressSubscriptionRevisionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type AddressSubscriptionConnection = {
  __typename?: 'AddressSubscriptionConnection';
  edges?: Maybe<Array<Maybe<AddressSubscriptionEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type AddressSubscriptionEdge = {
  __typename?: 'AddressSubscriptionEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<AddressSubscription>;
};

export type AddressSubscriptionFilter = {
  addresses?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type AddressSubscriptionRevision = {
  __typename?: 'AddressSubscriptionRevision';
  changeSummary: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  subscription: AddressSubscription;
};

export type AddressSubscriptionRevisionConnection = {
  __typename?: 'AddressSubscriptionRevisionConnection';
  edges?: Maybe<Array<Maybe<AddressSubscriptionRevisionEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type AddressSubscriptionRevisionEdge = {
  __typename?: 'AddressSubscriptionRevisionEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<AddressSubscriptionRevision>;
};

export type Block = {
  __typename?: 'Block';
  id: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  subscribe?: Maybe<AddressSubscription>;
  unsubscribe?: Maybe<Scalars['Boolean']['output']>;
  updateAddressSubscription?: Maybe<AddressSubscription>;
};


export type MutationSubscribeArgs = {
  input: SubscribeInput;
};


export type MutationUnsubscribeArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateAddressSubscriptionArgs = {
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
  subscription?: Maybe<AddressSubscription>;
  subscriptions?: Maybe<AddressSubscriptionConnection>;
};


export type QuerySubscriptionArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySubscriptionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<AddressSubscriptionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type SubscribeInput = {
  address: Scalars['String']['input'];
  confirmationCount: Scalars['Int']['input'];
  webhookUrl: Scalars['String']['input'];
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
  AddressSubscription: ResolverTypeWrapper<AddressSubscription>;
  AddressSubscriptionConnection: ResolverTypeWrapper<AddressSubscriptionConnection>;
  AddressSubscriptionEdge: ResolverTypeWrapper<AddressSubscriptionEdge>;
  AddressSubscriptionFilter: AddressSubscriptionFilter;
  AddressSubscriptionRevision: ResolverTypeWrapper<AddressSubscriptionRevision>;
  AddressSubscriptionRevisionConnection: ResolverTypeWrapper<AddressSubscriptionRevisionConnection>;
  AddressSubscriptionRevisionEdge: ResolverTypeWrapper<AddressSubscriptionRevisionEdge>;
  Block: ResolverTypeWrapper<Block>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  SubscribeInput: SubscribeInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddressSubscription: AddressSubscription;
  AddressSubscriptionConnection: AddressSubscriptionConnection;
  AddressSubscriptionEdge: AddressSubscriptionEdge;
  AddressSubscriptionFilter: AddressSubscriptionFilter;
  AddressSubscriptionRevision: AddressSubscriptionRevision;
  AddressSubscriptionRevisionConnection: AddressSubscriptionRevisionConnection;
  AddressSubscriptionRevisionEdge: AddressSubscriptionRevisionEdge;
  Block: Block;
  Boolean: Scalars['Boolean']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  PageInfo: PageInfo;
  Query: {};
  String: Scalars['String']['output'];
  SubscribeInput: SubscribeInput;
};

export type AddressSubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddressSubscription'] = ResolversParentTypes['AddressSubscription']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  confirmationCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  revisions?: Resolver<Maybe<ResolversTypes['AddressSubscriptionRevisionConnection']>, ParentType, ContextType, Partial<AddressSubscriptionRevisionsArgs>>;
  webhookUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddressSubscriptionConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddressSubscriptionConnection'] = ResolversParentTypes['AddressSubscriptionConnection']> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['AddressSubscriptionEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddressSubscriptionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddressSubscriptionEdge'] = ResolversParentTypes['AddressSubscriptionEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['AddressSubscription']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddressSubscriptionRevisionResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddressSubscriptionRevision'] = ResolversParentTypes['AddressSubscriptionRevision']> = {
  changeSummary?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  subscription?: Resolver<ResolversTypes['AddressSubscription'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddressSubscriptionRevisionConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddressSubscriptionRevisionConnection'] = ResolversParentTypes['AddressSubscriptionRevisionConnection']> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['AddressSubscriptionRevisionEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddressSubscriptionRevisionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddressSubscriptionRevisionEdge'] = ResolversParentTypes['AddressSubscriptionRevisionEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['AddressSubscriptionRevision']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BlockResolvers<ContextType = any, ParentType extends ResolversParentTypes['Block'] = ResolversParentTypes['Block']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  subscribe?: Resolver<Maybe<ResolversTypes['AddressSubscription']>, ParentType, ContextType, RequireFields<MutationSubscribeArgs, 'input'>>;
  unsubscribe?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUnsubscribeArgs, 'id'>>;
  updateAddressSubscription?: Resolver<Maybe<ResolversTypes['AddressSubscription']>, ParentType, ContextType, RequireFields<MutationUpdateAddressSubscriptionArgs, 'id' | 'input'>>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  subscription?: Resolver<Maybe<ResolversTypes['AddressSubscription']>, ParentType, ContextType, RequireFields<QuerySubscriptionArgs, 'id'>>;
  subscriptions?: Resolver<Maybe<ResolversTypes['AddressSubscriptionConnection']>, ParentType, ContextType, Partial<QuerySubscriptionsArgs>>;
};

export type Resolvers<ContextType = any> = {
  AddressSubscription?: AddressSubscriptionResolvers<ContextType>;
  AddressSubscriptionConnection?: AddressSubscriptionConnectionResolvers<ContextType>;
  AddressSubscriptionEdge?: AddressSubscriptionEdgeResolvers<ContextType>;
  AddressSubscriptionRevision?: AddressSubscriptionRevisionResolvers<ContextType>;
  AddressSubscriptionRevisionConnection?: AddressSubscriptionRevisionConnectionResolvers<ContextType>;
  AddressSubscriptionRevisionEdge?: AddressSubscriptionRevisionEdgeResolvers<ContextType>;
  Block?: BlockResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

