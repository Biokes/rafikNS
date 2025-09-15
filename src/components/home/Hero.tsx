import { Search } from "lucide-react";
import Particles from "./partiles";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"


export default function HeroSection() {
  return (
    <div className="relative w-full h-[620px]">
      <Particles
        particleColors={['#ffffff', '#ffa500']}
        particleCount={300}
        particleSpread={15}
        speed={0.3}
        particleBaseSize={220}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
      <Popover>
      <PopoverTrigger asChild>
        <div className="w-full max-w-md flex items-center drop-shadow-lg p-2 rounded-lg border border-highlight bg-white/10 backdrop-blur-md cursor-pointer">
          <Input
            type="text"
            placeholder="Search a name.rafik"
            className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-300 bg-transparent outline-none"
          />
          <Search className="w-5 h-5 text-white" />
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-4 backdrop-blur-md bg-white/10 border border-highlight text-white">
        <div className="space-y-2">
          <h4 className="font-medium">Recent Searches</h4>
          <ul className="text-sm text-muted-foreground">
            <li className="hover:text-white cursor-pointer">rafik.eth</li>
            <li className="hover:text-white cursor-pointer">alice.near</li>
            <li className="hover:text-white cursor-pointer">bob.sol</li>
          </ul>
        </div>
      </PopoverContent>
    </Popover>
    </div>
  );
}
