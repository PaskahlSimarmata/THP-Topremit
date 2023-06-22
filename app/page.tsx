import Hero from "../components/hero";
import Feature from "../components/features";
import Testi from "../components/testimonials";
import { Box } from "@chakra-ui/react";
export default function Home() {
  return (
    <div>
      <Hero />
      <Feature />
      <Testi />
    </div>
  );
}
