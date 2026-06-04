import { UserAggregate } from '../user.aggregate';

export interface UserRepository {
  save(aggregate: UserAggregate): Promise<UserAggregate>;
  findById(id: string): Promise<UserAggregate | null>;
  findByEmail(email: string): Promise<UserAggregate | null>;
  findByDocument(document: string): Promise<UserAggregate | null>;
  update(id: string, data: Partial<{
    name: string;
    email: string;
    password: string;
    document: string;
    role: string;
  }>): Promise<UserAggregate>;
  remove(id: string): Promise<void>;
}
