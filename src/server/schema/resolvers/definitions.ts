/* eslint-disable */
import { LifeCategory } from './enums';
import { LifePriority } from './enums';
import { LifeStatus } from './enums';
import { LifeTrackerSortingField } from './enums';
import { SortingOrder } from './enums';
import { UserSortingField } from './enums';
import { ObjectId } from 'mongodb';
import { FileUploadPromise } from '../context';
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { User, UserSession, ExternalLink, ResetPasswordLink } from '../../database';
import { SystemMessage } from '../../utils/systemMessage';
import { AuthenticationResponse } from './typings';
import { Context, RootDocument } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
  JSONObject: any;
  ObjectID: ObjectId;
  Upload: FileUploadPromise;
};

export type GraphQLAuthenticationRequiresNewPassword = {
  /** Token to use with the mutation `changePasswordFromAuthentication` */
  token: Scalars['String'];
  /** User authenticated */
  user: GraphQLUser;
};

export type GraphQLAuthenticationRequiresTotp = {
  /** Token to use with the mutation `authenticateWithTOTP` */
  token: Scalars['String'];
};

export type GraphQLAuthenticationResponse = GraphQLAuthenticationRequiresNewPassword | GraphQLAuthenticationRequiresTotp | GraphQLAuthenticationSuccessful;

export type GraphQLAuthenticationSuccessful = {
  /** Bearer token to use in the Authorization header */
  token: Scalars['String'];
  /** User authenticated */
  user: GraphQLUser;
};

export type GraphQLAuthenticationWithWebPublicKeyCredential = {
  /** Allowed credentials */
  allowCredentials: Array<Scalars['JSONObject']>;
  /** Challenge for the request */
  challenge: Scalars['String'];
  /** Timeout */
  timeout?: Maybe<Scalars['Int']>;
  /** Token to use with the mutation `authenticateWithWebPublicKeyCredential` */
  token: Scalars['String'];
};

export type GraphQLAuthenticatorSetup = {
  /** QRCode URI for the given authenticator secret */
  qrcodeUri: Scalars['String'];
  /** Authenticator secret */
  secret: Scalars['String'];
};

export type GraphQLCreateLifeTrackerInput = {
  category: LifeCategory;
  date: Scalars['DateTime'];
  eventName: Scalars['String'];
  priority: LifePriority;
  status: LifeStatus;
};

export type GraphQLExternalLink = GraphQLResetPasswordLink;

export { LifeCategory };

export { LifePriority };

export { LifeStatus };

export type GraphQLLifeTracker = {
  category: LifeCategory;
  date: Scalars['DateTime'];
  eventName: Scalars['String'];
  id: Scalars['ObjectID'];
  priority: LifePriority;
  status: LifeStatus;
  user: GraphQLUser;
};

export type GraphQLLifeTrackerNotification = {
  date: Scalars['DateTime'];
  isUpdated: Scalars['Boolean'];
};

export { LifeTrackerSortingField };

export type GraphQLLifeTrackerSortingRule = {
  /** Field on which apply the sorting */
  field: LifeTrackerSortingField;
  /** Sorting order */
  order: SortingOrder;
};

export type GraphQLMessageNotice = {
  date: Scalars['DateTime'];
  message: Scalars['String'];
};

export type GraphQLMutation = {
  /** Create LifeTracker */
  addLifeTracker: GraphQLLifeTracker;
  /** Request to renew a password */
  applyForPasswordChange: Scalars['Boolean'];
  /** Validate credentials (username/password) and return a Json Web Token */
  authenticate: GraphQLAuthenticationResponse;
  /** Continue authentication with TOTP */
  authenticateWithTOTP: GraphQLAuthenticationResponse;
  /** Authenticate with a web public key credential */
  authenticateWithWebPublicKeyCredential: GraphQLAuthenticationResponse;
  /** Change password following a successful authentication */
  changePasswordFromAuthentication: GraphQLAuthenticationResponse;
  /** Change password by using a token */
  changePasswordFromToken: Scalars['Boolean'];
  /** Complete registration request for a web public key */
  completeWebPublicKeyCredentialRegistration: Scalars['Boolean'];
  /** Create a new account/user */
  createAccount: GraphQLUser;
  /** Delete LifeTracker */
  deleteLifeTracker: Scalars['Boolean'];
  /** Disable 2FA / Authenticator for the signed user */
  disableAuthenticator: GraphQLUser;
  /** Enable 2FA / Authenticator for the signed user */
  enableAuthenticator: GraphQLUser;
  /** Generate a challenge to authenticate with web credentials */
  generateWebCredentialAuthentication?: Maybe<GraphQLAuthenticationWithWebPublicKeyCredential>;
  /**
   * Take the Json Web Token (JWT) from headers and returns a new one with a renewed lifetime
   *
   * Authentication is required
   */
  refreshCredentials: Scalars['String'];
  /** Create a web public key credential registration request */
  requestWebPublicKeyCredentialRegistration: GraphQLWebPublicKeyCredentialRegistrationRequest;
  /** Revoke user session */
  revokeUserSession: Scalars['Boolean'];
  /**
   * Revoke web public ket credential
   *
   * Return the key ID revoked
   */
  revokeWebPublicKeyCredential?: Maybe<Scalars['String']>;
  /**
   * Update the display name for the logged in user
   *
   * Authentication is required
   */
  updateDisplayName: GraphQLUser;
  /** Update LifeTracker */
  updateLifeTracker: GraphQLLifeTracker;
};


