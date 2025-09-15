import { MessageSquare, Search, User } from "lucide-react"
import Particles from "./partiles"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Skeleton } from "../ui/skeleton"
import { useState } from "react"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Card } from "../ui/card"

export default function HeroSection() {
  const [isLoading, setLoading] = useState(false)

  function search() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }

  function getName() {
    toast.error("Connect wallet first")
  }

  return (
    <div className="relative w-full h-[620px] overflow-hidden">
      <Particles
        particleColors={["#ffffff", "#ffa500"]}
        particleCount={500}
        particleSpread={6}
        speed={0.5}
        particleBaseSize={100}
        moveParticlesOnHover
        alphaParticles={false}
        disableRotation={false}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-8 -translate-y-8 md:-translate-y-16">
        <h1 className="text-5xl md:text-8xl font-bold text-center leading-tight ">
          Own Your <span className="text-highlight">Identity</span>
        </h1>
        <Popover>
          <div className="w-[80%] md:w-[700px] flex items-center gap-2 p-2 rounded-xl border border-highlight bg-white/10 backdrop-blur-md">
            <Input
              type="text"
              placeholder="Search a name.rafik"
              className={cn(
                "w-full px-4 py-3 rounded-lg text-white placeholder-gray-300 bg-transparent",
                "border-0 outline-none ring-0 focus:outline-none focus:border-0 focus:ring-0"
              )}
            />
            <PopoverTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                onClick={search}
                className="text-white hover:bg-white/20"
              >
                <Search className="w-5 h-5" />
              </Button>
            </PopoverTrigger>
          </div>

          {/* Popover Result */}
          <PopoverContent className="w-80 p-4 backdrop-blur-md bg-white/10 border border-highlight text-white">
            <div className="flex flex-col items-center space-y-4">
              <h4 className="font-medium">Checking name availability...</h4>
              {isLoading ? (
                <div className="space-y-2 w-full">
                  <Skeleton className="h-12 w-full rounded-md border border-gray-200 shadow-lg" />
                  <Skeleton className="h-12 w-full rounded-md border border-gray-200 shadow-lg" />
                </div>
              ) : (
                <Button className="w-full" onClick={getName}>
                  Get Name
                </Button>
              )}
            </div>
          </PopoverContent>
        </Popover>
         <div className="flex flex-col md:flex-row justify-center items-center gap-2 max-w-2xl mx-auto">
          <Card className={cn("gap-4","text-center space-y-3 p-3 max-w-[200px]")}>
            <User className="h-5 w-8 text-primary mx-auto" />
            <h3 className="font-semibold font-space-grotesk">Claim Your Identity</h3>
            <p className="text-[0.75rem] text-muted-foreground">
              Secure your unique name on the decentralized network
            </p>
          </Card>
          <Card className={cn("gap-4","text-center space-y-3 p-3 max-w-[200px]")}>
            <MessageSquare className="h-5 w-8 text-primary mx-auto" />
            <h3 className="font-semibold ">Connect & Chat</h3>
            <p className="text-[0.75rem] text-muted-foreground">
              connect with people through their names
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
