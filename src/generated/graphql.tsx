import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AllCompaniesResponse = {
  __typename?: 'AllCompaniesResponse';
  companies?: Maybe<Array<Company>>;
  errors?: Maybe<Array<FieldError>>;
  hasMore: Scalars['Boolean'];
  length: Scalars['Float'];
};

export type AllOrdersResponse = {
  __typename?: 'AllOrdersResponse';
  errors?: Maybe<Array<FieldError>>;
  hasMore: Scalars['Boolean'];
  length: Scalars['Float'];
  orders?: Maybe<Array<Order>>;
};

export type AllUsersResponse = {
  __typename?: 'AllUsersResponse';
  errors?: Maybe<Array<FieldError>>;
  hasMore: Scalars['Boolean'];
  length: Scalars['Float'];
  users?: Maybe<Array<User>>;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  errors?: Maybe<Array<FieldError>>;
  token?: Maybe<Scalars['String']>;
};

export type BteEar = {
  __typename?: 'BteEar';
  canal: Scalars['String'];
  canalLength: Scalars['String'];
  color: Scalars['String'];
  cymbaLength: Scalars['String'];
  haModel: Scalars['String'];
  manufacturer: Scalars['String'];
  markingDots: Scalars['Boolean'];
  model?: Maybe<Scalars['String']>;
  quantity: Scalars['Float'];
  serialNumber: Scalars['String'];
  shellId: Scalars['String'];
  soundTube: Scalars['String'];
  style: Scalars['String'];
  surface: Scalars['String'];
  ventSize: Scalars['String'];
};

