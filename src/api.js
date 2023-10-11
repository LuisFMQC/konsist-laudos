import userEvent from '@testing-library/user-event';

export const API_URL = 'http://18.230.75.177:1415';
const bearer =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsInRpcG8iOjEsImlhdCI6MTY5NTY4Mjc0NH0._MhiCSzEAMq29_8I8nAcHiPeQqNiUJqlVr3wZSGFTfU';

export function LOGIN_POST(body) {
  return {
    url: API_URL + '/usuario/login',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function TOKEN_VALIDATE_GET(token) {
  return {
    url: API_URL + '/validatoken',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function DOCS_GET(token) {
  return {
    url: API_URL + '/documento',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function USER_LOGOUT(body, token) {
  return {
    url: API_URL + '/usuario/logout',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function PASSWORD_LOST(body) {
  return {
    url: API_URL + '/recuperarsenha',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearer,
      },
      body: JSON.stringify(body),
    },
  };
}

export function PASSWORD_RESET(body, token) {
  return {
    url: API_URL + '/usuario/senha',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearer,
      },
      body: JSON.stringify(body),
    },
  };
}
export function PASSWORD_CHANGE(body, token) {
  return {
    url: API_URL + '/usuario/senha',
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: bearer,
      },
      body: JSON.stringify(body),
    },
  };
}
export function USER_GET(token) {
  return {
    url: API_URL + '/getemail/' + token,
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };
}
