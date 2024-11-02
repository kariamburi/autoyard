"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type ProfileFolderProps = {
  profileImage: string;
  username: string;
  onClick: () => void; // Add onClick prop
};

const ProfileFolder: React.FC<ProfileFolderProps> = ({
  profileImage,
  username,
  onClick,
}) => {
  return (
    <motion.div
      onClick={onClick} // Apply onClick handler
      initial={{ scale: 1, rotate: 0 }}
      whileHover={{
        scale: 1.05,
        rotate: -10,
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      className="relative flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 border rounded-lg shadow-lg cursor-pointer"
    >
      {/* Folder Backdrop */}
      <div className="absolute inset-0 w-full h-full bg-gray-200 rounded-lg"></div>

      {/* Profile Image */}
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        whileHover={{ opacity: 1, scale: 1.1 }}
        transition={{ duration: 0.3 }}
        className="absolute overflow-hidden w-8 h-8 rounded-lg"
      >
        <Image
          src={profileImage}
          alt={`${username}'s profile`}
          width={112}
          height={112}
          className="object-cover w-full h-full"
        />
      </motion.div>

      {/* Profile Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-2 text-sm font-semibold text-gray-700"
      >
        {username}
      </motion.div>
    </motion.div>
  );
};

export default ProfileFolder;
