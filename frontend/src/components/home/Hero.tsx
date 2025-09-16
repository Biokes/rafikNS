import { MessageSquare, Search, User } from "lucide-react"
import Particles from "./partiles"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Skeleton } from "../ui/skeleton"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Card } from "../ui/card"
import { CONTRACT_ABI, CONTRACT_ADDRESS, JWT, publicClient } from "@/config"
import type { Hex } from "viem"
import { useAccount } from "wagmi"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import { useWriteContract } from "wagmi"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { useNavigate } from "react-router-dom";


export default function HeroSection() {
  const [isLoading, setLoading] = useState(false)
  const [isDialogOpen, setOpenDialog] = useState(false)
  const [userInput, setUserInput] = useState<string>("")
  const [isValidName, setValidName] = useState<boolean>(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const navigate = useNavigate()
  const { address, isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { writeContractAsync } = useWriteContract()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file)
      if (preview) {
        URL.revokeObjectURL(preview)
      }
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)
    } else {
      toast.error("Please select a valid image file")
      setSelectedFile(null)
      setPreview(null)
    }
  }

  const search = async () => {
    setLoading(true)
    try {
      const isAvailableName = await publicClient?.readContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS as Hex,
        functionName: "isAvailableName",
        args: [userInput.toLowerCase()]
      })
      setValidName(Boolean(isAvailableName))
    }
    catch (error) {
      console.error("error during search: ", error)
    }
    finally {
      setLoading(false)
    }
  }



  useEffect(() => {
    if (isConnected && isDialogOpen) {
      setOpenDialog(true)
    }
  }, [isConnected, isDialogOpen])

  const getName = async () => {
    if (!address) {
      openConnectModal?.()
    }
    if (address && isConnected)
      setOpenDialog(true)
  }

  const handleUploadFile = async (selectedFile: File) => {
    try {
      if (!selectedFile) {
        toast.error("No file selected")
      }
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("network", "public")
      const request = await fetch("https://uploads.pinata.cloud/v3/files", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
        body: formData,
      });
      const response = await request.json();
      console.log(response.data.cid)
      setPreview("https://ipfs.io/ipfs/" + response.data.cid)
      navigate("/chats")
    } catch (error) {
      toast.error("unable to upload image")
      console.log("error: ", error)
    }
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
        <h1 className="text-3xl md:text-7xl font-bold text-center leading-tight ">
          Own Your <span className="text-highlight">Identity</span>
        </h1>
        <Popover>
          <div className="w-[80%] md:w-[700px] flex items-center gap-2 p-2 rounded-xl border border-highlight bg-white/10 backdrop-blur-md">
            <Input
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                let value = e.target.value.toLowerCase()
                value = value.replace(/[^a-z0-9-]/g, "")
                value = value.replace(/^-+|-+$/g, "")
                setUserInput(value)
              }}
              placeholder="Search a name.rafik"
              className={cn(
                "w-full px-4 py-3 rounded-lg text-white placeholder-gray-300 bg-transparent",
                "border-0 outline-none ring-0 focus:outline-none focus:border-0 focus:ring-0"
              )}
            />
            <PopoverTrigger asChild>
              <Button size="icon" variant="ghost" onClick={search}
                disabled={userInput.length < 1} className="text-white hover:bg-white/20 cursor-pointer">
                <Search className="w-5 h-5" />
              </Button>
            </PopoverTrigger>
          </div>
          <PopoverContent className="w-80 p-4 backdrop-blur-md bg-white/10 border border-highlight text-white">
            <div className="flex flex-col items-center space-y-4">
              <h4 className="font-medium">{isLoading ? "Checking name availability..." : !isValidName ? "Lucky you" : "Ooops"}</h4>
              {isLoading ? (
                <div className="space-y-2 w-full">
                  <Skeleton className="h-12 w-full rounded-md border border-gray-200 shadow-lg" />
                </div>
              ) : (
                !isValidName ?
                  <Button className="w-full" onClick={getName}>
                    Proceed to Get Name
                  </Button>
                  :
                  <p className={"capitalize"}>
                    name is taken
                  </p>
              )}
            </div>
          </PopoverContent>
        </Popover>
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 max-w-2xl mx-auto">
          <Card className={cn("gap-1", "text-center space-y-3 p-3 max-w-[200px]")}>
            <User className="h-5 w-8 text-primary mx-auto" />
            <h3 className="font-semibold ">Claim Your Identity</h3>
            <p className="text-[0.75rem] text-muted-foreground">
              Secure your unique name on the decentralized network
            </p>
          </Card>
          <Card className={cn("gap-1", "text-center space-y-3 p-3 max-w-[200px]")}>
            <MessageSquare className="h-5 w-8 text-primary mx-auto" />
            <h3 className="font-semibold ">Connect & Chat</h3>
            <p className="text-[0.75rem] text-muted-foreground">
              connect with people through their names
            </p>
          </Card>
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-white text-black rounded-xl">
          <DialogHeader>
            <DialogTitle>Create Profile</DialogTitle>
            <DialogDescription>
              You are about to claim: <strong>{userInput}.rafik</strong>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <label className="block text-sm font-medium">Upload Your Avatar</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 border-[1px] w-[100px] h-8 flex justify-center pt-1 pl-5"
            />
            {preview && (
              <div className="flex flex-col items-center gap-2 mt-2">
                <img
                  src={preview}
                  alt="Selected"
                  className="w-48 h-24 object-cover rounded-md border"
                />
                <p className="text-sm ">Selected file: {selectedFile?.name.substring(0, 10)}........jpg</p>
              </div>
            )}
          </div>

          <Button
            className="w-full mt-4"
            disabled={!selectedFile || isLoading}
            onClick={async () => {
              setLoading(true)
              try {
                if (selectedFile) {
                  handleUploadFile(selectedFile)
                }
                const hash = await writeContractAsync({
                  address: CONTRACT_ADDRESS as Hex,
                  abi: CONTRACT_ABI,
                  functionName: "createName",
                  args: [userInput.toLowerCase()],
                })
                console.log("Tx hash: ", hash)
                toast.success("Name registered successfully!")
                setOpenDialog(false)
                navigate("/chats")
              } catch (err) {
                console.error(err)
                toast.error("Transaction failed")
              }
              finally {
                setLoading(false)
              }
            }}
          >
            {!isLoading ? "Register" : "Creating name..."}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
