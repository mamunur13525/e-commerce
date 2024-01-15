/* This example requires Tailwind CSS v2.0+ */
import { Menu, Transition } from '@headlessui/react';
import { signOut } from 'next-auth/react';
import { Fragment } from 'react';
import { BsChevronDown } from 'react-icons/bs';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dropdown({title={}, menuItems=[]}) {

  const dropdownEventHandler = (e, data) => {
    e.preventDefault()
    if(data === 'signout') {
      localStorage.setItem('user', null)
      signOut()
    }
  }
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className={`inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 outline-none ${title.css}`}
        >
          {title.title}
          {title.icon && (
            <BsChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
          )}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-left absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {menuItems.map((item) => (
              
                item?.special ? 
                <Menu.Item key={item.id}>
                {({ active }) => (
                  <a
                    onClick={e => dropdownEventHandler(e, item.special)}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900 cursor-pointer" : "text-gray-700",
                      "block px-4 py-2 text-sm cursor-pointer"
                    )}
                  >
                    {item.name}
                  </a>
                )}
              </Menu.Item>
              :
              <Menu.Item key={item.id}>
                {({ active }) => (
                  <a
                    href={item.navigateLink ? item.navigateLink : '#'}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    {item.name}
                  </a>
                )}
              </Menu.Item>
              
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}