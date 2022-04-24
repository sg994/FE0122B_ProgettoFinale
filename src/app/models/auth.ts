export interface Auth {
  id: number;
  username: string;
  email: string;
  roles: [
    {
      id: number;
      roleName: string;
    }
  ];
  accessToken: string;
  tokenType: string;
}
