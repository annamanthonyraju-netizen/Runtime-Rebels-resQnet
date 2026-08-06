import User from '../models/User.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwtHelper.js';

export const registerUser = async (data) => {
  const emailFormatted = (data.email || '').toLowerCase().trim();
  const existingUser = await User.findOne({ email: emailFormatted });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const user = await User.create({
    fullName: data.fullName || data.name,
    email: emailFormatted,
    phone: data.phone || '',
    password: data.password,
    role: data.role || 'Citizen',
    profileImage: data.profileImage,
    currentLocation: data.currentLocation
  });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profileImage: user.profileImage,
      currentLocation: user.currentLocation
    },
    token: accessToken,
    refreshToken
  };
};

export const loginUser = async (email, password) => {
  const emailFormatted = (email || '').toLowerCase().trim();
  const user = await User.findOne({ email: emailFormatted });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profileImage: user.profileImage,
      currentLocation: user.currentLocation
    },
    token: accessToken,
    refreshToken
  };
};

export const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new Error('User profile not found');
  }
  return user;
};

export const updateUserProfile = async (userId, updateData) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User profile not found');
  }

  if (updateData.fullName) user.fullName = updateData.fullName;
  if (updateData.phone) user.phone = updateData.phone;
  if (updateData.profileImage) user.profileImage = updateData.profileImage;
  if (updateData.currentLocation) user.currentLocation = updateData.currentLocation;

  await user.save();
  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    profileImage: user.profileImage,
    currentLocation: user.currentLocation
  };
};
