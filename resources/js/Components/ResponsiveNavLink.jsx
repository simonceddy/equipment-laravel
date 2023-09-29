import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
  active = false, className = '', children, ...props
}) {
  return (
    <Link
      {...props}
      className={`w-full flex items-start pl-3 pr-4 py-2 border-l-4 ${
        active
          ? 'border-indigo-400 text-indigo-700 bg-indigo-50 focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 dark:border-indigo-600 dark:text-indigo-300 dark:bg-indigo-950 dark:focus:text-indigo-200 dark:focus:bg-indigo-900 dark:focus:border-indigo-300'
          : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-950 dark:hover:border-gray-700 dark:focus:text-gray-200 dark:focus:bg-gray-950 dark:focus:border-gray-700'
      } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
    >
      {children}
    </Link>
  );
}
