import { DBConnection } from "../../services";
import { User } from "../../types";

export class AuthDAO extends DBConnection {
  private readonly tableName: string = "tm_user";
  constructor() {
    super();
  }

  protected async register(user: User) {
    const result = await this.findByEmail(user.email);
    if (!result || !result.email) {
      const response = await this.insert(this.tableName, user);
      return response;
    }
    return 0;
  }

  protected findByEmail(email: string) {
    return this.findBy<User>(
      this.tableName,
      ["email", "password"],
      {
        email: email,
      }
    );
  }

  protected getAllUsers() {
    return this.findAll<User>(this.tableName);
  }
}
