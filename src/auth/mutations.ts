import { fragmentUser } from "@saleor/fragments/auth";
import { accountErrorFragment } from "@saleor/fragments/errors";
import gql from "graphql-tag";

import { TypedMutation } from "../mutations";
import {
  RequestPasswordReset,
  RequestPasswordResetVariables
} from "./types/RequestPasswordReset";
import { SetPassword, SetPasswordVariables } from "./types/SetPassword";

export const tokenAuthMutation = gql`
  ${fragmentUser}
  mutation TokenAuth($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      errors: accountErrors {
        field
        message
      }
      csrfToken
      token
      user {
        ...User
      }
    }
  }
`;

export const tokenVerifyMutation = gql`
  ${fragmentUser}
  mutation VerifyToken($token: String!) {
    tokenVerify(token: $token) {
      payload
      user {
        ...User
      }
    }
  }
`;

export const tokenRefreshMutation = gql`
  ${accountErrorFragment}
  mutation RefreshToken($token: String!) {
    tokenRefresh(csrfToken: $token) {
      token
      errors: accountErrors {
        ...AccountErrorFragment
        message
      }
    }
  }
`;

export const requestPasswordReset = gql`
  ${accountErrorFragment}
  mutation RequestPasswordReset($email: String!, $redirectUrl: String!) {
    requestPasswordReset(email: $email, redirectUrl: $redirectUrl) {
      errors: accountErrors {
        ...AccountErrorFragment
      }
    }
  }
`;
export const RequestPasswordResetMutation = TypedMutation<
  RequestPasswordReset,
  RequestPasswordResetVariables
>(requestPasswordReset);

export const setPassword = gql`
  ${accountErrorFragment}
  ${fragmentUser}
  mutation SetPassword($email: String!, $password: String!, $token: String!) {
    setPassword(email: $email, password: $password, token: $token) {
      errors: accountErrors {
        ...AccountErrorFragment
      }
      csrfToken
      refreshToken
      token
      user {
        ...User
      }
    }
  }
`;
export const SetPasswordMutation = TypedMutation<
  SetPassword,
  SetPasswordVariables
>(setPassword);

export const externalAuthenticationUrlMutation = gql`
  ${accountErrorFragment}
  mutation ExternalAuthenticationUrl($pluginId: String!, $input: JSONString!) {
    externalAuthenticationUrl(pluginId: $pluginId, input: $input) {
      authenticationData
      errors: accountErrors {
        ...AccountErrorFragment
      }
    }
  }
`;

export const externalObtainAccessTokensMutation = gql`
  ${accountErrorFragment}
  ${fragmentUser}
  mutation ExternalObtainAccessTokens($pluginId: String!, $input: JSONString!) {
    externalObtainAccessTokens(pluginId: $pluginId, input: $input) {
      token
      csrfToken
      user {
        ...User
      }
      errors: accountErrors {
        ...AccountErrorFragment
      }
    }
  }
`;

export const externalTokenRefreshMutation = gql`
  mutation ExternalRefreshToken($pluginId: String!, $input: JSONString!) {
    externalRefresh(pluginId: $pluginId, input: $input) {
      token
    }
  }
`;

export const externalTokenVerifyMutation = gql`
  ${fragmentUser}
  mutation ExternalVerifyToken($pluginId: String!, $input: JSONString!) {
    externalVerify(pluginId: $pluginId, input: $input) {
      verifyData
      user {
        ...User
      }
    }
  }
`;
