export default function SvgIcon({ icon = 'login', size = '30', color = 'white', className = '' }) {
  const svgClass = `stroke-${color} fill-${color} ${className}`;

  switch (icon) {
    case 'creator':
      return (
        <svg
          width={size}
          height={size}
          className={svgClass}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 800"
        >
          <circle cx="400" cy="240" r="160" strokeWidth="80" />
          <path d="M200 640 Q400 480 600 640" fill="none" strokeWidth="80" />
        </svg>
      );
    case 'theater':
      return (
        <svg
          width={size}
          height={size}
          className={svgClass}
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 416 416"
          xmlSpace="preserve"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
          <g id="SVGRepo_iconCarrier">
            <path
              fill={color}
              d="M408.167,352.197V119.764c4.341-0.089,7.833-3.629,7.833-7.992c0-4.418-3.582-8-8-8h-7.833H375.75v-32c0-4.418-3.582-8-8-8 H250.241C238.955,53.849,224.174,47.811,208,47.811s-30.955,6.038-42.241,15.961H48.25c-4.418,0-8,3.582-8,8v32H15.833H8 c-4.418,0-8,3.582-8,8c0,4.362,3.493,7.902,7.833,7.992v232.433C3.493,352.287,0,355.827,0,360.189c0,4.418,3.582,8,8,8h400 c4.418,0,8-3.582,8-8C416,355.827,412.507,352.287,408.167,352.197z M328,352.189h-47.667v-136.75 c0-13.142,10.691-23.833,23.833-23.833S328,202.297,328,215.439V352.189z M304.167,175.606c-21.964,0-39.833,17.869-39.833,39.833 v136.75h-16.5v-136.75c0-21.964-17.869-39.833-39.833-39.833s-39.833,17.869-39.833,39.833v136.75h-16.5v-136.75 c0-21.964-17.869-39.833-39.833-39.833C89.869,175.606,72,193.475,72,215.439v136.75H23.833v-200.75h368.333v200.75H344v-136.75 C344,193.475,326.131,175.606,304.167,175.606z M231.833,352.189h-47.667v-136.75c0-13.142,10.692-23.833,23.833-23.833 s23.833,10.691,23.833,23.833V352.189z M135.667,352.189H88v-136.75c0-13.142,10.692-23.833,23.833-23.833 s23.833,10.691,23.833,23.833V352.189z M359.75,103.772h-88.224c-1.097-8.654-3.922-16.772-8.126-24h96.35V103.772z M255.36,103.772 h-94.72c3.861-22.656,23.621-39.961,47.36-39.961S251.499,81.117,255.36,103.772z M56.25,79.772h96.35 c-4.204,7.228-7.029,15.346-8.126,24H56.25V79.772z M150.786,119.772c0.379,0.055,0.764,0.093,1.158,0.093s0.779-0.038,1.158-0.093 h109.794c0.379,0.055,0.764,0.093,1.158,0.093s0.779-0.038,1.158-0.093h126.953v15.667H23.833v-15.667H150.786z"
            />
          </g>
        </svg>
      );
    case 'masks':
      return (
        <svg
          width={size}
          height={size}
          className={svgClass}
          viewBox="0 0 640 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M206.86 245.15c-35.88 10.45-59.95 41.2-57.53 74.1c11.4-12.72 28.81-23.7 49.9-30.92l7.63-43.18zM95.81 295L64.08 115.49c-.29-1.62.28-2.62.24-2.65c57.76-32.06 123.12-49.01 189.01-49.01c1.61 0 3.23.17 4.85.19c13.95-13.47 31.73-22.83 51.59-26c18.89-3.02 38.05-4.55 57.18-5.32c-9.99-13.95-24.48-24.23-41.77-27C301.27 1.89 277.24 0 253.32 0C176.66 0 101.02 19.42 33.2 57.06C9.03 70.48-3.92 98.48 1.05 126.58l31.73 179.51c14.23 80.52 136.33 142.08 204.45 142.08c3.59 0 6.75-.46 10.01-.8c-13.52-17.08-28.94-40.48-39.5-67.58c-47.61-12.98-106.06-51.62-111.93-84.79zm97.55-137.46c-.73-4.12-2.23-7.87-4.07-11.4c-8.25 8.91-20.67 15.75-35.32 18.32c-14.65 2.58-28.67.4-39.48-5.17c-.52 3.94-.64 7.98.09 12.1c3.84 21.7 24.58 36.19 46.34 32.37c21.75-3.82 36.28-24.52 32.44-46.22zM606.8 120.9c-88.98-49.38-191.43-67.41-291.98-51.35c-27.31 4.36-49.08 26.26-54.04 54.36l-31.73 179.51c-15.39 87.05 95.28 196.27 158.31 207.35c63.03 11.09 204.47-53.79 219.86-140.84l31.73-179.51c4.97-28.11-7.98-56.11-32.15-69.52zm-273.24 96.8c3.84-21.7 24.58-36.19 46.34-32.36c21.76 3.83 36.28 24.52 32.45 46.22c-.73 4.12-2.23 7.87-4.07 11.4c-8.25-8.91-20.67-15.75-35.32-18.32c-14.65-2.58-28.67-.4-39.48 5.17c-.53-3.95-.65-7.99.08-12.11zm70.47 198.76c-55.68-9.79-93.52-59.27-89.04-112.9c20.6 25.54 56.21 46.17 99.49 53.78c43.28 7.61 83.82.37 111.93-16.6c-14.18 51.94-66.71 85.51-122.38 75.72zm130.3-151.34c-8.25-8.91-20.68-15.75-35.33-18.32c-14.65-2.58-28.67-.4-39.48 5.17c-.52-3.94-.64-7.98.09-12.1c3.84-21.7 24.58-36.19 46.34-32.37c21.75 3.83 36.28 24.52 32.45 46.22c-.73 4.13-2.23 7.88-4.07 11.4z"
          />
        </svg>
      );
    case 'double-left':
      return (
        <svg
          width={size}
          height={size}
          className={svgClass}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M12.6772 19.5377C12.9742 19.8265 13.449 19.8198 13.7377 19.5228C14.0265 19.2258 14.0198 18.751 13.7228 18.4623L12.6772 19.5377ZM6 12L5.47719 11.4623C5.33195 11.6035 5.25 11.7974 5.25 12C5.25 12.2026 5.33195 12.3965 5.47719 12.5377L6 12ZM13.7228 5.53775C14.0198 5.24901 14.0265 4.77418 13.7377 4.47719C13.449 4.1802 12.9742 4.17351 12.6772 4.46225L13.7228 5.53775ZM17.4772 18.3708C17.7742 18.6595 18.249 18.6528 18.5378 18.3558C18.8265 18.0588 18.8198 17.584 18.5228 17.2952L17.4772 18.3708ZM12 12L11.4772 11.4622C11.332 11.6035 11.25 11.7974 11.25 12C11.25 12.2026 11.332 12.3965 11.4772 12.5378L12 12ZM18.5228 6.70476C18.8198 6.41603 18.8265 5.9412 18.5378 5.64421C18.249 5.34721 17.7742 5.34051 17.4772 5.62924L18.5228 6.70476ZM13.7228 18.4623L6.52281 11.4623L5.47719 12.5377L12.6772 19.5377L13.7228 18.4623ZM6.52281 12.5377L13.7228 5.53775L12.6772 4.46225L5.47719 11.4623L6.52281 12.5377ZM18.5228 17.2952L12.5228 11.4622L11.4772 12.5378L17.4772 18.3708L18.5228 17.2952ZM12.5228 12.5378L18.5228 6.70476L17.4772 5.62924L11.4772 11.4622L12.5228 12.5378Z"
          />
        </svg>
      );
    case 'arrow-left':
      return (
        <svg
          width={size}
          height={size}
          className={svgClass}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
      );

    case 'double-right':
      return (
        <svg
          width={size}
          height={size}
          className={svgClass}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M10.2772 18.4623C9.9802 18.751 9.97351 19.2258 10.2623 19.5228C10.551 19.8198 11.0258 19.8265 11.3228 19.5377L10.2772 18.4623ZM18 12L18.5228 12.5377C18.6681 12.3965 18.75 12.2026 18.75 12C18.75 11.7974 18.6681 11.6035 18.5228 11.4623L18 12ZM11.3228 4.46225C11.0258 4.17351 10.551 4.1802 10.2623 4.47719C9.97351 4.77418 9.9802 5.24901 10.2772 5.53775L11.3228 4.46225ZM5.47721 17.2952C5.18021 17.584 5.17351 18.0588 5.46224 18.3558C5.75097 18.6528 6.2258 18.6595 6.52279 18.3708L5.47721 17.2952ZM12 12L12.5228 12.5378C12.668 12.3965 12.75 12.2026 12.75 12C12.75 11.7974 12.668 11.6035 12.5228 11.4622L12 12ZM6.52279 5.62924C6.2258 5.34051 5.75097 5.34721 5.46224 5.64421C5.17351 5.9412 5.18021 6.41603 5.47721 6.70476L6.52279 5.62924ZM11.3228 19.5377L18.5228 12.5377L17.4772 11.4623L10.2772 18.4623L11.3228 19.5377ZM18.5228 11.4623L11.3228 4.46225L10.2772 5.53775L17.4772 12.5377L18.5228 11.4623ZM6.52279 18.3708L12.5228 12.5378L11.4772 11.4622L5.47721 17.2952L6.52279 18.3708ZM12.5228 11.4622L6.52279 5.62924L5.47721 6.70476L11.4772 12.5378L12.5228 11.4622Z"
          />
        </svg>
      );
    case 'arrow-right':
      return (
        <svg
          width={size}
          height={size}
          className={svgClass}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
      );
    case 'youtube':
      return (
        <svg
          width={size}
          height={size}
          className={svgClass}
          viewBox="0 -0.5 25 25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.168 19.0028C20.4724 19.0867 22.41 17.29 22.5 14.9858V9.01982C22.41 6.71569 20.4724 4.91893 18.168 5.00282H6.832C4.52763 4.91893 2.58998 6.71569 2.5 9.01982V14.9858C2.58998 17.29 4.52763 19.0867 6.832 19.0028H18.168Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.008 9.17784L15.169 11.3258C15.3738 11.4454 15.4997 11.6647 15.4997 11.9018C15.4997 12.139 15.3738 12.3583 15.169 12.4778L12.008 14.8278C11.408 15.2348 10.5 14.8878 10.5 14.2518V9.75184C10.5 9.11884 11.409 8.77084 12.008 9.17784Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'rotate':
      return (
        <svg
          width={size}
          height={size}
          className={svgClass}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M17.5689 10.205C17.6829 10.6032 18.0981 10.8336 18.4964 10.7196C18.8946 10.6056 19.125 10.1904 19.011 9.7922L17.5689 10.205ZM16.59 7.0486L17.1301 6.52824L17.1295 6.52764L16.59 7.0486ZM13.111 5.1336L13.2625 4.39907L13.2611 4.39878L13.111 5.1336ZM9.18996 5.5336L8.89453 4.84424L8.89379 4.84456L9.18996 5.5336ZM6.14396 8.1096L5.51365 7.70314L5.51364 7.70315L6.14396 8.1096ZM6.98796 16.9486L7.53029 16.4306L7.52996 16.4302L6.98796 16.9486ZM15.557 17.8196L15.984 18.4362L15.9841 18.4361L15.557 17.8196ZM18.7536 14.9554C18.907 14.5706 18.7195 14.1343 18.3347 13.9809C17.95 13.8275 17.5137 14.0151 17.3603 14.3998L18.7536 14.9554ZM17.5641 9.80996C17.4599 10.2109 17.7004 10.6203 18.1013 10.7245C18.5022 10.8287 18.9117 10.5881 19.0158 10.1872L17.5641 9.80996ZM19.7258 7.45525C19.83 7.05435 19.5895 6.6449 19.1886 6.54072C18.7877 6.43653 18.3783 6.67706 18.2741 7.07796L19.7258 7.45525ZM18.0902 10.7215C18.4894 10.8318 18.9025 10.5976 19.0129 10.1984C19.1232 9.79911 18.889 9.38602 18.4897 9.2757L18.0902 10.7215ZM15.8407 8.5437C15.4415 8.43337 15.0284 8.66759 14.918 9.06684C14.8077 9.46609 15.0419 9.87919 15.4412 9.98951L15.8407 8.5437ZM19.011 9.7922C18.6602 8.56683 18.0144 7.44613 17.1301 6.52824L16.0498 7.56897C16.764 8.31028 17.2856 9.21537 17.5689 10.205L19.011 9.7922ZM17.1295 6.52764C16.0842 5.44503 14.7364 4.70315 13.2625 4.39907L12.9594 5.86813C14.1375 6.11119 15.2148 6.7042 16.0504 7.56956L17.1295 6.52764ZM13.2611 4.39878C11.7942 4.09906 10.2707 4.25448 8.89453 4.84424L9.48538 6.22297C10.5807 5.75356 11.7933 5.62986 12.9608 5.86842L13.2611 4.39878ZM8.89379 4.84456C7.50796 5.44022 6.33115 6.43545 5.51365 7.70314L6.77426 8.51607C7.43013 7.49901 8.37429 6.70054 9.48612 6.22265L8.89379 4.84456ZM5.51364 7.70315C3.52854 10.7816 3.91413 14.8198 6.44595 17.467L7.52996 16.4302C5.47778 14.2845 5.16523 11.0113 6.77427 8.51605L5.51364 7.70315ZM6.44562 17.4666C8.95364 20.0923 12.9989 20.5035 15.984 18.4362L15.13 17.203C12.7516 18.8501 9.52855 18.5225 7.53029 16.4306L6.44562 17.4666ZM15.9841 18.4361C17.2293 17.5732 18.1926 16.3625 18.7536 14.9554L17.3603 14.3998C16.9084 15.5332 16.1326 16.5082 15.1298 17.2032L15.9841 18.4361ZM19.0158 10.1872L19.7258 7.45525L18.2741 7.07796L17.5641 9.80996L19.0158 10.1872ZM18.4897 9.2757L15.8407 8.5437L15.4412 9.98951L18.0902 10.7215L18.4897 9.2757Z"
          />
        </svg>
      );
    case 'settings':
      return (
        <svg
          width={size}
          height={size}
          className={svgClass}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.0175 19C10.6601 19 10.3552 18.7347 10.297 18.373C10.2434 18.0804 10.038 17.8413 9.76171 17.75C9.53658 17.6707 9.31645 17.5772 9.10261 17.47C8.84815 17.3365 8.54289 17.3565 8.30701 17.522C8.02156 17.7325 7.62943 17.6999 7.38076 17.445L6.41356 16.453C6.15326 16.186 6.11944 15.7651 6.33361 15.458C6.49878 15.2105 6.52257 14.8914 6.39601 14.621C6.31262 14.4332 6.23906 14.2409 6.17566 14.045C6.08485 13.7363 5.8342 13.5051 5.52533 13.445C5.15287 13.384 4.8779 13.0559 4.87501 12.669V11.428C4.87303 10.9821 5.18705 10.6007 5.61601 10.528C5.94143 10.4645 6.21316 10.2359 6.33751 9.921C6.37456 9.83233 6.41356 9.74433 6.45451 9.657C6.61989 9.33044 6.59705 8.93711 6.39503 8.633C6.1424 8.27288 6.18119 7.77809 6.48668 7.464L7.19746 6.735C7.54802 6.37532 8.1009 6.32877 8.50396 6.625L8.52638 6.641C8.82735 6.84876 9.21033 6.88639 9.54428 6.741C9.90155 6.60911 10.1649 6.29424 10.2375 5.912L10.2473 5.878C10.3275 5.37197 10.7536 5.00021 11.2535 5H12.1115C12.6248 4.99976 13.0629 5.38057 13.1469 5.9L13.1625 5.97C13.2314 6.33617 13.4811 6.63922 13.8216 6.77C14.1498 6.91447 14.5272 6.87674 14.822 6.67L14.8707 6.634C15.2842 6.32834 15.8528 6.37535 16.2133 6.745L16.8675 7.417C17.1954 7.75516 17.2366 8.28693 16.965 8.674C16.7522 8.99752 16.7251 9.41325 16.8938 9.763L16.9358 9.863C17.0724 10.2045 17.3681 10.452 17.7216 10.521C18.1837 10.5983 18.5235 11.0069 18.525 11.487V12.6C18.5249 13.0234 18.2263 13.3846 17.8191 13.454C17.4842 13.5199 17.2114 13.7686 17.1083 14.102C17.0628 14.2353 17.0121 14.3687 16.9562 14.502C16.8261 14.795 16.855 15.1364 17.0323 15.402C17.2662 15.7358 17.2299 16.1943 16.9465 16.485L16.0388 17.417C15.7792 17.6832 15.3698 17.7175 15.0716 17.498C14.8226 17.3235 14.5001 17.3043 14.2331 17.448C14.0428 17.5447 13.8475 17.6305 13.6481 17.705C13.3692 17.8037 13.1636 18.0485 13.1099 18.346C13.053 18.7203 12.7401 18.9972 12.3708 19H11.0175Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.9747 12C13.9747 13.2885 12.9563 14.333 11.7 14.333C10.4437 14.333 9.42533 13.2885 9.42533 12C9.42533 10.7115 10.4437 9.66699 11.7 9.66699C12.9563 9.66699 13.9747 10.7115 13.9747 12Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'star':
      return (
        <svg
          width={size}
          height={size}
          className={svgClass}
          viewBox="0 -0.5 25 25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.349 8.515L12.5 5L10.651 8.515C10.5204 8.77186 10.3313 8.99449 10.099 9.165C9.86556 9.33638 9.59543 9.45107 9.31 9.5L5.5 10.247L8.16 13.428C8.52377 13.8267 8.69542 14.3643 8.63 14.9L8.124 19L11.632 17.3C11.9026 17.1689 12.1993 17.1006 12.5 17.1C12.7821 17.1009 13.0599 17.1694 13.31 17.3L16.9 18.895L16.394 14.844C16.33 14.3095 16.502 13.7736 16.865 13.376L19.5 10.247L15.69 9.5C15.4042 9.45122 15.1337 9.33652 14.9 9.165C14.6681 8.99438 14.4793 8.77175 14.349 8.515Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      );
    case 'trash':
      return (
        <svg
          width={size}
          height={size}
          className={svgClass}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.7628 9.5H7.63719C7.18864 9.5 6.82501 9.87295 6.82501 10.333V17C6.82501 18.3807 7.91632 19.5 9.26251 19.5H14.1375C14.784 19.5 15.404 19.2366 15.8611 18.7678C16.3182 18.2989 16.575 17.663 16.575 17V10.333C16.575 9.87295 16.2114 9.5 15.7628 9.5Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path d="M10.8247 12.833C10.8247 12.4188 10.4889 12.083 10.0747 12.083C9.66047 12.083 9.32469 12.4188 9.32469 12.833H10.8247ZM9.32469 16.166C9.32469 16.5802 9.66047 16.916 10.0747 16.916C10.4889 16.916 10.8247 16.5802 10.8247 16.166H9.32469ZM14.0753 12.833C14.0753 12.4188 13.7396 12.083 13.3253 12.083C12.9111 12.083 12.5753 12.4188 12.5753 12.833H14.0753ZM12.5753 16.166C12.5753 16.5802 12.9111 16.916 13.3253 16.916C13.7396 16.916 14.0753 16.5802 14.0753 16.166H12.5753ZM13.418 6.25C13.8322 6.25 14.168 5.91421 14.168 5.5C14.168 5.08579 13.8322 4.75 13.418 4.75V6.25ZM10.1683 4.75C9.75407 4.75 9.41829 5.08579 9.41829 5.5C9.41829 5.91421 9.75407 6.25 10.1683 6.25V4.75ZM16.575 8.25C16.9892 8.25 17.325 7.91421 17.325 7.5C17.325 7.08579 16.9892 6.75 16.575 6.75V8.25ZM6.82501 6.75C6.4108 6.75 6.07501 7.08579 6.07501 7.5C6.07501 7.91421 6.4108 8.25 6.82501 8.25V6.75ZM9.32469 12.833V16.166H10.8247V12.833H9.32469ZM12.5753 12.833V16.166H14.0753V12.833H12.5753ZM13.418 4.75H10.1683V6.25H13.418V4.75ZM16.575 6.75H6.82501V8.25H16.575V6.75Z" />
        </svg>
      );
    case 'user':
      return (
        <svg
          width={size}
          height={size}
          className={svgClass}
          viewBox="0 -0.5 25 25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.9769 14H10.0229C8.56488 14.0724 7.2731 14.963 6.68693 16.3C5.97993 17.688 7.39093 19 9.03193 19H15.9679C17.6099 19 19.0209 17.688 18.3129 16.3C17.7268 14.963 16.435 14.0724 14.9769 14Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.4999 8C15.4999 9.65685 14.1568 11 12.4999 11C10.8431 11 9.49994 9.65685 9.49994 8C9.49994 6.34315 10.8431 5 12.4999 5C13.2956 5 14.0587 5.31607 14.6213 5.87868C15.1839 6.44129 15.4999 7.20435 15.4999 8Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      );
    case 'like':
      return (
        <svg
          width={size}
          height={size}
          className={svgClass}
          viewBox="0 -0.5 25 25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M6.96408 11.1656C7.1353 11.5428 7.57986 11.7098 7.95703 11.5385C8.3342 11.3673 8.50115 10.9228 8.32992 10.5456L6.96408 11.1656ZM5.662 9.58562L5.65209 10.3356C5.65697 10.3356 5.66185 10.3356 5.66672 10.3356L5.662 9.58562ZM3.5 11.6906L2.75 11.6805V11.6906H3.5ZM3.5 15.9026H2.74991L2.75009 15.9145L3.5 15.9026ZM5.662 18.0026L5.66791 17.2526C5.66263 17.2526 5.65735 17.2526 5.65206 17.2527L5.662 18.0026ZM8.42934 16.7892C8.56387 16.3975 8.35536 15.9708 7.9636 15.8363C7.57185 15.7017 7.1452 15.9103 7.01066 16.302L8.42934 16.7892ZM8.33221 10.5507C8.1638 10.1723 7.7205 10.002 7.34207 10.1704C6.96363 10.3388 6.79338 10.7821 6.96179 11.1605L8.33221 10.5507ZM7.824 11.6906L7.074 11.6899V11.6906H7.824ZM7.824 15.9026H7.07398L7.07402 15.9078L7.824 15.9026ZM7.01059 16.3182C6.88279 16.7122 7.09861 17.1352 7.49261 17.263C7.88662 17.3908 8.30962 17.175 8.43741 16.781L7.01059 16.3182ZM6.97556 10.5214C6.791 10.8923 6.942 11.3425 7.31283 11.5271C7.68366 11.7116 8.13388 11.5606 8.31844 11.1898L6.97556 10.5214ZM8.355 9.98662L7.91219 9.38129C7.90539 9.38626 7.89867 9.39136 7.89204 9.39656L8.355 9.98662ZM8.733 9.45062L9.45185 9.66452C9.45451 9.65558 9.457 9.64659 9.45933 9.63756L8.733 9.45062ZM9.814 5.25062L9.09387 5.04105C9.09169 5.04856 9.08962 5.0561 9.08767 5.06367L9.814 5.25062ZM11.933 4.06062L11.7371 4.78459C11.7429 4.78614 11.7486 4.78762 11.7544 4.78903L11.933 4.06062ZM12.977 4.83447L12.332 5.21721V5.21721L12.977 4.83447ZM13.156 6.12162L13.8791 6.32085L13.8809 6.31384L13.156 6.12162ZM12.538 8.36462L11.8149 8.16537L11.8119 8.17678L12.538 8.36462ZM12.6929 9.10118L12.1039 9.56555L12.1039 9.56555L12.6929 9.10118ZM13.373 9.42362V8.6735L13.3597 8.67373L13.373 9.42362ZM16.905 9.42362V10.1737L16.9153 10.1735L16.905 9.42362ZM18.7259 10.149L19.249 9.61153V9.61153L18.7259 10.149ZM19.5 11.9496H20.2501L20.2499 11.9397L19.5 11.9496ZM19.5 15.3166L20.25 15.3268V15.3166H19.5ZM18.7255 17.1166L18.2025 16.5791V16.5791L18.7255 17.1166ZM16.905 17.8416L16.9153 17.0916H16.905V17.8416ZM9.986 17.8416V17.0916L9.98221 17.0916L9.986 17.8416ZM8.36836 16.1686C8.16014 15.8105 7.70107 15.689 7.34299 15.8973C6.98492 16.1055 6.86343 16.5645 7.07164 16.9226L8.36836 16.1686ZM8.32992 10.5456C7.85444 9.49822 6.8075 8.82839 5.65728 8.83563L5.66672 10.3356C6.22507 10.3321 6.73327 10.6572 6.96408 11.1656L8.32992 10.5456ZM5.67191 8.83568C4.07959 8.81464 2.77157 10.0882 2.75007 11.6805L4.24993 11.7007C4.26025 10.9366 4.88795 10.3255 5.65209 10.3356L5.67191 8.83568ZM2.75 11.6906V15.9026H4.25V11.6906H2.75ZM2.75009 15.9145C2.77529 17.5042 4.08221 18.7736 5.67194 18.7526L5.65206 17.2527C4.88917 17.2628 4.26199 16.6536 4.24991 15.8907L2.75009 15.9145ZM5.65609 18.7526C6.90648 18.7624 8.02319 17.9719 8.42934 16.7892L7.01066 16.302C6.81401 16.8746 6.27333 17.2574 5.66791 17.2526L5.65609 18.7526ZM6.96179 11.1605C7.03594 11.3272 7.07417 11.5075 7.074 11.6899L8.574 11.6913C8.57437 11.2983 8.49198 10.9097 8.33221 10.5507L6.96179 11.1605ZM7.074 11.6906V15.9026H8.574V11.6906H7.074ZM7.07402 15.9078C7.07498 16.0471 7.05357 16.1857 7.01059 16.3182L8.43741 16.781C8.52995 16.4957 8.57606 16.1974 8.57398 15.8974L7.07402 15.9078ZM8.31844 11.1898C8.43735 10.9509 8.60799 10.7414 8.81796 10.5767L7.89204 9.39656C7.50681 9.69881 7.19373 10.0831 6.97556 10.5214L8.31844 11.1898ZM8.79781 10.5919C9.11133 10.3626 9.34106 10.0368 9.45185 9.66452L8.01415 9.23672C7.99688 9.29476 7.96107 9.34554 7.91219 9.38129L8.79781 10.5919ZM9.45933 9.63756L10.5403 5.43756L9.08767 5.06367L8.00667 9.26367L9.45933 9.63756ZM10.5341 5.46018C10.6841 4.94484 11.219 4.64442 11.7371 4.78459L12.1289 3.33664C10.8218 2.98302 9.47222 3.74093 9.09387 5.04105L10.5341 5.46018ZM11.7544 4.78903C11.9966 4.84843 12.2047 5.00273 12.332 5.21721L13.622 4.45173C13.2892 3.89095 12.745 3.48752 12.1116 3.3322L11.7544 4.78903ZM12.332 5.21721C12.4593 5.43169 12.495 5.68833 12.4311 5.92939L13.8809 6.31384C14.0481 5.68354 13.9548 5.01251 13.622 4.45173L12.332 5.21721ZM12.4329 5.9224L11.8149 8.1654L13.2611 8.56384L13.8791 6.32084L12.4329 5.9224ZM11.8119 8.17678C11.6869 8.6599 11.795 9.17368 12.1039 9.56555L13.2818 8.63681C13.2631 8.61301 13.2565 8.5818 13.2641 8.55246L11.8119 8.17678ZM12.1039 9.56555C12.4129 9.95742 12.8873 10.1823 13.3863 10.1735L13.3597 8.67373C13.3294 8.67427 13.3006 8.66061 13.2818 8.63681L12.1039 9.56555ZM13.373 10.1736H16.905V8.67362H13.373V10.1736ZM16.9153 10.1735C17.3955 10.1669 17.8586 10.3514 18.2027 10.6864L19.249 9.61153C18.6197 8.99898 17.7728 8.6616 16.8947 8.67369L16.9153 10.1735ZM18.2027 10.6864C18.5468 11.0213 18.7437 11.4793 18.7501 11.9595L20.2499 11.9397C20.2384 11.0616 19.8783 10.2241 19.249 9.61153L18.2027 10.6864ZM18.75 11.9496V15.3166H20.25V11.9496H18.75ZM18.7501 15.3064C18.7436 15.7865 18.5466 16.2443 18.2025 16.5791L19.2485 17.6542C19.8778 17.0419 20.238 16.2047 20.2499 15.3268L18.7501 15.3064ZM18.2025 16.5791C17.8584 16.9139 17.3954 17.0983 16.9153 17.0917L16.8947 18.5915C17.7726 18.6036 18.6193 18.2664 19.2485 17.6542L18.2025 16.5791ZM16.905 17.0916H9.986V18.5916H16.905V17.0916ZM9.98221 17.0916C9.31783 17.095 8.70233 16.743 8.36836 16.1686L7.07164 16.9226C7.67552 17.9612 8.78847 18.5977 9.98979 18.5916L9.98221 17.0916Z"
          />
        </svg>
      );
    case 'heart':
      return (
        <svg
          width={size}
          height={size}
          className={svgClass}
          viewBox="0 -0.5 25 25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.4997 18.9911L9.5767 15.9911L6.6767 12.9911C5.10777 11.3331 5.10777 8.73809 6.6767 7.08009C7.44494 6.34175 8.48548 5.95591 9.54937 6.01489C10.6133 6.07387 11.6048 6.57236 12.2867 7.39109L12.4997 7.60009L12.7107 7.38209C13.3926 6.56336 14.3841 6.06487 15.448 6.00589C16.5119 5.94691 17.5525 6.33275 18.3207 7.07109C19.8896 8.72909 19.8896 11.3241 18.3207 12.9821L15.4207 15.9821L12.4997 18.9911Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      );
    case 'download':
      return (
        <svg
          width={size}
          height={size}
          className={svgClass}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M5.625 15C5.625 14.5858 5.28921 14.25 4.875 14.25C4.46079 14.25 4.125 14.5858 4.125 15H5.625ZM4.875 16H4.125H4.875ZM19.275 15C19.275 14.5858 18.9392 14.25 18.525 14.25C18.1108 14.25 17.775 14.5858 17.775 15H19.275ZM11.1086 15.5387C10.8539 15.8653 10.9121 16.3366 11.2387 16.5914C11.5653 16.8461 12.0366 16.7879 12.2914 16.4613L11.1086 15.5387ZM16.1914 11.4613C16.4461 11.1347 16.3879 10.6634 16.0613 10.4086C15.7347 10.1539 15.2634 10.2121 15.0086 10.5387L16.1914 11.4613ZM11.1086 16.4613C11.3634 16.7879 11.8347 16.8461 12.1613 16.5914C12.4879 16.3366 12.5461 15.8653 12.2914 15.5387L11.1086 16.4613ZM8.39138 10.5387C8.13662 10.2121 7.66533 10.1539 7.33873 10.4086C7.01212 10.6634 6.95387 11.1347 7.20862 11.4613L8.39138 10.5387ZM10.95 16C10.95 16.4142 11.2858 16.75 11.7 16.75C12.1142 16.75 12.45 16.4142 12.45 16H10.95ZM12.45 5C12.45 4.58579 12.1142 4.25 11.7 4.25C11.2858 4.25 10.95 4.58579 10.95 5H12.45ZM4.125 15V16H5.625V15H4.125ZM4.125 16C4.125 18.0531 5.75257 19.75 7.8 19.75V18.25C6.61657 18.25 5.625 17.2607 5.625 16H4.125ZM7.8 19.75H15.6V18.25H7.8V19.75ZM15.6 19.75C17.6474 19.75 19.275 18.0531 19.275 16H17.775C17.775 17.2607 16.7834 18.25 15.6 18.25V19.75ZM19.275 16V15H17.775V16H19.275ZM12.2914 16.4613L16.1914 11.4613L15.0086 10.5387L11.1086 15.5387L12.2914 16.4613ZM12.2914 15.5387L8.39138 10.5387L7.20862 11.4613L11.1086 16.4613L12.2914 15.5387ZM12.45 16V5H10.95V16H12.45Z"
          />
        </svg>
      );
    case 'cart':
      return (
        <svg
          width={size}
          height={size}
          className={svgClass}
          viewBox="0 -0.5 25 25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.333 19.237C9.33024 19.655 8.98966 19.9918 8.57169 19.99C8.15371 19.9882 7.81611 19.6483 7.81702 19.2303C7.81793 18.8124 8.15702 18.474 8.575 18.474C8.9949 18.4757 9.33411 18.8171 9.333 19.237V19.237Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.881 19.237C13.8782 19.655 13.5376 19.9918 13.1197 19.99C12.7017 19.9882 12.3641 19.6483 12.365 19.2303C12.3659 18.8124 12.705 18.474 13.123 18.474C13.5429 18.4757 13.8821 18.8171 13.881 19.237Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.231 14.263C16.4328 14.367 17.5577 13.6612 17.987 12.534L18.916 10.152L19.427 8.58897C19.4901 8.42231 19.5117 8.24283 19.49 8.06597C19.353 7.26097 18.552 7.34597 17.585 7.34597H7.73804L8.17204 14.263H15.231Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path d="M7.031 7.59729C7.16923 7.98776 7.59783 8.19224 7.98829 8.054C8.37876 7.91577 8.58324 7.48717 8.445 7.09671L7.031 7.59729ZM7.082 5.494L6.33206 5.48472C6.33096 5.5731 6.3455 5.66098 6.375 5.74429L7.082 5.494ZM6.94332 5.14716L7.48013 4.62339L7.48013 4.62339L6.94332 5.14716ZM6.6 5L6.60916 4.25H6.6V5ZM5.5 4.25C5.08579 4.25 4.75 4.58579 4.75 5C4.75 5.41421 5.08579 5.75 5.5 5.75V4.25ZM8.2236 15.0112C8.63683 14.9827 8.94872 14.6246 8.92022 14.2114C8.89172 13.7982 8.53363 13.4863 8.1204 13.5148L8.2236 15.0112ZM8.172 16.789L8.1204 17.5372C8.13757 17.5384 8.15478 17.539 8.172 17.539V16.789ZM15.289 17.539C15.7032 17.539 16.039 17.2032 16.039 16.789C16.039 16.3748 15.7032 16.039 15.289 16.039V17.539ZM8.445 7.09671L7.789 5.24371L6.375 5.74429L7.031 7.59729L8.445 7.09671ZM7.83194 5.50328C7.836 5.17493 7.70945 4.85842 7.48013 4.62339L6.40651 5.67093C6.35798 5.62119 6.3312 5.55421 6.33206 5.48472L7.83194 5.50328ZM7.48013 4.62339C7.25081 4.38836 6.93751 4.25407 6.60916 4.25006L6.59084 5.74994C6.52135 5.74909 6.45504 5.72067 6.40651 5.67093L7.48013 4.62339ZM6.6 4.25H5.5V5.75H6.6V4.25ZM8.1204 13.5148C7.06334 13.5877 6.2431 14.4664 6.2431 15.526H7.7431C7.7431 15.2548 7.95304 15.0299 8.2236 15.0112L8.1204 13.5148ZM6.2431 15.526C6.2431 16.5856 7.06334 17.4643 8.1204 17.5372L8.2236 16.0408C7.95304 16.0221 7.7431 15.7972 7.7431 15.526H6.2431ZM8.172 17.539H15.289V16.039H8.172V17.539Z" />
        </svg>
      );
    case 'logout':
      return (
        <svg
          width={size}
          height={size}
          className={svgClass}
          viewBox="0 -0.5 25 25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M7.04401 9.53165C7.33763 9.23949 7.33881 8.76462 7.04665 8.47099C6.75449 8.17737 6.27962 8.17619 5.98599 8.46835L7.04401 9.53165ZM2.97099 11.4683C2.67737 11.7605 2.67619 12.2354 2.96835 12.529C3.26051 12.8226 3.73538 12.8238 4.02901 12.5317L2.97099 11.4683ZM4.02901 11.4683C3.73538 11.1762 3.26051 11.1774 2.96835 11.471C2.67619 11.7646 2.67737 12.2395 2.97099 12.5317L4.02901 11.4683ZM5.98599 15.5317C6.27962 15.8238 6.75449 15.8226 7.04665 15.529C7.33881 15.2354 7.33763 14.7605 7.04401 14.4683L5.98599 15.5317ZM3.5 11.25C3.08579 11.25 2.75 11.5858 2.75 12C2.75 12.4142 3.08579 12.75 3.5 12.75V11.25ZM17.5 12.75C17.9142 12.75 18.25 12.4142 18.25 12C18.25 11.5858 17.9142 11.25 17.5 11.25V12.75ZM5.98599 8.46835L2.97099 11.4683L4.02901 12.5317L7.04401 9.53165L5.98599 8.46835ZM2.97099 12.5317L5.98599 15.5317L7.04401 14.4683L4.02901 11.4683L2.97099 12.5317ZM3.5 12.75L17.5 12.75V11.25L3.5 11.25V12.75Z"
          />

          <path
            d="M9.5 15C9.5 17.2091 11.2909 19 13.5 19H17.5C19.7091 19 21.5 17.2091 21.5 15V9C21.5 6.79086 19.7091 5 17.5 5H13.5C11.2909 5 9.5 6.79086 9.5 9"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      );
    case 'login':
      return (
        <svg
          width={size}
          height={size}
          className={svgClass}
          viewBox="0 -0.5 25 25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15.014 8.46835C14.7204 8.17619 14.2455 8.17737 13.9533 8.47099C13.6612 8.76462 13.6624 9.23949 13.956 9.53165L15.014 8.46835ZM16.971 12.5317C17.2646 12.8238 17.7395 12.8226 18.0317 12.529C18.3238 12.2354 18.3226 11.7605 18.029 11.4683L16.971 12.5317ZM18.029 12.5317C18.3226 12.2395 18.3238 11.7646 18.0317 11.471C17.7395 11.1774 17.2646 11.1762 16.971 11.4683L18.029 12.5317ZM13.956 14.4683C13.6624 14.7605 13.6612 15.2354 13.9533 15.529C14.2455 15.8226 14.7204 15.8238 15.014 15.5317L13.956 14.4683ZM17.5 12.75C17.9142 12.75 18.25 12.4142 18.25 12C18.25 11.5858 17.9142 11.25 17.5 11.25V12.75ZM3.5 11.25C3.08579 11.25 2.75 11.5858 2.75 12C2.75 12.4142 3.08579 12.75 3.5 12.75V11.25ZM13.956 9.53165L16.971 12.5317L18.029 11.4683L15.014 8.46835L13.956 9.53165ZM16.971 11.4683L13.956 14.4683L15.014 15.5317L18.029 12.5317L16.971 11.4683ZM17.5 11.25H3.5V12.75H17.5V11.25Z" />
          <path
            d="M9.5 15C9.5 17.2091 11.2909 19 13.5 19H17.5C19.7091 19 21.5 17.2091 21.5 15V9C21.5 6.79086 19.7091 5 17.5 5H13.5C11.2909 5 9.5 6.79086 9.5 9"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            fill={color}
            d="M15.014 8.46835C14.7204 8.17619 14.2455 8.17737 13.9533 8.47099C13.6612 8.76462 13.6624 9.23949 13.956 9.53165L15.014 8.46835ZM16.971 12.5317C17.2646 12.8238 17.7395 12.8226 18.0317 12.529C18.3238 12.2354 18.3226 11.7605 18.029 11.4683L16.971 12.5317ZM18.029 12.5317C18.3226 12.2395 18.3238 11.7646 18.0317 11.471C17.7395 11.1774 17.2646 11.1762 16.971 11.4683L18.029 12.5317ZM13.956 14.4683C13.6624 14.7605 13.6612 15.2354 13.9533 15.529C14.2455 15.8226 14.7204 15.8238 15.014 15.5317L13.956 14.4683ZM17.5 12.75C17.9142 12.75 18.25 12.4142 18.25 12C18.25 11.5858 17.9142 11.25 17.5 11.25V12.75ZM3.5 11.25C3.08579 11.25 2.75 11.5858 2.75 12C2.75 12.4142 3.08579 12.75 3.5 12.75V11.25ZM13.956 9.53165L16.971 12.5317L18.029 11.4683L15.014 8.46835L13.956 9.53165ZM16.971 11.4683L13.956 14.4683L15.014 15.5317L18.029 12.5317L16.971 11.4683ZM17.5 11.25H3.5V12.75H17.5V11.25Z"
          />
          <path
            d="M9.5 15C9.5 17.2091 11.2909 19 13.5 19H17.5C19.7091 19 21.5 17.2091 21.5 15V9C21.5 6.79086 19.7091 5 17.5 5H13.5C11.2909 5 9.5 6.79086 9.5 9"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      );
    case 'camera':
      return (
        <svg
          width={size}
          height={size}
          className={svgClass}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.417 11.5881C13.737 11.5798 13.1916 11.0233 13.1971 10.3432C13.2026 9.66311 13.7569 9.11545 14.437 9.11817C15.1171 9.12089 15.667 9.67297 15.667 10.3531C15.6626 11.0392 15.1031 11.592 14.417 11.5881V11.5881Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 10.765V15.706C4.01101 17.5359 5.5031 19.0105 7.333 19H15.666C16.5449 19.0053 17.39 18.6613 18.0152 18.0435C18.6405 17.4258 18.9947 16.5849 19 15.706V10.765C18.989 8.93511 17.4969 7.46048 15.667 7.471H7.333C5.5031 7.46048 4.01101 8.93511 4 10.765Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.83299 16.529C8.47219 16.513 7.38045 15.3997 7.39107 14.0389C7.40168 12.678 8.51066 11.5819 9.87155 11.5872C11.2324 11.5924 12.3329 12.6971 12.333 14.058C12.3293 14.7172 12.0638 15.348 11.5949 15.8114C11.126 16.2748 10.4922 16.533 9.83299 16.529Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M9 7.47102V5.82402C9.00106 5.60424 9.08945 5.3939 9.24569 5.23934C9.40194 5.08478 9.61323 4.99869 9.833 5.00002H13.167C13.3868 4.99869 13.5981 5.08478 13.7543 5.23934C13.9106 5.3939 13.9989 5.60424 14 5.82402V7.47102"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      );
    default:
      return null;
  }
}
