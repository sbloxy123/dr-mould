import { Heart, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import { site } from "@/data/site";

// Desktop-only strip above the header.
export default function TopBar() {
  return (
    <div data-slot="top-bar" className="hidden bg-forest-900 py-2.5 text-sm text-[#E9E3D3] lg:block">
      <Container className="flex items-center justify-between">
        <div className="flex items-center gap-7">
          <span className="flex items-center gap-2">
            <Heart size={16} strokeWidth={2} className="text-gold-400" aria-hidden />
            Family-run
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={16} strokeWidth={2} className="text-gold-400" aria-hidden />
            {site.areas.join(" · ")}
          </span>
        </div>
        <span>{site.hours}</span>
      </Container>
    </div>
  );
}
