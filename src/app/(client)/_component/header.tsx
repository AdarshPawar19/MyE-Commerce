import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Menu } from "lucide-react"

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-black">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <svg
              className="w-24 h-8 mr-2"
              viewBox="0 0 120 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28 20C28 31.0457 22.2467 40 15 40C7.75329 40 2 31.0457 2 20C2 8.9543 7.75329 0 15 0C22.2467 0 28 8.9543 28 20Z"
                fill="#FF9900"
              />
              <path
                d="M15 40C22.2467 40 28 31.0457 28 20H2C2 31.0457 7.75329 40 15 40Z"
                fill="#FF9900"
              />
              <path
                d="M40 12V16H115V12H40ZM40 24V28H115V24H40Z"
                fill="#000000"
              />
            </svg>
            <span className="text-xl font-bold text-black">MyStore</span>
          </Link>
        </div>
        
      </div>
    </header>
  )
}