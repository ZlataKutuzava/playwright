interface ICredentials {
  username: string;
  password: string;
}

interface IUserData {
  title: string;
  credentials: ICredentials;
  message: MESSAGES;
}

enum MESSAGES {
  LOGIN_FAILED = "Credentials are required",
  REGISTER_FAILED = "Please, provide valid data",
  REGISTER_SUCCESS = "Successfully registered! Please, click Back to return on login page",
  SHORT_USERNAME = "Username should contain at least 3 characters",
  SHORT_PASSWORD = "Password should contain at least 8 characters",
  EMPTY_PASSWORD = "Password is required",
  EMPTY_USERNAME = "Username is required",
  PREFIX_POSTFIX_SPACES_USERNAME = "Prefix and postfix spaces are not allowed is username",
  PASSWORD_NO_LOWERCASE = "Password should contain at least one character in lower case"
}

export const loginTestData: IUserData[] = [
  {
    credentials: {
      username: "",
      password: ""
    },
    message: MESSAGES.LOGIN_FAILED,
    title: "Login with empty credentials"
  },
  {
    credentials: { username: "username", password: "" },
    message: MESSAGES.EMPTY_PASSWORD,
    title: "Login with empty password"
  },
  {
    credentials: {
      username: "",
      password: "password"
    },
    message: MESSAGES.EMPTY_USERNAME,
    title: "Login with empty username"
  }
];

export const registerTestData: IUserData[] = [
  {
    credentials: {
      username: "Zlata",
      password: "Bubarexa97"
    },
    message: MESSAGES.REGISTER_SUCCESS,
    title: "Register with smoke credentials"
  },
  {
    credentials: { username: "Dio", password: "123456Aa" },
    message: MESSAGES.REGISTER_SUCCESS,
    title: "Register with min valid credentials"
  },
  {
    credentials: {
      username: "1234567890123456789012345678901234567890",
      password: "123456789A123456789a"
    },
    message: MESSAGES.REGISTER_SUCCESS,
    title: "Register with max valid credentials"
  },
  {
    credentials: {
      username: "",
      password: "Bubarexa97"
    },
    message: MESSAGES.EMPTY_USERNAME,
    title: "Register with empty username"
  },
  {
    credentials: {
      username: "Zlata",
      password: ""
    },
    message: MESSAGES.EMPTY_PASSWORD,
    title: "Register with empty password"
  },
  {
    credentials: {
      username: "",
      password: ""
    },
    message: MESSAGES.REGISTER_FAILED,
    title: "Register with empty credentials"
  },
  {
    credentials: {
      username: "97",
      password: "Bubarexa97"
    },
    message: MESSAGES.SHORT_USERNAME,
    title: "Register with username.length < 3 and valid password"
  },
  {
    credentials: {
      username: "Zlata",
      password: "Bubarex"
    },
    message: MESSAGES.SHORT_PASSWORD,
    title: "Register with valid username and password.length < 8"
  },
  {
    credentials: {
      username: " prefix_space",
      password: "Bubarexa97"
    },
    message: MESSAGES.PREFIX_POSTFIX_SPACES_USERNAME,
    title: "Register with valid password and username with prefix spaces"
  },
  {
    credentials: {
      username: "postfix_space ",
      password: "Bubarexa97"
    },
    message: MESSAGES.PREFIX_POSTFIX_SPACES_USERNAME,
    title: "Register with valid password and username with postfix spaces"
  },
  {
    credentials: {
      username: "    ",
      password: "OnlySpaces111"
    },
    message: MESSAGES.PREFIX_POSTFIX_SPACES_USERNAME,
    title: "Register with valid password and username, containing only spaces"
  },
  {
    credentials: {
      username: "1234567890123456789012345678901234567890",
      password: "Username.length40"
    },
    message: MESSAGES.REGISTER_SUCCESS,
    title: "Register with valid password and username.length = 40"
  },
  {
    credentials: {
      username: "password_length_is_20",
      password: "_Password_length_20_"
    },
    message: MESSAGES.REGISTER_SUCCESS,
    title: "Register with valid username and password.length = 20"
  },
  {
    credentials: {
      username: "password_only_spaces",
      password: "     "
    },
    message: MESSAGES.EMPTY_PASSWORD,
    title: "Register with valid username and password, which consists only from spaces"
  },
  {
    credentials: {
      username: "password_capslock",
      password: "ALLCAPSLETTERS"
    },
    message: MESSAGES.PASSWORD_NO_LOWERCASE,
    title: "Register with valid username and password, which doesn't have any lowercase letter"
  }
];
