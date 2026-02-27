import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User  extends Document{

  @Prop({isRequired:true, unique:true})
  user_id: string;

  @Prop({isRequired:true, unique:true})
  username: string;

  @Prop({isRequired:true})
  password: string;

  @Prop({isRequired:true})
  email: string;

  @Prop({isRequired:true})
  role: string;

  @Prop({select:false})
  refresh_token: string;

  @Prop({default:false, select : false})
  is_deleted : boolean;

  @Prop({isRequired:true})
  city: string;

  @Prop({isRequired:true})
  state: string;

  @Prop({isRequired:true})
  zip_code: string;
}

export const UserSchema = SchemaFactory.createForClass(User);