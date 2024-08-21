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
  openHour: { type: String, required: true },
  openMinute: { type: String, required: true },
  closeHour: { type: String, required: true },
  closeMinute: { type: String, required: true },
});
const VerifiedSchema = new Schema<Verified>({
  accountverified: { type: Boolean, required: true },
  verifieddate: { type: Date, required: true },
 
});

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: {type: String, required: true },
  photo: { type: String, required: true },
  status: {type: String, required: true },
  businessname: {type: String, required: true },
  aboutbusiness: {type: String, required: true },
  businessaddress: {type: String, required: true },
  latitude: { type: String },
  longitude: { type: String },
  businesshours: [BusinesshoursSchema],
  businessworkingdays: { type: [String], required: true },
  phone: { type: String },
  whatsapp: { type: String },
  website:{type: String, required: true },
  facebook:{type: String, required: true },
  twitter:{type: String, required: true },
  instagram:{type: String, required: true },
  tiktok:{type: String, required: true },
  verified: [VerifiedSchema],
  imageUrl:{type: String, required: true },
})

const User = models.User || model('User', UserSchema);

export default User;