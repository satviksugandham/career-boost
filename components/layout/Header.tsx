"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Header = () => {
  const user = useUser();

  return (
    <header className="sticky top-0 z-50">
      <nav className="backdrop-blur-md px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src="/icons/logo.svg" className="mr-3 h-7 sm:h-9" alt="logo" />
            <span className="self-center text-xl font-bold whitespace-nowrap">
              CareerBoost
            </span>
          </Link>

          {/* Right Section */}
          <div className="flex items-center lg:order-2 space-x-4">
            {/* Growth Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Growth Tools</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/growth-tools/resumeanalysis">Resume Analysis</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/growth-tools/jobtracker">Job Tracker</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Authentication Buttons */}
            {user?.isLoaded && !user?.isSignedIn ? (
              <Link
                href="/sign-in"
                className="text-gray-800 hover:bg-primary-700/10 duration-300 focus:ring-4 focus:ring-primary-700/30 font-medium rounded-full text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Log in
              </Link>
            ) : (
              <>
                <div className="mr-4 h-full items-center align-middle flex max-md:hidden justify-center">
                  <UserButton showName={true} />
                </div>
                <div className="mr-4 h-full items-center align-middle hidden max-md:flex justify-center">
                  <UserButton showName={false} />
                </div>
              </>
            )}

            {/* Dashboard Button */}
            <Link
              href={`${!user?.isSignedIn ? "/sign-up" : "/dashboard"}`}
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-full text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none"
            >
              {!user?.isSignedIn ? "Get started" : "Dashboard"}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

