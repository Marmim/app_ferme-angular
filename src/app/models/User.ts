import {Farm} from "./farm.model";

export interface User{
  id?: number,
  username: string;
  password: string;
  email: string;
  farms: Farm[];

}
