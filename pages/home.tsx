import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import Image from "next/image";

import { homePage } from "../src/graphql/queries";
import useGetPageData from "../src/hooks/useGetPageData";

const HomePage = () => {
  const { data, loading } = useQuery(homePage);
  const { title = "", subtitle = "", pageData } = useGetPageData(data);

  const { avatar } = pageData || {};

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <motion.div
      className="w-100% flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <Image
          src={avatar?.asset?.url || ""}
          alt="profile"
          width={130}
          height={130}
          className="rounded-2xl grayscale"
        />
      </motion.div>
      <h1 className="mb-2 mt-8 text-3xl">{title}</h1>
      <h1 className="my-2 text-xl">{subtitle}</h1>
    </motion.div>
  );
};

export default HomePage;