export type Company = {
  __typename?: 'Company';
  _id: Scalars['String'];
  companyId: Scalars['String'];
  contactPerson: ContactPerson;
  country: Scalars['String'];
  createdAt: Scalars['DateTime'];
  manufacturers: Array<Scalars['String']>;
  postCode: Scalars['String'];
  street: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CompanyResponse = {
  __typename?: 'CompanyResponse';
  admin?: Maybe<User>;
  company?: Maybe<Company>;
  errors?: Maybe<Array<FieldError>>;
};

export type CompanyWithEmployees = {
  __typename?: 'CompanyWithEmployees';
  _id: Scalars['String'];
  companyId: Scalars['String'];
  contactPerson: ContactPerson;
  country: Scalars['String'];
  createdAt: Scalars['DateTime'];
  employees?: Maybe<Array<User>>;
  manufacturers: Array<Scalars['String']>;
  postCode: Scalars['String'];
  street: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ContactPerson = {
  __typename?: 'ContactPerson';
  customerAccount: Scalars['String'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type CreateBteEar = {
  canal: Scalars['String'];
  canalLength: Scalars['String'];
  color: Scalars['String'];
  cymbaLength: Scalars['String'];
  haModel: Scalars['String'];
  manufacturer: Scalars['String'];
  markingDots: Scalars['Boolean'];
  quantity: Scalars['Float'];
  serialNumber: Scalars['String'];
  soundTube: Scalars['String'];
  style: Scalars['String'];
  surface: Scalars['String'];
  ventSize: Scalars['String'];
};

export type CreateCompanyAdminInput = {
  email: Scalars['String'];
  fname: Scalars['String'];
  lname: Scalars['String'];
  password: Scalars['String'];
};

export type CreateCompanyInput = {
  contactPerson: CreateContactPersonInput;
  country: Scalars['String'];
  manufacturers: Array<Scalars['String']>;
  postCode: Scalars['String'];
  street: Scalars['String'];
  title: Scalars['String'];
};

export type CreateContactPersonInput = {
  customerAccount: Scalars['String'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type CreateDeliveryDetailsInput = {
  invoiceNumber?: InputMaybe<Scalars['String']>;
  standard: Scalars['Boolean'];
  urgent: Scalars['Boolean'];
};

export type CreateExtraDetailsInput = {
  accessories: Scalars['String'];
  comment: Scalars['String'];
};

export type CreateImpressionsInput = {
  left: Scalars['String'];
  right: Scalars['String'];
};

export type CreateOrderInput = {
  bioporShore: Scalars['String'];
  deliveryDetails: CreateDeliveryDetailsInput;
  extraDetails: CreateExtraDetailsInput;
  impressions: CreateImpressionsInput;
  material: Scalars['String'];
  orderType: OrderType;
  product: CreateProductInput;
  reason?: InputMaybe<Scalars['String']>;
  remake: Scalars['Boolean'];
};

export type CreateProductInput = {
  left: CreateBteEar;
  right: CreateBteEar;
};

export type CreateUserInput = {
  company: Scalars['ID'];
  email: Scalars['String'];
  fname: Scalars['String'];
  lname: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
};

export type DeliveryDetails = {
  __typename?: 'DeliveryDetails';
  invoiceNumber?: Maybe<Scalars['String']>;
  standard: Scalars['Boolean'];
  urgent: Scalars['Boolean'];
};

export type EditUserInput = {
  _id: Scalars['String'];
  email: Scalars['String'];
  fname: Scalars['String'];
  lname: Scalars['String'];
  role: UserRole;
};

export type ExtraDetails = {
  __typename?: 'ExtraDetails';
  accessories: Scalars['String'];
  comment: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Impressions = {
  __typename?: 'Impressions';
  left: Scalars['String'];
  right: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Logs = {
  __typename?: 'Logs';
  createdAt: Scalars['DateTime'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Change order status */
  changeOrderStatus?: Maybe<OrderResponses>;
  createCompany: SingleCompanyResponse;
  createOrder: Order;
  createUser: UserResponse;
  editCompany: CompanyResponse;
  editUser: UserResponse;
  login: AuthResponse;
  reOrder: OrderResponses;
  rejectOrder: OrderResponses;
  toggleActivate: UserResponse;
  updateOrder: OrderResponses;
  uploadFile: UploadResponse;
};


export type MutationChangeOrderStatusArgs = {
  _id: Scalars['ID'];
  status: OrderStatus;
};


export type MutationCreateCompanyArgs = {
  admin: CreateCompanyAdminInput;
  company: CreateCompanyInput;
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationEditCompanyArgs = {
  _id: Scalars['ID'];
  input: CreateCompanyInput;
};


export type MutationEditUserArgs = {
  input: EditUserInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationReOrderArgs = {
  orderId: Scalars['ID'];
};


export type MutationRejectOrderArgs = {
  _id: Scalars['ID'];
  rejectionReason: Scalars['String'];
};


export type MutationToggleActivateArgs = {
  userId: Scalars['ID'];
};


export type MutationUpdateOrderArgs = {
  _id: Scalars['ID'];
  input: CreateOrderInput;
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
};

export type Order = {
  __typename?: 'Order';
  _id: Scalars['String'];
  bioporShore?: Maybe<Scalars['String']>;
  company: Company;
  createdAt: Scalars['DateTime'];
  creator: User;
  deliveryDetails: DeliveryDetails;
  extraDetails: ExtraDetails;
  impressions: Impressions;
  logs?: Maybe<Array<Logs>>;
  material: Scalars['String'];
  orderId?: Maybe<Scalars['String']>;
  orderType: OrderType;
  product: Product;
  reOrder: Scalars['Boolean'];
  reason?: Maybe<Scalars['String']>;
  rejectionReason?: Maybe<Scalars['String']>;
  remake: Scalars['Boolean'];
  status: OrderStatus;
  updatedAt: Scalars['DateTime'];
};

/** The basic category */
export enum OrderCategory {
  All = 'ALL',
  NonRemake = 'NON_REMAKE',
  Remake = 'REMAKE'
}

export type OrderResponses = {
  __typename?: 'OrderResponses';
  errors?: Maybe<Array<FieldError>>;
  order?: Maybe<Order>;
};

export enum OrderStatus {
  Checked = 'CHECKED',
  ImpressionEvaluation = 'IMPRESSION_EVALUATION',
  Modeled = 'MODELED',
  Modelling = 'MODELLING',
  Mounted = 'MOUNTED',
  Placed = 'PLACED',
  Printed = 'PRINTED',
  Printing = 'PRINTING',
  Shipped = 'SHIPPED'
}

export enum OrderType {
  Bte = 'BTE',
  Custom = 'CUSTOM',
  Plugs = 'PLUGS',
  Ric = 'RIC'
}

export type Product = {
  __typename?: 'Product';
  left: BteEar;
  right: BteEar;
};

export type Query = {
  __typename?: 'Query';
  getAllCompanies: AllCompaniesResponse;
  getAllOrders: AllOrdersResponse;
  getAllUsers: AllUsersResponse;
  /** Get company by id */
  getCompany?: Maybe<SingleCompanyResponse>;
  /** Get order by id */
  getOrder?: Maybe<Order>;
  /** Get user by id */
  getUser?: Maybe<UserResponse>;
  me: UserResponse;
};


export type QueryGetAllCompaniesArgs = {
  limit: Scalars['Float'];
  page: Scalars['Float'];
};


export type QueryGetAllOrdersArgs = {
  limit: Scalars['Float'];
  orderCategory: OrderCategory;
  page: Scalars['Float'];
};


export type QueryGetAllUsersArgs = {
  limit: Scalars['Float'];
  page: Scalars['Float'];
};


export type QueryGetCompanyArgs = {
  companyId: Scalars['ID'];
};


export type QueryGetOrderArgs = {
  orderId: Scalars['ID'];
};


export type QueryGetUserArgs = {
  userId: Scalars['ID'];
};

export type SingleCompanyResponse = {
  __typename?: 'SingleCompanyResponse';
  admin?: Maybe<User>;
  company?: Maybe<CompanyWithEmployees>;
  errors?: Maybe<Array<FieldError>>;
};

export type UploadResponse = {
  __typename?: 'UploadResponse';
  errors?: Maybe<Array<FieldError>>;
  file?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  company: Company;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  fname: Scalars['String'];
  fullName: Scalars['String'];
  isActive: Scalars['Boolean'];
  lname: Scalars['String'];
  role: UserRole;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export enum UserRole {
  Admin = 'ADMIN',
  Normal = 'NORMAL',
  Super = 'SUPER'
}

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', token?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };


export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    errors {
      field
      message
    }
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;