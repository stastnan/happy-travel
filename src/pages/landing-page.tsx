import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { Box } from "@mui/material";

import Advantages from "@features/landingpage/components/Advantages";
import Features from "@features/landingpage/components/Features";
import Footer from "@features/landingpage/components/Footer";
import Header from "@features/landingpage/components/Header";
import Hero from "@features/landingpage/components/Hero";
import PlanNextTrip from "@features/landingpage/components/PlanNextTrip";

interface Props {
  children: React.ReactNode;
  noPadding?: boolean;
}

function Section({ children, noPadding }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <Box
      component={motion.div}
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : ""}
      transition={{ duration: 0.7 }}
      sx={{ px: noPadding ? 0 : { xs: 2, md: 8, lg: 12.5 } }}
    >
      {children}
    </Box>
  );
}

export default function LandingPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box sx={{ backgroundColor: (theme) => theme.palette.grey[100] }}>
      <Box
        component={motion.div}
        sx={{
          maxWidth: "1920px",
          mx: "auto",
        }}
      >
        <Header />
        <Section>
          <Hero handleClick={handleClick} />
        </Section>
        <Section>
          <Features contentRef={contentRef} />
        </Section>
        <Section>
          <Advantages />
        </Section>
      </Box>
      <Section noPadding>
        <PlanNextTrip />
      </Section>
      <Section>
        <Footer />
      </Section>
    </Box>
  );
}