export type GraphQLMutationAddLifeTrackerArgs = {
  lifeTracker?: InputMaybe<GraphQLCreateLifeTrackerInput>;
};


export type GraphQLMutationApplyForPasswordChangeArgs = {
  username: Scalars['String'];
};


export type GraphQLMutationAuthenticateArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type GraphQLMutationAuthenticateWithTotpArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type GraphQLMutationAuthenticateWithWebPublicKeyCredentialArgs = {
  response: Scalars['JSONObject'];
  token: Scalars['String'];
};


export type GraphQLMutationChangePasswordFromAuthenticationArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type GraphQLMutationChangePasswordFromTokenArgs = {
  password?: InputMaybe<Scalars['String']>;
  token: Scalars['String'];
};


export type GraphQLMutationCompleteWebPublicKeyCredentialRegistrationArgs = {
  response: Scalars['JSONObject'];
  token: Scalars['String'];
};


export type GraphQLMutationCreateAccountArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type GraphQLMutationDeleteLifeTrackerArgs = {
  id: Scalars['ObjectID'];
};


export type GraphQLMutationEnableAuthenticatorArgs = {
  secret: Scalars['String'];
  token: Scalars['String'];
};


export type GraphQLMutationGenerateWebCredentialAuthenticationArgs = {
  username: Scalars['String'];
};


export type GraphQLMutationRevokeUserSessionArgs = {
  displayNotice?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ObjectID'];
};


export type GraphQLMutationRevokeWebPublicKeyCredentialArgs = {
  id: Scalars['ObjectID'];
};


export type GraphQLMutationUpdateDisplayNameArgs = {
  displayName: Scalars['String'];
};


export type GraphQLMutationUpdateLifeTrackerArgs = {
  id: Scalars['ObjectID'];
  lifeTracker: GraphQLCreateLifeTrackerInput;
};

export type GraphQLPaginatedLifeTracker = {
  /** Number of user matching the original query */
  count: Scalars['Int'];
  /** User on the request page */
  items: Array<GraphQLLifeTracker>;
};

export type GraphQLPaginatedUsers = {
  /** Number of user matching the original query */
  count: Scalars['Int'];
  /** User on the request page */
  items: Array<GraphQLUser>;
};

export type GraphQLPagination = {
  /** Number of items to fetch from a list */
  limit: Scalars['Int'];
  /** Offset to apply when fetching a list */
  offset: Scalars['Int'];
};

export type GraphQLQuery = {
  /** Fetch user document for the logged in user, returns null otherwise for anonymous */
  currentUser?: Maybe<GraphQLUser>;
  /** Generate challenge to authenticate with WebAuthn */
  generateAuthenticatorChallenge?: Maybe<GraphQLAuthenticationWithWebPublicKeyCredential>;
  /** Generate authenticator secret and qrcode */
  generateAuthenticatorSetup: GraphQLAuthenticatorSetup;
  /** Get Life Tracker by Id */
  getLifeTrackerbyId: GraphQLLifeTracker;
  /** Fetch WebAuthn security keys for a username */
  getWebauthnKeys: Array<Scalars['String']>;
  /** List life tracker */
  listLifeTracker: GraphQLPaginatedLifeTracker;
  /** List users */
  listUsers: GraphQLPaginatedUsers;
  /** Retrieve a link information */
  retrieveLink?: Maybe<GraphQLExternalLink>;
};


export type GraphQLQueryGenerateAuthenticatorChallengeArgs = {
  username: Scalars['String'];
};


