'use client';
import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useCartStore } from '../store/cartStore';
import { signOut } from 'next-auth/react';
import { Button, Dropdown, Badge, CustomFlowbiteTheme } from 'flowbite-react';
import { ShoppingCartIcon } from 'lucide-react'

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const { items } = useCartStore();
  // USE next line to ignore next next line
  // @ts-ignore
  const isAdmin = session?.user && session.user.role === 'ADMIN';

  const customTheme: CustomFlowbiteTheme["dropdown"] = {

  };

  return (
    <nav className="bg-gray-100 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/">
          <img src="/logo.png" className="object-cover w-16 h-16" />
        </Link>

      </div>
      <div className="flex items-center space-x-4">
        {isAdmin ? (
          <Link href="/admin">
            <Button color="gray">Admin</Button>
          </Link>
        ) : (
          <>

            <Link href="/cart">


              <button type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <ShoppingCartIcon className='h-8 w-8' />

                <span className="sr-only">Notifications</span>
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">{items.length}</div>
              </button>

            </Link>
          </>
        )}
        <Dropdown label={session ? session.user?.name : 'User'} theme={customTheme} >
          {session ? (
            <Dropdown.Item onClick={() => signOut()}>
              Logout
            </Dropdown.Item>
          ) : (
            <Dropdown.Item>
              <Link href="/login">
                Login
              </Link>
            </Dropdown.Item>
          )}
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;
