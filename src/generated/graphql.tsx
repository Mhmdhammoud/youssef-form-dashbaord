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

export type Admin = {
  __typename?: 'Admin';
  _id: Scalars['String'];
  adminId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  fname: Scalars['String'];
  fullName: Scalars['String'];
  isActive: Scalars['Boolean'];
  lname: Scalars['String'];
  role: AdminRole;
  updatedAt: Scalars['DateTime'];
};

export type AdminResponse = {
  __typename?: 'AdminResponse';
  admin?: Maybe<Admin>;
  errors?: Maybe<Array<FieldError>>;
};

export enum AdminRole {
  Admin = 'ADMIN',
  Modeler = 'MODELER',
  Registrar = 'REGISTRAR',
  Technician = 'TECHNICIAN'
}

export type AllAdminsResponse = {
  __typename?: 'AllAdminsResponse';
  admins?: Maybe<Array<Admin>>;
  errors?: Maybe<Array<FieldError>>;
  hasMore: Scalars['Boolean'];
  length: Scalars['Float'];
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

export type CreateAdminInput = {
  email: Scalars['String'];
  fname: Scalars['String'];
  lname: Scalars['String'];
  password: Scalars['String'];
  role: AdminRole;
};

export type CreateBteEar = {
  canal: Scalars['String'];
  canalLength: Scalars['String'];
  color: Scalars['String'];
  cymbaLength: Scalars['String'];
  haModel: Scalars['String'];
  manufacturer: Scalars['String'];
  markingDots: Scalars['Boolean'];
  model?: InputMaybe<Scalars['String']>;
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
  /** Create a new admin account with the given email and password. Returns the created admin deactivated. */
  createAdmin: AdminResponse;
  createCompany: SingleCompanyResponse;
  createUser: UserResponse;
  editCompany: CompanyResponse;
  editUser: UserResponse;
  login: AuthResponse;
  rejectOrder: OrderResponses;
  toggleActivate: AdminResponse;
  updateOrder: OrderResponses;
  uploadFile: UploadResponse;
};


export type MutationChangeOrderStatusArgs = {
  _id: Scalars['ID'];
  status: OrderStatus;
};


export type MutationCreateAdminArgs = {
  input: CreateAdminInput;
};


export type MutationCreateCompanyArgs = {
  admin: CreateCompanyAdminInput;
  company: CreateCompanyInput;
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


export type MutationRejectOrderArgs = {
  _id: Scalars['ID'];
  rejectionReason: Scalars['String'];
};


export type MutationToggleActivateArgs = {
  adminId: Scalars['ID'];
};


export type MutationUpdateOrderArgs = {
  _id: Scalars['ID'];
  input: UpdateOrderInput;
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
  getAllAdmins: AllAdminsResponse;
  getAllCompanies: AllCompaniesResponse;
  getAllOrders: AllOrdersResponse;
  getAllUsers: AllUsersResponse;
  /** Get company by id with all of its employees */
  getCompany?: Maybe<SingleCompanyResponse>;
  /** Get order by id */
  getOrder?: Maybe<Order>;
  /** Get user by id */
  getUser?: Maybe<UserResponse>;
  me: AdminResponse;
};


export type QueryGetAllAdminsArgs = {
  limit: Scalars['Float'];
  page: Scalars['Float'];
};


export type QueryGetAllCompaniesArgs = {
  limit: Scalars['Float'];
  page: Scalars['Float'];
};


export type QueryGetAllOrdersArgs = {
  limit: Scalars['Float'];
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

export type UpdateOrderInput = {
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

export type ChangeOrderStatusMutationVariables = Exact<{
  _id: Scalars['ID'];
  status: OrderStatus;
}>;


export type ChangeOrderStatusMutation = { __typename?: 'Mutation', changeOrderStatus?: { __typename?: 'OrderResponses', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, order?: { __typename?: 'Order', _id: string, material: string, bioporShore?: string | null, createdAt: any, updatedAt: any, orderId?: string | null, remake: boolean, orderType: OrderType, reason?: string | null, status: OrderStatus, impressions: { __typename?: 'Impressions', left: string, right: string }, product: { __typename?: 'Product', left: { __typename?: 'BteEar', haModel: string, serialNumber: string, style: string, canalLength: string, cymbaLength: string, ventSize: string, quantity: number, canal: string, soundTube: string, surface: string, color: string, shellId: string, manufacturer: string, markingDots: boolean, model?: string | null }, right: { __typename?: 'BteEar', haModel: string, serialNumber: string, style: string, canalLength: string, cymbaLength: string, ventSize: string, quantity: number, canal: string, soundTube: string, surface: string, color: string, shellId: string, manufacturer: string, markingDots: boolean, model?: string | null } }, deliveryDetails: { __typename?: 'DeliveryDetails', urgent: boolean, standard: boolean, invoiceNumber?: string | null }, extraDetails: { __typename?: 'ExtraDetails', comment: string, accessories: string }, company: { __typename?: 'Company', _id: string }, logs?: Array<{ __typename?: 'Logs', message: string, createdAt: any }> | null } | null } | null };

export type CreateAdminMutationVariables = Exact<{
  input: CreateAdminInput;
}>;


export type CreateAdminMutation = { __typename?: 'Mutation', createAdmin: { __typename?: 'AdminResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, admin?: { __typename?: 'Admin', _id: string, fullName: string, fname: string, lname: string, email: string, role: AdminRole, adminId: string, isActive: boolean, createdAt: any, updatedAt: any } | null } };

export type CreateCompanyMutationVariables = Exact<{
  admin: CreateCompanyAdminInput;
  company: CreateCompanyInput;
}>;


export type CreateCompanyMutation = { __typename?: 'Mutation', createCompany: { __typename?: 'SingleCompanyResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, company?: { __typename?: 'CompanyWithEmployees', _id: string, title: string, companyId: string, createdAt: any, updatedAt: any, manufacturers: Array<string>, street: string, postCode: string, country: string, contactPerson: { __typename?: 'ContactPerson', fullName: string, email: string, phoneNumber: string, customerAccount: string }, employees?: Array<{ __typename?: 'User', _id: string, fullName: string, fname: string, lname: string, email: string, role: UserRole, userId: string, isActive: boolean, createdAt: any, updatedAt: any }> | null } | null, admin?: { __typename?: 'User', _id: string, fullName: string, fname: string, lname: string, email: string, role: UserRole, userId: string, isActive: boolean, createdAt: any, updatedAt: any } | null } };

export type EditCompanyMutationVariables = Exact<{
  _id: Scalars['ID'];
  input: CreateCompanyInput;
}>;


export type EditCompanyMutation = { __typename?: 'Mutation', editCompany: { __typename?: 'CompanyResponse', company?: { __typename?: 'Company', _id: string, title: string, companyId: string, street: string, postCode: string, manufacturers: Array<string>, country: string, createdAt: any, updatedAt: any, contactPerson: { __typename?: 'ContactPerson', fullName: string, email: string, phoneNumber: string, customerAccount: string } } | null } };

export type RejectOrderMutationVariables = Exact<{
  _id: Scalars['ID'];
  rejectionReason: Scalars['String'];
}>;


export type RejectOrderMutation = { __typename?: 'Mutation', rejectOrder: { __typename?: 'OrderResponses', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, order?: { __typename?: 'Order', status: OrderStatus, orderId?: string | null, reason?: string | null, rejectionReason?: string | null, remake: boolean, createdAt: any, updatedAt: any, product: { __typename?: 'Product', left: { __typename?: 'BteEar', haModel: string, serialNumber: string, style: string, canalLength: string, cymbaLength: string, ventSize: string, quantity: number, canal: string, soundTube: string, surface: string, color: string, shellId: string, model?: string | null }, right: { __typename?: 'BteEar', haModel: string, serialNumber: string, style: string, canalLength: string, cymbaLength: string, ventSize: string, quantity: number, canal: string, soundTube: string, surface: string, color: string, shellId: string, model?: string | null } }, deliveryDetails: { __typename?: 'DeliveryDetails', urgent: boolean, standard: boolean, invoiceNumber?: string | null }, logs?: Array<{ __typename?: 'Logs', message: string, createdAt: any }> | null } | null } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', token?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ToggleActivateMutationVariables = Exact<{
  adminId: Scalars['ID'];
}>;


export type ToggleActivateMutation = { __typename?: 'Mutation', toggleActivate: { __typename?: 'AdminResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, admin?: { __typename?: 'Admin', _id: string, fullName: string, fname: string, lname: string, email: string, role: AdminRole, adminId: string, isActive: boolean, createdAt: any, updatedAt: any } | null } };

export type UpdateOrderMutationVariables = Exact<{
  _id: Scalars['ID'];
  input: UpdateOrderInput;
}>;


export type UpdateOrderMutation = { __typename?: 'Mutation', updateOrder: { __typename?: 'OrderResponses', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, order?: { __typename?: 'Order', orderType: OrderType, status: OrderStatus, remake: boolean, reason?: string | null, orderId?: string | null, bioporShore?: string | null, material: string, _id: string, reOrder: boolean, rejectionReason?: string | null, createdAt: any, updatedAt: any, product: { __typename?: 'Product', left: { __typename?: 'BteEar', haModel: string, serialNumber: string, style: string, canalLength: string, cymbaLength: string, ventSize: string, quantity: number, color: string, surface: string, soundTube: string, markingDots: boolean, canal: string, manufacturer: string, model?: string | null }, right: { __typename?: 'BteEar', haModel: string, serialNumber: string, style: string, canalLength: string, cymbaLength: string, ventSize: string, quantity: number, color: string, surface: string, soundTube: string, markingDots: boolean, canal: string, model?: string | null } }, deliveryDetails: { __typename?: 'DeliveryDetails', urgent: boolean, standard: boolean, invoiceNumber?: string | null }, extraDetails: { __typename?: 'ExtraDetails', comment: string, accessories: string }, impressions: { __typename?: 'Impressions', left: string, right: string }, logs?: Array<{ __typename?: 'Logs', message: string, createdAt: any }> | null } | null } };

export type UploadFileMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UploadFileMutation = { __typename?: 'Mutation', uploadFile: { __typename?: 'UploadResponse', file?: string | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type GetAllAdminsQueryVariables = Exact<{
  limit: Scalars['Float'];
  page: Scalars['Float'];
}>;


export type GetAllAdminsQuery = { __typename?: 'Query', getAllAdmins: { __typename?: 'AllAdminsResponse', hasMore: boolean, length: number, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, admins?: Array<{ __typename?: 'Admin', _id: string, fullName: string, fname: string, lname: string, email: string, role: AdminRole, adminId: string, isActive: boolean, createdAt: any, updatedAt: any }> | null } };

export type GetAllCompaniesQueryVariables = Exact<{
  limit: Scalars['Float'];
  page: Scalars['Float'];
}>;


export type GetAllCompaniesQuery = { __typename?: 'Query', getAllCompanies: { __typename?: 'AllCompaniesResponse', hasMore: boolean, length: number, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, companies?: Array<{ __typename?: 'Company', _id: string, title: string, companyId: string, street: string, postCode: string, country: string, createdAt: any, updatedAt: any, contactPerson: { __typename?: 'ContactPerson', fullName: string, email: string, phoneNumber: string, customerAccount: string } }> | null } };

export type GetAllOrdersQueryVariables = Exact<{
  limit: Scalars['Float'];
  page: Scalars['Float'];
}>;


export type GetAllOrdersQuery = { __typename?: 'Query', getAllOrders: { __typename?: 'AllOrdersResponse', hasMore: boolean, length: number, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, orders?: Array<{ __typename?: 'Order', _id: string, orderType: OrderType, status: OrderStatus, remake: boolean, reason?: string | null, orderId?: string | null, bioporShore?: string | null, material: string, rejectionReason?: string | null, reOrder: boolean, createdAt: any, updatedAt: any, deliveryDetails: { __typename?: 'DeliveryDetails', urgent: boolean, standard: boolean, invoiceNumber?: string | null }, creator: { __typename?: 'User', _id: string, fullName: string, fname: string, lname: string, email: string, role: UserRole, userId: string, isActive: boolean, createdAt: any, updatedAt: any }, company: { __typename?: 'Company', _id: string, title: string, companyId: string, street: string, postCode: string, country: string, contactPerson: { __typename?: 'ContactPerson', fullName: string, email: string, phoneNumber: string, customerAccount: string } }, extraDetails: { __typename?: 'ExtraDetails', comment: string, accessories: string }, impressions: { __typename?: 'Impressions', left: string, right: string }, logs?: Array<{ __typename?: 'Logs', message: string, createdAt: any }> | null, product: { __typename?: 'Product', left: { __typename?: 'BteEar', haModel: string, shellId: string, serialNumber: string, style: string, canalLength: string, manufacturer: string, cymbaLength: string, ventSize: string, quantity: number, color: string, surface: string, soundTube: string, canal: string, markingDots: boolean }, right: { __typename?: 'BteEar', haModel: string, shellId: string, serialNumber: string, style: string, canalLength: string, manufacturer: string, cymbaLength: string, ventSize: string, quantity: number, color: string, surface: string, soundTube: string, canal: string, markingDots: boolean } } }> | null } };

export type GetAllUsersQueryVariables = Exact<{
  limit: Scalars['Float'];
  page: Scalars['Float'];
}>;


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers: { __typename?: 'AllUsersResponse', hasMore: boolean, length: number, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, users?: Array<{ __typename?: 'User', _id: string, fullName: string, fname: string, lname: string, email: string, role: UserRole, userId: string, isActive: boolean, createdAt: any, updatedAt: any, company: { __typename?: 'Company', title: string, companyId: string, _id: string, createdAt: any, updatedAt: any, country: string, street: string, postCode: string, manufacturers: Array<string>, contactPerson: { __typename?: 'ContactPerson', fullName: string, email: string, phoneNumber: string, customerAccount: string } } }> | null } };

export type GetCompanyQueryVariables = Exact<{
  companyId: Scalars['ID'];
}>;


export type GetCompanyQuery = { __typename?: 'Query', getCompany?: { __typename?: 'SingleCompanyResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, company?: { __typename?: 'CompanyWithEmployees', _id: string, title: string, companyId: string, street: string, postCode: string, country: string, createdAt: any, updatedAt: any, manufacturers: Array<string>, employees?: Array<{ __typename?: 'User', _id: string, fname: string, lname: string, fullName: string, email: string, role: UserRole, userId: string, isActive: boolean, createdAt: any, updatedAt: any }> | null, contactPerson: { __typename?: 'ContactPerson', fullName: string, email: string, phoneNumber: string, customerAccount: string } } | null, admin?: { __typename?: 'User', _id: string, fullName: string, fname: string, lname: string, email: string, role: UserRole, userId: string, isActive: boolean, createdAt: any, updatedAt: any } | null } | null };

export type GetOrderQueryVariables = Exact<{
  orderId: Scalars['ID'];
}>;


export type GetOrderQuery = { __typename?: 'Query', getOrder?: { __typename?: 'Order', _id: string, material: string, bioporShore?: string | null, createdAt: any, updatedAt: any, orderId?: string | null, remake: boolean, orderType: OrderType, reason?: string | null, status: OrderStatus, impressions: { __typename?: 'Impressions', left: string, right: string }, product: { __typename?: 'Product', left: { __typename?: 'BteEar', haModel: string, serialNumber: string, style: string, canalLength: string, cymbaLength: string, ventSize: string, quantity: number, canal: string, soundTube: string, surface: string, color: string, shellId: string, manufacturer: string, markingDots: boolean, model?: string | null }, right: { __typename?: 'BteEar', haModel: string, serialNumber: string, style: string, canalLength: string, cymbaLength: string, ventSize: string, quantity: number, canal: string, soundTube: string, surface: string, color: string, shellId: string, manufacturer: string, markingDots: boolean, model?: string | null } }, deliveryDetails: { __typename?: 'DeliveryDetails', urgent: boolean, standard: boolean, invoiceNumber?: string | null }, extraDetails: { __typename?: 'ExtraDetails', comment: string, accessories: string }, company: { __typename?: 'Company', _id: string, title: string, companyId: string, createdAt: any, updatedAt: any, street: string, postCode: string, country: string, contactPerson: { __typename?: 'ContactPerson', fullName: string, email: string, phoneNumber: string } }, logs?: Array<{ __typename?: 'Logs', message: string, createdAt: any }> | null } | null };

export type GetUserQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'User', _id: string, fullName: string, fname: string, lname: string, email: string, role: UserRole, userId: string, isActive: boolean, createdAt: any, updatedAt: any, company: { __typename?: 'Company', _id: string, title: string, companyId: string, street: string, postCode: string, country: string, createdAt: any, updatedAt: any, contactPerson: { __typename?: 'ContactPerson', fullName: string, email: string, phoneNumber: string, customerAccount: string } } } | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'AdminResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, admin?: { __typename?: 'Admin', _id: string, fullName: string, fname: string, lname: string, email: string, role: AdminRole, adminId: string, isActive: boolean, createdAt: any, updatedAt: any } | null } };


export const ChangeOrderStatusDocument = gql`
    mutation ChangeOrderStatus($_id: ID!, $status: OrderStatus!) {
  changeOrderStatus(_id: $_id, status: $status) {
    errors {
      field
      message
    }
    order {
      _id
      material
      bioporShore
      createdAt
      updatedAt
      orderId
      remake
      orderType
      reason
      status
      impressions {
        left
        right
      }
      product {
        left {
          haModel
          serialNumber
          style
          canalLength
          cymbaLength
          ventSize
          quantity
          canal
          soundTube
          surface
          color
          shellId
          manufacturer
          markingDots
          model
        }
        right {
          haModel
          serialNumber
          style
          canalLength
          cymbaLength
          ventSize
          quantity
          canal
          soundTube
          surface
          color
          shellId
          manufacturer
          markingDots
          model
        }
      }
      deliveryDetails {
        urgent
        standard
        invoiceNumber
      }
      extraDetails {
        comment
        accessories
      }
      company {
        _id
      }
      logs {
        message
        createdAt
      }
    }
  }
}
    `;
export type ChangeOrderStatusMutationFn = Apollo.MutationFunction<ChangeOrderStatusMutation, ChangeOrderStatusMutationVariables>;

/**
 * __useChangeOrderStatusMutation__
 *
 * To run a mutation, you first call `useChangeOrderStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeOrderStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeOrderStatusMutation, { data, loading, error }] = useChangeOrderStatusMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useChangeOrderStatusMutation(baseOptions?: Apollo.MutationHookOptions<ChangeOrderStatusMutation, ChangeOrderStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeOrderStatusMutation, ChangeOrderStatusMutationVariables>(ChangeOrderStatusDocument, options);
      }
export type ChangeOrderStatusMutationHookResult = ReturnType<typeof useChangeOrderStatusMutation>;
export type ChangeOrderStatusMutationResult = Apollo.MutationResult<ChangeOrderStatusMutation>;
export type ChangeOrderStatusMutationOptions = Apollo.BaseMutationOptions<ChangeOrderStatusMutation, ChangeOrderStatusMutationVariables>;
export const CreateAdminDocument = gql`
    mutation CreateAdmin($input: CreateAdminInput!) {
  createAdmin(input: $input) {
    errors {
      field
      message
    }
    admin {
      _id
      fullName
      fname
      lname
      email
      role
      adminId
      isActive
      createdAt
      updatedAt
    }
  }
}
    `;
export type CreateAdminMutationFn = Apollo.MutationFunction<CreateAdminMutation, CreateAdminMutationVariables>;

/**
 * __useCreateAdminMutation__
 *
 * To run a mutation, you first call `useCreateAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAdminMutation, { data, loading, error }] = useCreateAdminMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAdminMutation(baseOptions?: Apollo.MutationHookOptions<CreateAdminMutation, CreateAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAdminMutation, CreateAdminMutationVariables>(CreateAdminDocument, options);
      }
export type CreateAdminMutationHookResult = ReturnType<typeof useCreateAdminMutation>;
export type CreateAdminMutationResult = Apollo.MutationResult<CreateAdminMutation>;
export type CreateAdminMutationOptions = Apollo.BaseMutationOptions<CreateAdminMutation, CreateAdminMutationVariables>;
export const CreateCompanyDocument = gql`
    mutation CreateCompany($admin: CreateCompanyAdminInput!, $company: CreateCompanyInput!) {
  createCompany(admin: $admin, company: $company) {
    errors {
      field
      message
    }
    company {
      _id
      title
      companyId
      createdAt
      updatedAt
      manufacturers
      contactPerson {
        fullName
        email
        phoneNumber
        customerAccount
      }
      employees {
        _id
        fullName
        fname
        lname
        email
        role
        userId
        isActive
        createdAt
        updatedAt
      }
      street
      postCode
      country
    }
    admin {
      _id
      fullName
      fname
      lname
      email
      role
      userId
      isActive
      createdAt
      updatedAt
    }
  }
}
    `;
export type CreateCompanyMutationFn = Apollo.MutationFunction<CreateCompanyMutation, CreateCompanyMutationVariables>;

/**
 * __useCreateCompanyMutation__
 *
 * To run a mutation, you first call `useCreateCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompanyMutation, { data, loading, error }] = useCreateCompanyMutation({
 *   variables: {
 *      admin: // value for 'admin'
 *      company: // value for 'company'
 *   },
 * });
 */
export function useCreateCompanyMutation(baseOptions?: Apollo.MutationHookOptions<CreateCompanyMutation, CreateCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCompanyMutation, CreateCompanyMutationVariables>(CreateCompanyDocument, options);
      }
export type CreateCompanyMutationHookResult = ReturnType<typeof useCreateCompanyMutation>;
export type CreateCompanyMutationResult = Apollo.MutationResult<CreateCompanyMutation>;
export type CreateCompanyMutationOptions = Apollo.BaseMutationOptions<CreateCompanyMutation, CreateCompanyMutationVariables>;
export const EditCompanyDocument = gql`
    mutation EditCompany($_id: ID!, $input: CreateCompanyInput!) {
  editCompany(_id: $_id, input: $input) {
    company {
      _id
      title
      companyId
      contactPerson {
        fullName
        email
        phoneNumber
        customerAccount
      }
      street
      postCode
      manufacturers
      country
      createdAt
      updatedAt
    }
  }
}
    `;
export type EditCompanyMutationFn = Apollo.MutationFunction<EditCompanyMutation, EditCompanyMutationVariables>;

/**
 * __useEditCompanyMutation__
 *
 * To run a mutation, you first call `useEditCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCompanyMutation, { data, loading, error }] = useEditCompanyMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditCompanyMutation(baseOptions?: Apollo.MutationHookOptions<EditCompanyMutation, EditCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCompanyMutation, EditCompanyMutationVariables>(EditCompanyDocument, options);
      }
export type EditCompanyMutationHookResult = ReturnType<typeof useEditCompanyMutation>;
export type EditCompanyMutationResult = Apollo.MutationResult<EditCompanyMutation>;
export type EditCompanyMutationOptions = Apollo.BaseMutationOptions<EditCompanyMutation, EditCompanyMutationVariables>;
export const RejectOrderDocument = gql`
    mutation RejectOrder($_id: ID!, $rejectionReason: String!) {
  rejectOrder(_id: $_id, rejectionReason: $rejectionReason) {
    errors {
      field
      message
    }
    order {
      product {
        left {
          haModel
          serialNumber
          style
          canalLength
          cymbaLength
          ventSize
          quantity
          canal
          soundTube
          surface
          color
          shellId
          model
        }
        right {
          haModel
          serialNumber
          style
          canalLength
          cymbaLength
          ventSize
          quantity
          canal
          soundTube
          surface
          color
          shellId
          model
        }
      }
      status
      orderId
      reason
      rejectionReason
      remake
      deliveryDetails {
        urgent
        standard
        invoiceNumber
      }
      createdAt
      updatedAt
      logs {
        message
        createdAt
      }
    }
  }
}
    `;
export type RejectOrderMutationFn = Apollo.MutationFunction<RejectOrderMutation, RejectOrderMutationVariables>;

/**
 * __useRejectOrderMutation__
 *
 * To run a mutation, you first call `useRejectOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectOrderMutation, { data, loading, error }] = useRejectOrderMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      rejectionReason: // value for 'rejectionReason'
 *   },
 * });
 */
export function useRejectOrderMutation(baseOptions?: Apollo.MutationHookOptions<RejectOrderMutation, RejectOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectOrderMutation, RejectOrderMutationVariables>(RejectOrderDocument, options);
      }
export type RejectOrderMutationHookResult = ReturnType<typeof useRejectOrderMutation>;
export type RejectOrderMutationResult = Apollo.MutationResult<RejectOrderMutation>;
export type RejectOrderMutationOptions = Apollo.BaseMutationOptions<RejectOrderMutation, RejectOrderMutationVariables>;
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
export const ToggleActivateDocument = gql`
    mutation ToggleActivate($adminId: ID!) {
  toggleActivate(adminId: $adminId) {
    errors {
      field
      message
    }
    admin {
      _id
      fullName
      fname
      lname
      email
      role
      adminId
      isActive
      createdAt
      updatedAt
    }
  }
}
    `;
export type ToggleActivateMutationFn = Apollo.MutationFunction<ToggleActivateMutation, ToggleActivateMutationVariables>;

/**
 * __useToggleActivateMutation__
 *
 * To run a mutation, you first call `useToggleActivateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleActivateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleActivateMutation, { data, loading, error }] = useToggleActivateMutation({
 *   variables: {
 *      adminId: // value for 'adminId'
 *   },
 * });
 */
export function useToggleActivateMutation(baseOptions?: Apollo.MutationHookOptions<ToggleActivateMutation, ToggleActivateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleActivateMutation, ToggleActivateMutationVariables>(ToggleActivateDocument, options);
      }
export type ToggleActivateMutationHookResult = ReturnType<typeof useToggleActivateMutation>;
export type ToggleActivateMutationResult = Apollo.MutationResult<ToggleActivateMutation>;
export type ToggleActivateMutationOptions = Apollo.BaseMutationOptions<ToggleActivateMutation, ToggleActivateMutationVariables>;
export const UpdateOrderDocument = gql`
    mutation UpdateOrder($_id: ID!, $input: UpdateOrderInput!) {
  updateOrder(_id: $_id, input: $input) {
    errors {
      field
      message
    }
    order {
      product {
        left {
          haModel
          serialNumber
          style
          canalLength
          cymbaLength
          ventSize
          quantity
          color
          surface
          soundTube
          markingDots
          canal
          manufacturer
          model
        }
        right {
          haModel
          serialNumber
          style
          canalLength
          cymbaLength
          ventSize
          quantity
          color
          surface
          soundTube
          markingDots
          canal
          model
        }
      }
      deliveryDetails {
        urgent
        standard
        invoiceNumber
      }
      extraDetails {
        comment
        accessories
      }
      orderType
      status
      remake
      reason
      orderId
      bioporShore
      material
      _id
      reOrder
      impressions {
        left
        right
      }
      logs {
        message
        createdAt
      }
      rejectionReason
      createdAt
      updatedAt
    }
  }
}
    `;
export type UpdateOrderMutationFn = Apollo.MutationFunction<UpdateOrderMutation, UpdateOrderMutationVariables>;

/**
 * __useUpdateOrderMutation__
 *
 * To run a mutation, you first call `useUpdateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrderMutation, { data, loading, error }] = useUpdateOrderMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOrderMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrderMutation, UpdateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrderMutation, UpdateOrderMutationVariables>(UpdateOrderDocument, options);
      }
export type UpdateOrderMutationHookResult = ReturnType<typeof useUpdateOrderMutation>;
export type UpdateOrderMutationResult = Apollo.MutationResult<UpdateOrderMutation>;
export type UpdateOrderMutationOptions = Apollo.BaseMutationOptions<UpdateOrderMutation, UpdateOrderMutationVariables>;
export const UploadFileDocument = gql`
    mutation UploadFile($file: Upload!) {
  uploadFile(file: $file) {
    errors {
      field
      message
    }
    file
  }
}
    `;
export type UploadFileMutationFn = Apollo.MutationFunction<UploadFileMutation, UploadFileMutationVariables>;

/**
 * __useUploadFileMutation__
 *
 * To run a mutation, you first call `useUploadFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadFileMutation, { data, loading, error }] = useUploadFileMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadFileMutation(baseOptions?: Apollo.MutationHookOptions<UploadFileMutation, UploadFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadFileMutation, UploadFileMutationVariables>(UploadFileDocument, options);
      }
export type UploadFileMutationHookResult = ReturnType<typeof useUploadFileMutation>;
export type UploadFileMutationResult = Apollo.MutationResult<UploadFileMutation>;
export type UploadFileMutationOptions = Apollo.BaseMutationOptions<UploadFileMutation, UploadFileMutationVariables>;
export const GetAllAdminsDocument = gql`
    query GetAllAdmins($limit: Float!, $page: Float!) {
  getAllAdmins(limit: $limit, page: $page) {
    errors {
      field
      message
    }
    hasMore
    length
    admins {
      _id
      fullName
      fname
      lname
      email
      role
      adminId
      isActive
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetAllAdminsQuery__
 *
 * To run a query within a React component, call `useGetAllAdminsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAdminsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllAdminsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetAllAdminsQuery(baseOptions: Apollo.QueryHookOptions<GetAllAdminsQuery, GetAllAdminsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllAdminsQuery, GetAllAdminsQueryVariables>(GetAllAdminsDocument, options);
      }
export function useGetAllAdminsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllAdminsQuery, GetAllAdminsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllAdminsQuery, GetAllAdminsQueryVariables>(GetAllAdminsDocument, options);
        }
export type GetAllAdminsQueryHookResult = ReturnType<typeof useGetAllAdminsQuery>;
export type GetAllAdminsLazyQueryHookResult = ReturnType<typeof useGetAllAdminsLazyQuery>;
export type GetAllAdminsQueryResult = Apollo.QueryResult<GetAllAdminsQuery, GetAllAdminsQueryVariables>;
export const GetAllCompaniesDocument = gql`
    query GetAllCompanies($limit: Float!, $page: Float!) {
  getAllCompanies(limit: $limit, page: $page) {
    errors {
      field
      message
    }
    hasMore
    length
    companies {
      _id
      title
      companyId
      street
      postCode
      country
      createdAt
      updatedAt
      contactPerson {
        fullName
        email
        phoneNumber
        customerAccount
      }
    }
  }
}
    `;

/**
 * __useGetAllCompaniesQuery__
 *
 * To run a query within a React component, call `useGetAllCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCompaniesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetAllCompaniesQuery(baseOptions: Apollo.QueryHookOptions<GetAllCompaniesQuery, GetAllCompaniesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCompaniesQuery, GetAllCompaniesQueryVariables>(GetAllCompaniesDocument, options);
      }
export function useGetAllCompaniesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCompaniesQuery, GetAllCompaniesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCompaniesQuery, GetAllCompaniesQueryVariables>(GetAllCompaniesDocument, options);
        }
export type GetAllCompaniesQueryHookResult = ReturnType<typeof useGetAllCompaniesQuery>;
export type GetAllCompaniesLazyQueryHookResult = ReturnType<typeof useGetAllCompaniesLazyQuery>;
export type GetAllCompaniesQueryResult = Apollo.QueryResult<GetAllCompaniesQuery, GetAllCompaniesQueryVariables>;
export const GetAllOrdersDocument = gql`
    query GetAllOrders($limit: Float!, $page: Float!) {
  getAllOrders(limit: $limit, page: $page) {
    errors {
      field
      message
    }
    hasMore
    length
    orders {
      _id
      deliveryDetails {
        urgent
        standard
        invoiceNumber
      }
      creator {
        _id
        fullName
        fname
        lname
        email
        role
        userId
        isActive
        createdAt
        updatedAt
      }
      company {
        _id
        title
        companyId
        street
        postCode
        country
        contactPerson {
          fullName
          email
          phoneNumber
          customerAccount
        }
      }
      extraDetails {
        comment
        accessories
      }
      impressions {
        left
        right
      }
      logs {
        message
        createdAt
      }
      product {
        left {
          haModel
          shellId
          serialNumber
          style
          canalLength
          manufacturer
          cymbaLength
          ventSize
          quantity
          color
          surface
          soundTube
          canal
          markingDots
        }
        right {
          haModel
          shellId
          serialNumber
          style
          canalLength
          manufacturer
          cymbaLength
          ventSize
          quantity
          color
          surface
          soundTube
          canal
          markingDots
        }
      }
      orderType
      status
      remake
      reason
      orderId
      bioporShore
      material
      rejectionReason
      reOrder
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetAllOrdersQuery__
 *
 * To run a query within a React component, call `useGetAllOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllOrdersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetAllOrdersQuery(baseOptions: Apollo.QueryHookOptions<GetAllOrdersQuery, GetAllOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllOrdersQuery, GetAllOrdersQueryVariables>(GetAllOrdersDocument, options);
      }
export function useGetAllOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllOrdersQuery, GetAllOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllOrdersQuery, GetAllOrdersQueryVariables>(GetAllOrdersDocument, options);
        }
export type GetAllOrdersQueryHookResult = ReturnType<typeof useGetAllOrdersQuery>;
export type GetAllOrdersLazyQueryHookResult = ReturnType<typeof useGetAllOrdersLazyQuery>;
export type GetAllOrdersQueryResult = Apollo.QueryResult<GetAllOrdersQuery, GetAllOrdersQueryVariables>;
export const GetAllUsersDocument = gql`
    query GetAllUsers($limit: Float!, $page: Float!) {
  getAllUsers(limit: $limit, page: $page) {
    errors {
      field
      message
    }
    hasMore
    length
    users {
      _id
      fullName
      fname
      lname
      email
      role
      userId
      isActive
      createdAt
      updatedAt
      company {
        title
        companyId
        _id
        createdAt
        updatedAt
        country
        street
        postCode
        manufacturers
        contactPerson {
          fullName
          email
          phoneNumber
          customerAccount
        }
      }
    }
  }
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetCompanyDocument = gql`
    query GetCompany($companyId: ID!) {
  getCompany(companyId: $companyId) {
    errors {
      field
      message
    }
    company {
      _id
      title
      companyId
      street
      postCode
      country
      createdAt
      updatedAt
      manufacturers
      employees {
        _id
        fname
        lname
        fullName
        email
        role
        userId
        isActive
        createdAt
        updatedAt
      }
      contactPerson {
        fullName
        email
        phoneNumber
        customerAccount
      }
    }
    admin {
      _id
      fullName
      fname
      lname
      email
      role
      userId
      isActive
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetCompanyQuery__
 *
 * To run a query within a React component, call `useGetCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompanyQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useGetCompanyQuery(baseOptions: Apollo.QueryHookOptions<GetCompanyQuery, GetCompanyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCompanyQuery, GetCompanyQueryVariables>(GetCompanyDocument, options);
      }
export function useGetCompanyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCompanyQuery, GetCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCompanyQuery, GetCompanyQueryVariables>(GetCompanyDocument, options);
        }
export type GetCompanyQueryHookResult = ReturnType<typeof useGetCompanyQuery>;
export type GetCompanyLazyQueryHookResult = ReturnType<typeof useGetCompanyLazyQuery>;
export type GetCompanyQueryResult = Apollo.QueryResult<GetCompanyQuery, GetCompanyQueryVariables>;
export const GetOrderDocument = gql`
    query GetOrder($orderId: ID!) {
  getOrder(orderId: $orderId) {
    _id
    material
    bioporShore
    createdAt
    updatedAt
    orderId
    remake
    orderType
    reason
    status
    impressions {
      left
      right
    }
    product {
      left {
        haModel
        serialNumber
        style
        canalLength
        cymbaLength
        ventSize
        quantity
        canal
        soundTube
        surface
        color
        shellId
        manufacturer
        markingDots
        model
      }
      right {
        haModel
        serialNumber
        style
        canalLength
        cymbaLength
        ventSize
        quantity
        canal
        soundTube
        surface
        color
        shellId
        manufacturer
        markingDots
        model
      }
    }
    deliveryDetails {
      urgent
      standard
      invoiceNumber
    }
    extraDetails {
      comment
      accessories
    }
    company {
      _id
      title
      companyId
      createdAt
      updatedAt
      contactPerson {
        fullName
        email
        phoneNumber
      }
      street
      postCode
      country
    }
    logs {
      message
      createdAt
    }
  }
}
    `;

/**
 * __useGetOrderQuery__
 *
 * To run a query within a React component, call `useGetOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrderQuery({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useGetOrderQuery(baseOptions: Apollo.QueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
      }
export function useGetOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrderQuery, GetOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, options);
        }
export type GetOrderQueryHookResult = ReturnType<typeof useGetOrderQuery>;
export type GetOrderLazyQueryHookResult = ReturnType<typeof useGetOrderLazyQuery>;
export type GetOrderQueryResult = Apollo.QueryResult<GetOrderQuery, GetOrderQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($userId: ID!) {
  getUser(userId: $userId) {
    errors {
      field
      message
    }
    user {
      _id
      fullName
      fname
      lname
      email
      role
      userId
      isActive
      createdAt
      updatedAt
      company {
        _id
        title
        companyId
        street
        postCode
        country
        createdAt
        updatedAt
        contactPerson {
          fullName
          email
          phoneNumber
          customerAccount
        }
      }
    }
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    errors {
      field
      message
    }
    admin {
      _id
      fullName
      fname
      lname
      email
      role
      adminId
      isActive
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;