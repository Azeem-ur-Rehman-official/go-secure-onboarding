import mongoose, { Document, Model, Schema } from "mongoose";

export interface IAuth extends Document {
  fullName: string;
  email: string;
  password: string;
  role: "Super Admin" | "Admin" | "HR";
  isActive: boolean;
  lastLogin?: Date;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AuthSchema = new Schema<IAuth>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["Super Admin", "Admin", "HR"],
      default: "Admin",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    profileImage: {
      type: String,
      default: "",
    },

    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const Auth: Model<IAuth> =
  mongoose.models.Auth || mongoose.model<IAuth>("Auth", AuthSchema);

export default Auth;