export type GraphQLQueryGetLifeTrackerbyIdArgs = {
  id: Scalars['ObjectID'];
};


export type GraphQLQueryGetWebauthnKeysArgs = {
  username: Scalars['String'];
};


export type GraphQLQueryListLifeTrackerArgs = {
  pagination: GraphQLPagination;
  sort?: InputMaybe<GraphQLLifeTrackerSortingRule>;
};


export type GraphQLQueryListUsersArgs = {
  filter?: InputMaybe<GraphQLUserFilteringRule>;
  pagination: GraphQLPagination;
  sort?: InputMaybe<GraphQLUserSortingRule>;
};


export type GraphQLQueryRetrieveLinkArgs = {
  id: Scalars['String'];
};

export type GraphQLResetPasswordLink = {
  /** Token to use with mutation `changePasswordFromToken` */
  token: Scalars['String'];
};

export { SortingOrder };

export type GraphQLSubscription = {
  listenLifeTrackerNotification: GraphQLLifeTrackerNotification;
  listenSystemMessages: GraphQLSystemMessage;
};

export type GraphQLSystemMessage = GraphQLMessageNotice | GraphQLUserSessionRevoked;

export type GraphQLUser = {
  /** Public displayed on interfaces */
  displayName: Scalars['String'];
  /** Email address for the user */
  email: Scalars['String'];
  /** User object ID */
  id: Scalars['ObjectID'];
  /** Is the authenticator enabled for this account */
  isAuthenticatorEnabled: Scalars['Boolean'];
  /** Is the password expired for this account */
  isPasswordExpired: Scalars['Boolean'];
  /** Password expiration date */
  passwordExpiresAt: Scalars['DateTime'];
  /** Sessions */
  sessions: Array<GraphQLUserSession>;
  /** Username use for authentication */
  username: Scalars['String'];
  /** WebAuthn keys */
  webAuthnKeys: Array<GraphQLUserWebAuthnKey>;
};

export type GraphQLUserFilteringRule = {
  /** Filter by email */
  email?: InputMaybe<Scalars['String']>;
};

export type GraphQLUserSession = {
  /** Creation date */
  createdAt: Scalars['DateTime'];
  /** Expiration date */
  expiresAt: Scalars['DateTime'];
  /** Session ID */
  id: Scalars['ObjectID'];
  /** IP */
  ip: Scalars['String'];
  /** Last activity date */
  lastActivityAt: Scalars['DateTime'];
  /** User agent */
  userAgent: Scalars['String'];
};

export type GraphQLUserSessionRevoked = {
  date: Scalars['DateTime'];
  displayNotice: Scalars['Boolean'];
};

export { UserSortingField };

export type GraphQLUserSortingRule = {
  /** Field on which apply the sorting */
  field: UserSortingField;
  /** Sorting order */
  order: SortingOrder;
};

export type GraphQLUserWebAuthnKey = {
  /** Expiration date */
  expiresAt: Scalars['DateTime'];
  /** Key object ID */
  id: Scalars['ObjectID'];
  /** Last usage date */
  lastUsed?: Maybe<Scalars['DateTime']>;
  /** Raw key ID */
  rawKeyId: Scalars['String'];
  /** User Agent */
  userAgent: Scalars['String'];
};

