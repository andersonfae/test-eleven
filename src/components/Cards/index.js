export function Cards(props) {
  return (
    <>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4 mx-4 px-4 py-2 rounded-lg border border-gray-300">
              <div className="flex-1 min-w-0">
                <p className="text-base font-medium text-gray-900 truncate dark:text-white">{`${props.name}`}</p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">{`${props.email}`}</p>
              </div>
              <p
                className={`text-xs inline-flex items-center text-base font-semibold text-gray-400 dark:text-white ${props.status}`}
              >{`${props.status}`}</p>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
