import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { IUserDocument } from '@interfaces/user.interfaces';

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    phoneNumber: { type: String },
    avatar: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset' },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  const user = this as IUserDocument;

  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as IUserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch(() => false);
};

UserSchema.methods.getFullName = async function getFullName() {
  const user = this as IUserDocument;
  return user.name + ' ' + user.lastName;
};

UserSchema.methods.getWithAvatarURL = async function getWithAvatarURL() {
  const user = this as IUserDocument;
  const userWithAvatarURL = await user.populate({
    path: 'avatar',
    select: ['url'],
  });

  return userWithAvatarURL;
};

const UserModel = mongoose.model<IUserDocument>('User', UserSchema);

export default UserModel;