export type GraphQLWebPublicKeyCredentialRegistrationRequest = {
  /** Options for WebAuthn */
  options: Scalars['JSONObject'];
  /** Token to proceed with registration */
  token: Scalars['String'];
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
export type GraphQLResolversTypes = {
  AuthenticationRequiresNewPassword: ResolverTypeWrapper<Omit<GraphQLAuthenticationRequiresNewPassword, 'user'> & { user: GraphQLResolversTypes['User'] }>;
  AuthenticationRequiresTOTP: ResolverTypeWrapper<GraphQLAuthenticationRequiresTotp>;
  AuthenticationResponse: ResolverTypeWrapper<AuthenticationResponse>;
  AuthenticationSuccessful: ResolverTypeWrapper<Omit<GraphQLAuthenticationSuccessful, 'user'> & { user: GraphQLResolversTypes['User'] }>;
  AuthenticationWithWebPublicKeyCredential: ResolverTypeWrapper<GraphQLAuthenticationWithWebPublicKeyCredential>;
  AuthenticatorSetup: ResolverTypeWrapper<GraphQLAuthenticatorSetup>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateLifeTrackerInput: GraphQLCreateLifeTrackerInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  ExternalLink: ResolverTypeWrapper<ExternalLink>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  LifeCategory: LifeCategory;
  LifePriority: LifePriority;
  LifeStatus: LifeStatus;
  LifeTracker: ResolverTypeWrapper<Omit<GraphQLLifeTracker, 'user'> & { user: GraphQLResolversTypes['User'] }>;
  LifeTrackerNotification: ResolverTypeWrapper<GraphQLLifeTrackerNotification>;
  LifeTrackerSortingField: LifeTrackerSortingField;
  LifeTrackerSortingRule: GraphQLLifeTrackerSortingRule;
  MessageNotice: ResolverTypeWrapper<GraphQLMessageNotice>;
  Mutation: ResolverTypeWrapper<RootDocument>;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']>;
  PaginatedLifeTracker: ResolverTypeWrapper<Omit<GraphQLPaginatedLifeTracker, 'items'> & { items: Array<GraphQLResolversTypes['LifeTracker']> }>;
  PaginatedUsers: ResolverTypeWrapper<Omit<GraphQLPaginatedUsers, 'items'> & { items: Array<GraphQLResolversTypes['User']> }>;
  Pagination: GraphQLPagination;
  Query: ResolverTypeWrapper<RootDocument>;
  ResetPasswordLink: ResolverTypeWrapper<ResetPasswordLink>;
  SortingOrder: SortingOrder;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<RootDocument>;
  SystemMessage: ResolverTypeWrapper<SystemMessage>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
  UserFilteringRule: GraphQLUserFilteringRule;
  UserSession: ResolverTypeWrapper<UserSession>;
  UserSessionRevoked: ResolverTypeWrapper<GraphQLUserSessionRevoked>;
  UserSortingField: UserSortingField;
  UserSortingRule: GraphQLUserSortingRule;
  UserWebAuthnKey: ResolverTypeWrapper<GraphQLUserWebAuthnKey>;
  WebPublicKeyCredentialRegistrationRequest: ResolverTypeWrapper<GraphQLWebPublicKeyCredentialRegistrationRequest>;
};

/** Mapping between all available schema types and the resolvers parents */
export type GraphQLResolversParentTypes = {
  AuthenticationRequiresNewPassword: Omit<GraphQLAuthenticationRequiresNewPassword, 'user'> & { user: GraphQLResolversParentTypes['User'] };
  AuthenticationRequiresTOTP: GraphQLAuthenticationRequiresTotp;
  AuthenticationResponse: AuthenticationResponse;
  AuthenticationSuccessful: Omit<GraphQLAuthenticationSuccessful, 'user'> & { user: GraphQLResolversParentTypes['User'] };
  AuthenticationWithWebPublicKeyCredential: GraphQLAuthenticationWithWebPublicKeyCredential;
  AuthenticatorSetup: GraphQLAuthenticatorSetup;
  Boolean: Scalars['Boolean'];
  CreateLifeTrackerInput: GraphQLCreateLifeTrackerInput;
  DateTime: Scalars['DateTime'];
  ExternalLink: ExternalLink;
  Int: Scalars['Int'];
  JSONObject: Scalars['JSONObject'];
  LifeTracker: Omit<GraphQLLifeTracker, 'user'> & { user: GraphQLResolversParentTypes['User'] };
  LifeTrackerNotification: GraphQLLifeTrackerNotification;
  LifeTrackerSortingRule: GraphQLLifeTrackerSortingRule;
  MessageNotice: GraphQLMessageNotice;
  Mutation: RootDocument;
  ObjectID: Scalars['ObjectID'];
  PaginatedLifeTracker: Omit<GraphQLPaginatedLifeTracker, 'items'> & { items: Array<GraphQLResolversParentTypes['LifeTracker']> };
  PaginatedUsers: Omit<GraphQLPaginatedUsers, 'items'> & { items: Array<GraphQLResolversParentTypes['User']> };
  Pagination: GraphQLPagination;
  Query: RootDocument;
  ResetPasswordLink: ResetPasswordLink;
  String: Scalars['String'];
  Subscription: RootDocument;
  SystemMessage: SystemMessage;
  Upload: Scalars['Upload'];
  User: User;
  UserFilteringRule: GraphQLUserFilteringRule;
  UserSession: UserSession;
  UserSessionRevoked: GraphQLUserSessionRevoked;
  UserSortingRule: GraphQLUserSortingRule;
  UserWebAuthnKey: GraphQLUserWebAuthnKey;
  WebPublicKeyCredentialRegistrationRequest: GraphQLWebPublicKeyCredentialRegistrationRequest;
};

export type GraphQLAuthenticationRequiresNewPasswordResolvers<ContextType = Context, ParentType extends GraphQLResolversParentTypes['AuthenticationRequiresNewPassword'] = GraphQLResolversParentTypes['AuthenticationRequiresNewPassword']> = {
  token?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<GraphQLResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GraphQLAuthenticationRequiresTotpResolvers<ContextType = Context, ParentType extends GraphQLResolversParentTypes['AuthenticationRequiresTOTP'] = GraphQLResolversParentTypes['AuthenticationRequiresTOTP']> = {
  token?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GraphQLAuthenticationResponseResolvers<ContextType = Context, ParentType extends GraphQLResolversParentTypes['AuthenticationResponse'] = GraphQLResolversParentTypes['AuthenticationResponse']> = {
  __resolveType: TypeResolveFn<'AuthenticationRequiresNewPassword' | 'AuthenticationRequiresTOTP' | 'AuthenticationSuccessful', ParentType, ContextType>;
};

export type GraphQLAuthenticationSuccessfulResolvers<ContextType = Context, ParentType extends GraphQLResolversParentTypes['AuthenticationSuccessful'] = GraphQLResolversParentTypes['AuthenticationSuccessful']> = {
  token?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<GraphQLResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GraphQLAuthenticationWithWebPublicKeyCredentialResolvers<ContextType = Context, ParentType extends GraphQLResolversParentTypes['AuthenticationWithWebPublicKeyCredential'] = GraphQLResolversParentTypes['AuthenticationWithWebPublicKeyCredential']> = {
  allowCredentials?: Resolver<Array<GraphQLResolversTypes['JSONObject']>, ParentType, ContextType>;
  challenge?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  timeout?: Resolver<Maybe<GraphQLResolversTypes['Int']>, ParentType, ContextType>;
  token?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GraphQLAuthenticatorSetupResolvers<ContextType = Context, ParentType extends GraphQLResolversParentTypes['AuthenticatorSetup'] = GraphQLResolversParentTypes['AuthenticatorSetup']> = {
  qrcodeUri?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  secret?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface GraphQLDateTimeScalarConfig extends GraphQLScalarTypeConfig<GraphQLResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type GraphQLExternalLinkResolvers<ContextType = Context, ParentType extends GraphQLResolversParentTypes['ExternalLink'] = GraphQLResolversParentTypes['ExternalLink']> = {
  __resolveType: TypeResolveFn<'ResetPasswordLink', ParentType, ContextType>;
};

export interface GraphQLJsonObjectScalarConfig extends GraphQLScalarTypeConfig<GraphQLResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type GraphQLLifeCategoryResolvers = EnumResolverSignature<{ Education?: any, Finance?: any, Health?: any, Other?: any, Personal?: any, Travel?: any, Work?: any }, GraphQLResolversTypes['LifeCategory']>;

export type GraphQLLifePriorityResolvers = EnumResolverSignature<{ High?: any, Low?: any, Medium?: any }, GraphQLResolversTypes['LifePriority']>;

export type GraphQLLifeStatusResolvers = EnumResolverSignature<{ Canceled?: any, Completed?: any, Ongoing?: any, Planned?: any }, GraphQLResolversTypes['LifeStatus']>;

export type GraphQLLifeTrackerResolvers<ContextType = Context, ParentType extends GraphQLResolversParentTypes['LifeTracker'] = GraphQLResolversParentTypes['LifeTracker']> = {
  category?: Resolver<GraphQLResolversTypes['LifeCategory'], ParentType, ContextType>;
  date?: Resolver<GraphQLResolversTypes['DateTime'], ParentType, ContextType>;
  eventName?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GraphQLResolversTypes['ObjectID'], ParentType, ContextType>;
  priority?: Resolver<GraphQLResolversTypes['LifePriority'], ParentType, ContextType>;
  status?: Resolver<GraphQLResolversTypes['LifeStatus'], ParentType, ContextType>;
  user?: Resolver<GraphQLResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GraphQLLifeTrackerNotificationResolvers<ContextType = Context, ParentType extends GraphQLResolversParentTypes['LifeTrackerNotification'] = GraphQLResolversParentTypes['LifeTrackerNotification']> = {
  date?: Resolver<GraphQLResolversTypes['DateTime'], ParentType, ContextType>;
  isUpdated?: Resolver<GraphQLResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GraphQLLifeTrackerSortingFieldResolvers = EnumResolverSignature<{ Category?: any, EventName?: any, Priority?: any, Status?: any }, GraphQLResolversTypes['LifeTrackerSortingField']>;

export type GraphQLMessageNoticeResolvers<ContextType = Context, ParentType extends GraphQLResolversParentTypes['MessageNotice'] = GraphQLResolversParentTypes['MessageNotice']> = {
  date?: Resolver<GraphQLResolversTypes['DateTime'], ParentType, ContextType>;
  message?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GraphQLMutationResolvers<ContextType = Context, ParentType extends GraphQLResolversParentTypes['Mutation'] = GraphQLResolversParentTypes['Mutation']> = {
  addLifeTracker?: Resolver<GraphQLResolversTypes['LifeTracker'], ParentType, ContextType, Partial<GraphQLMutationAddLifeTrackerArgs>>;
  applyForPasswordChange?: Resolver<GraphQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GraphQLMutationApplyForPasswordChangeArgs, 'username'>>;
  authenticate?: Resolver<GraphQLResolversTypes['AuthenticationResponse'], ParentType, ContextType, RequireFields<GraphQLMutationAuthenticateArgs, 'password' | 'username'>>;
  authenticateWithTOTP?: Resolver<GraphQLResolversTypes['AuthenticationResponse'], ParentType, ContextType, RequireFields<GraphQLMutationAuthenticateWithTotpArgs, 'password' | 'token'>>;
  authenticateWithWebPublicKeyCredential?: Resolver<GraphQLResolversTypes['AuthenticationResponse'], ParentType, ContextType, RequireFields<GraphQLMutationAuthenticateWithWebPublicKeyCredentialArgs, 'response' | 'token'>>;
  changePasswordFromAuthentication?: Resolver<GraphQLResolversTypes['AuthenticationResponse'], ParentType, ContextType, RequireFields<GraphQLMutationChangePasswordFromAuthenticationArgs, 'password' | 'token'>>;
  changePasswordFromToken?: Resolver<GraphQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GraphQLMutationChangePasswordFromTokenArgs, 'token'>>;
  completeWebPublicKeyCredentialRegistration?: Resolver<GraphQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GraphQLMutationCompleteWebPublicKeyCredentialRegistrationArgs, 'response' | 'token'>>;
  createAccount?: Resolver<GraphQLResolversTypes['User'], ParentType, ContextType, RequireFields<GraphQLMutationCreateAccountArgs, 'email' | 'password' | 'username'>>;
  deleteLifeTracker?: Resolver<GraphQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GraphQLMutationDeleteLifeTrackerArgs, 'id'>>;
  disableAuthenticator?: Resolver<GraphQLResolversTypes['User'], ParentType, ContextType>;
  enableAuthenticator?: Resolver<GraphQLResolversTypes['User'], ParentType, ContextType, RequireFields<GraphQLMutationEnableAuthenticatorArgs, 'secret' | 'token'>>;
  generateWebCredentialAuthentication?: Resolver<Maybe<GraphQLResolversTypes['AuthenticationWithWebPublicKeyCredential']>, ParentType, ContextType, RequireFields<GraphQLMutationGenerateWebCredentialAuthenticationArgs, 'username'>>;
  refreshCredentials?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  requestWebPublicKeyCredentialRegistration?: Resolver<GraphQLResolversTypes['WebPublicKeyCredentialRegistrationRequest'], ParentType, ContextType>;
  revokeUserSession?: Resolver<GraphQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GraphQLMutationRevokeUserSessionArgs, 'id'>>;
  revokeWebPublicKeyCredential?: Resolver<Maybe<GraphQLResolversTypes['String']>, ParentType, ContextType, RequireFields<GraphQLMutationRevokeWebPublicKeyCredentialArgs, 'id'>>;
  updateDisplayName?: Resolver<GraphQLResolversTypes['User'], ParentType, ContextType, RequireFields<GraphQLMutationUpdateDisplayNameArgs, 'displayName'>>;
  updateLifeTracker?: Resolver<GraphQLResolversTypes['LifeTracker'], ParentType, ContextType, RequireFields<GraphQLMutationUpdateLifeTrackerArgs, 'id' | 'lifeTracker'>>;
};

export interface GraphQLObjectIdScalarConfig extends GraphQLScalarTypeConfig<GraphQLResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export type GraphQLPaginatedLifeTrackerResolvers<ContextType = Context, ParentType extends GraphQLResolversParentTypes['PaginatedLifeTracker'] = GraphQLResolversParentTypes['PaginatedLifeTracker']> = {
  count?: Resolver<GraphQLResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<GraphQLResolversTypes['LifeTracker']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GraphQLPaginatedUsersResolvers<ContextType = Context, ParentType extends GraphQLResolversParentTypes['PaginatedUsers'] = GraphQLResolversParentTypes['PaginatedUsers']> = {
  count?: Resolver<GraphQLResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<GraphQLResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GraphQLQueryResolvers<ContextType = Context, ParentType extends GraphQLResolversParentTypes['Query'] = GraphQLResolversParentTypes['Query']> = {
  currentUser?: Resolver<Maybe<GraphQLResolversTypes['User']>, ParentType, ContextType>;
  generateAuthenticatorChallenge?: Resolver<Maybe<GraphQLResolversTypes['AuthenticationWithWebPublicKeyCredential']>, ParentType, ContextType, RequireFields<GraphQLQueryGenerateAuthenticatorChallengeArgs, 'username'>>;
  generateAuthenticatorSetup?: Resolver<GraphQLResolversTypes['AuthenticatorSetup'], ParentType, ContextType>;
  getLifeTrackerbyId?: Resolver<GraphQLResolversTypes['LifeTracker'], ParentType, ContextType, RequireFields<GraphQLQueryGetLifeTrackerbyIdArgs, 'id'>>;
  getWebauthnKeys?: Resolver<Array<GraphQLResolversTypes['String']>, ParentType, ContextType, RequireFields<GraphQLQueryGetWebauthnKeysArgs, 'username'>>;
  listLifeTracker?: Resolver<GraphQLResolversTypes['PaginatedLifeTracker'], ParentType, ContextType, RequireFields<GraphQLQueryListLifeTrackerArgs, 'pagination'>>;
  listUsers?: Resolver<GraphQLResolversTypes['PaginatedUsers'], ParentType, ContextType, RequireFields<GraphQLQueryListUsersArgs, 'pagination'>>;
  retrieveLink?: Resolver<Maybe<GraphQLResolversTypes['ExternalLink']>, ParentType, ContextType, RequireFields<GraphQLQueryRetrieveLinkArgs, 'id'>>;
};

export type GraphQLResetPasswordLinkResolvers<ContextType = Context, ParentType extends GraphQLResolversParentTypes['ResetPasswordLink'] = GraphQLResolversParentTypes['ResetPasswordLink']> = {
  token?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GraphQLSortingOrderResolvers = EnumResolverSignature<{ Asc?: any, Desc?: any }, GraphQLResolversTypes['SortingOrder']>;

export type GraphQLSubscriptionResolvers<ContextType = Context, ParentType extends GraphQLResolversParentTypes['Subscription'] = GraphQLResolversParentTypes['Subscription']> = {
  listenLifeTrackerNotification?: SubscriptionResolver<GraphQLResolversTypes['LifeTrackerNotification'], "listenLifeTrackerNotification", ParentType, ContextType>;
  listenSystemMessages?: SubscriptionResolver<GraphQLResolversTypes['SystemMessage'], "listenSystemMessages", ParentType, ContextType>;
};

export type GraphQLSystemMessageResolvers<ContextType = Context, ParentType extends GraphQLResolversParentTypes['SystemMessage'] = GraphQLResolversParentTypes['SystemMessage']> = {
  __resolveType: TypeResolveFn<'MessageNotice' | 'UserSessionRevoked', ParentType, ContextType>;
};

export interface GraphQLUploadScalarConfig extends GraphQLScalarTypeConfig<GraphQLResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type GraphQLUserResolvers<ContextType = Context, ParentType extends GraphQLResolversParentTypes['User'] = GraphQLResolversParentTypes['User']> = {
  displayName?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GraphQLResolversTypes['ObjectID'], ParentType, ContextType>;
  isAuthenticatorEnabled?: Resolver<GraphQLResolversTypes['Boolean'], ParentType, ContextType>;
  isPasswordExpired?: Resolver<GraphQLResolversTypes['Boolean'], ParentType, ContextType>;
  passwordExpiresAt?: Resolver<GraphQLResolversTypes['DateTime'], ParentType, ContextType>;
  sessions?: Resolver<Array<GraphQLResolversTypes['UserSession']>, ParentType, ContextType>;
  username?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  webAuthnKeys?: Resolver<Array<GraphQLResolversTypes['UserWebAuthnKey']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GraphQLUserSessionResolvers<ContextType = Context, ParentType extends GraphQLResolversParentTypes['UserSession'] = GraphQLResolversParentTypes['UserSession']> = {
  createdAt?: Resolver<GraphQLResolversTypes['DateTime'], ParentType, ContextType>;
  expiresAt?: Resolver<GraphQLResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<GraphQLResolversTypes['ObjectID'], ParentType, ContextType>;
  ip?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  lastActivityAt?: Resolver<GraphQLResolversTypes['DateTime'], ParentType, ContextType>;
  userAgent?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GraphQLUserSessionRevokedResolvers<ContextType = Context, ParentType extends GraphQLResolversParentTypes['UserSessionRevoked'] = GraphQLResolversParentTypes['UserSessionRevoked']> = {
  date?: Resolver<GraphQLResolversTypes['DateTime'], ParentType, ContextType>;
  displayNotice?: Resolver<GraphQLResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GraphQLUserSortingFieldResolvers = EnumResolverSignature<{ Authenticator?: any, Email?: any }, GraphQLResolversTypes['UserSortingField']>;

export type GraphQLUserWebAuthnKeyResolvers<ContextType = Context, ParentType extends GraphQLResolversParentTypes['UserWebAuthnKey'] = GraphQLResolversParentTypes['UserWebAuthnKey']> = {
  expiresAt?: Resolver<GraphQLResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<GraphQLResolversTypes['ObjectID'], ParentType, ContextType>;
  lastUsed?: Resolver<Maybe<GraphQLResolversTypes['DateTime']>, ParentType, ContextType>;
  rawKeyId?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  userAgent?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GraphQLWebPublicKeyCredentialRegistrationRequestResolvers<ContextType = Context, ParentType extends GraphQLResolversParentTypes['WebPublicKeyCredentialRegistrationRequest'] = GraphQLResolversParentTypes['WebPublicKeyCredentialRegistrationRequest']> = {
  options?: Resolver<GraphQLResolversTypes['JSONObject'], ParentType, ContextType>;
  token?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GraphQLResolvers<ContextType = Context> = {
  AuthenticationRequiresNewPassword?: GraphQLAuthenticationRequiresNewPasswordResolvers<ContextType>;
  AuthenticationRequiresTOTP?: GraphQLAuthenticationRequiresTotpResolvers<ContextType>;
  AuthenticationResponse?: GraphQLAuthenticationResponseResolvers<ContextType>;
  AuthenticationSuccessful?: GraphQLAuthenticationSuccessfulResolvers<ContextType>;
  AuthenticationWithWebPublicKeyCredential?: GraphQLAuthenticationWithWebPublicKeyCredentialResolvers<ContextType>;
  AuthenticatorSetup?: GraphQLAuthenticatorSetupResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  ExternalLink?: GraphQLExternalLinkResolvers<ContextType>;
  JSONObject?: GraphQLScalarType;
  LifeCategory?: GraphQLLifeCategoryResolvers;
  LifePriority?: GraphQLLifePriorityResolvers;
  LifeStatus?: GraphQLLifeStatusResolvers;
  LifeTracker?: GraphQLLifeTrackerResolvers<ContextType>;
  LifeTrackerNotification?: GraphQLLifeTrackerNotificationResolvers<ContextType>;
  LifeTrackerSortingField?: GraphQLLifeTrackerSortingFieldResolvers;
  MessageNotice?: GraphQLMessageNoticeResolvers<ContextType>;
  Mutation?: GraphQLMutationResolvers<ContextType>;
  ObjectID?: GraphQLScalarType;
  PaginatedLifeTracker?: GraphQLPaginatedLifeTrackerResolvers<ContextType>;
  PaginatedUsers?: GraphQLPaginatedUsersResolvers<ContextType>;
  Query?: GraphQLQueryResolvers<ContextType>;
  ResetPasswordLink?: GraphQLResetPasswordLinkResolvers<ContextType>;
  SortingOrder?: GraphQLSortingOrderResolvers;
  Subscription?: GraphQLSubscriptionResolvers<ContextType>;
  SystemMessage?: GraphQLSystemMessageResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: GraphQLUserResolvers<ContextType>;
  UserSession?: GraphQLUserSessionResolvers<ContextType>;
  UserSessionRevoked?: GraphQLUserSessionRevokedResolvers<ContextType>;
  UserSortingField?: GraphQLUserSortingFieldResolvers;
  UserWebAuthnKey?: GraphQLUserWebAuthnKeyResolvers<ContextType>;
  WebPublicKeyCredentialRegistrationRequest?: GraphQLWebPublicKeyCredentialRegistrationRequestResolvers<ContextType>;
};

