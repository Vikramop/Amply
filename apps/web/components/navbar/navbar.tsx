"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@repo/ui/utils.ts"
import { Button } from "@repo/ui/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@repo/ui/components/ui/navigation-menu"
import { ModeToggle } from "@/components/modetoggle"
import { Mic } from "lucide-react"
import { useState } from "react"
import { VoiceCommandDialog } from "@/components/voicecommand"
import { Avatar, AvatarFallback } from "@repo/ui/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu"

export default function Navbar() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const pathname = usePathname()
  const [voiceCommandOpen, setVoiceCommandOpen] = useState(false)

  const handleSignIn = () => {
    setIsSignedIn(true)
  }

  const handleSignOut = () => {
    setIsSignedIn(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight">ChargeSol</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/map" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), pathname === "/map" && "font-medium")}
                  >
                    Find Stations
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-rose-500 to-red-700 p-6 no-underline outline-none focus:shadow-md"
                          href="/register-station"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium text-white">Register Your Charger</div>
                          <p className="text-sm leading-tight text-white/90">
                            Add your charging station to our network and earn Solana tokens
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <Link href="/ai-pricing" legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">AI Pricing</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Get the best charging rates with our AI price optimizer
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link href="/token-rewards" legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Token Rewards</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Earn and spend tokens through our referral program
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link href="/escrow" legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Secure Payments</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Our escrow system ensures safe transactions on the Solana blockchain
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setVoiceCommandOpen(true)} aria-label="Voice commands">
            <Mic className="h-5 w-5" />
          </Button>
          <ModeToggle />
          {isSignedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>US</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="default" onClick={handleSignIn}>
              Sign In
            </Button>
          )}
        </div>
      </div>
      <VoiceCommandDialog open={voiceCommandOpen} onOpenChange={setVoiceCommandOpen} />
    </header>
  )
}
