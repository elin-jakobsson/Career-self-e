import { GraphItem } from './item';

class User {
  public approved: boolean = false;
  public configured: boolean = false;
  public name: string = '';
  public team: string = '';
  public email: string = '';
  public photoUrl: string = '';
  public profession: string = '';
  public topExperience: GraphItem[] = [];
  public topInterest: GraphItem[] = [];
  public uid: string = '';
}

export { User };
