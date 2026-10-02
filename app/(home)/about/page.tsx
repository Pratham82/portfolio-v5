import type { Metadata } from "next";

import AboutMe from "@/components/AboutMe";

export const metadata: Metadata = { title: "About" };

const AboutPage = () => <AboutMe />;

export default AboutPage;
