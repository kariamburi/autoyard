import { Schema, model, models } from "mongoose";

export interface IUser extends Document {
  _id: string;
  clerkId: string;
  email: string;
  username:string;
  firstName: string;
  lastName: string;
  photo: string;
  status: string;
  businessname:string;
  aboutbusiness:string;
  businessaddress:string;
  latitude: string;
  longitude: string;
  businesshours:Businesshours[];
  businessworkingdays:string[];
  phone: string;
  whatsapp:string;
  website:string;
  facebook:string;
  twitter:string;
  instagram:string;
  tiktok:string;
  verified:Verified[];
  imageUrl: string;
}
export interface Businesshours {
  openHour: string;
  openMinute: string;
  closeHour: string;
  closeMinute: string;
}
export interface Verified {
  accountverified: boolean
  verifieddate: Date
}
const BusinesshoursSchema = new Schema<Businesshours>({
  openHour: { type: String },
  openMinute: { type: String},
  closeHour: { type: String},
  closeMinute: { type: String},
});
const VerifiedSchema = new Schema<Verified>({
  accountverified: { type: Boolean },
  verifieddate: { type: Date },
 
});

const UserSchema = new Schema({
  clerkId: { type: String, unique: true },
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  firstName: { type: String},
  lastName: {type: String },
  photo: { type: String},
  status: {type: String },
  businessname: {type: String},
  aboutbusiness: {type: String },
  businessaddress: {type: String },
  latitude: { type: String },
  longitude: { type: String },
 // businesshours: [BusinesshoursSchema],
 // businessworkingdays: { type: [String] },
  phone: { type: String },
  whatsapp: { type: String },
  website:{type: String},
  facebook:{type: String },
  twitter:{type: String },
  instagram:{type: String },
  tiktok:{type: String},
 // verified: [VerifiedSchema],
  imageUrl:{type: String},
})

const User = models.User || model('User', UserSchema);

export default User;