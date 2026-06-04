import { getGalleryImages, getFeaturedImage } from "@/lib/gallery";
import Hero from "@/components/Hero";
import SideMenu from "@/components/SideMenu";
import GalleryHorizontal from "@/components/GalleryHorizontal";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Upcoming from "@/components/Upcoming";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Renderiza a cada request para que o embaralhamento da galeria varie.
export const dynamic = "force-dynamic";

export default function Home() {
  // Leitura no servidor — origem isolada em lib/gallery.ts.
  const images = getGalleryImages();
  const featured = getFeaturedImage();

  return (
    <main className="relative">
      <SideMenu />
      <Hero />
      <GalleryHorizontal images={images} />
      <About image={featured} />
      <Timeline />
      <Upcoming />
      <Contact />
      <Footer />
    </main>
  );
}
